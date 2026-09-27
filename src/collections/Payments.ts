import { randomBytes } from 'crypto'
import { readFile } from 'fs/promises'
import path from 'path'
import type { CollectionConfig } from 'payload'
import { APIError } from 'payload'

import { adminOnly } from '@/access/adminOnly'
import { catalogueStorageDir } from '@/utilities/catalogueStorage'
import { getServerSideURL } from '@/utilities/getURL'
import { locales, defaultLocale, isLocale } from '@/locales'
import { Currency, PaymentStatus } from '@/constants/payments'
import { sendEmail } from '@/services/email.server'
import { getPaymentEmailTemplateValues } from './payments/emailTemplates'

const token = () => randomBytes(32).toString('base64url')
const isAdmin = (user: unknown) => Boolean((user as { isAdmin?: boolean } | null)?.isAdmin)

export const Payments: CollectionConfig = {
  slug: 'payments',
  labels: { singular: 'Payment', plural: 'Payments' },
  access: { create: () => false, delete: adminOnly, read: adminOnly, update: adminOnly },
  admin: {
    useAsTitle: 'paymentId',
    defaultColumns: ['paymentId', 'buyerEmail', 'amount', 'status', 'updatedAt'],
  },
  fields: [
    { name: 'paymentId', type: 'text', unique: true, index: true, admin: { readOnly: true } },
    { name: 'buyerName', type: 'text', required: true, admin: { readOnly: true } },
    { name: 'buyerEmail', type: 'email', required: true, admin: { readOnly: true } },
    {
      name: 'locale',
      type: 'select',
      options: [...locales],
      required: true,
      defaultValue: defaultLocale,
      admin: { readOnly: true },
    },
    {
      name: 'catalogue',
      type: 'relationship',
      relationTo: 'catalogues',
      required: true,
      admin: { readOnly: true },
    },
    {
      name: 'amount',
      type: 'number',
      required: true,
      min: 1,
      admin: { readOnly: true, description: 'Amount in the catalogue currency.' },
    },
    {
      name: 'currency',
      type: 'select',
      required: true,
      options: [
        { label: 'Czech koruna (CZK)', value: Currency.CZK },
        { label: 'Euro (EUR)', value: Currency.EUR },
      ],
      admin: { readOnly: true, description: 'Currency selected by the customer.' },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: PaymentStatus.AwaitingPayment,
      options: [
        { label: 'Awaiting payment', value: PaymentStatus.AwaitingPayment },
        { label: 'Customer says paid', value: PaymentStatus.PaymentClaimed },
        { label: 'Payment received — send catalogue', value: PaymentStatus.Paid },
        {
          label: 'Payment not received — ask customer again',
          value: PaymentStatus.PaymentNotReceived,
        },
      ],
    },
    { name: 'confirmationToken', type: 'text', unique: true, admin: { hidden: true } },
    { name: 'downloadToken', type: 'text', unique: true, admin: { hidden: true } },
    {
      name: 'downloadExpiresAt',
      type: 'date',
      admin: { readOnly: true, date: { pickerAppearance: 'dayAndTime' } },
    },
    { name: 'reviewedBy', type: 'relationship', relationTo: 'users', admin: { readOnly: true } },
    {
      name: 'reviewedAt',
      type: 'date',
      admin: { readOnly: true, date: { pickerAppearance: 'dayAndTime' } },
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, operation, originalDoc, req }) => {
        if (operation === 'create') data.confirmationToken = token()
        const status = data.status as PaymentStatus | undefined
        if (
          operation === 'update' &&
          status &&
          status !== originalDoc?.status &&
          isAdmin(req.user)
        ) {
          data.reviewedBy = req.user?.id
          data.reviewedAt = new Date().toISOString()
        }
        if (
          operation === 'update' &&
          status === PaymentStatus.Paid &&
          originalDoc?.status !== PaymentStatus.Paid
        ) {
          const settings = await req.payload.findGlobal({ slug: 'payment-settings' })
          const days = settings.downloadValidityDays || 7
          data.downloadToken = token()
          data.downloadExpiresAt = new Date(Date.now() + days * 86_400_000).toISOString()
        }
        return data
      },
    ],
    afterChange: [
      async ({ doc, previousDoc, operation, req }) => {
        if (operation !== 'update' || doc.status === previousDoc?.status) return doc
        const baseURL = getServerSideURL()
        const settings = await req.payload.findGlobal({
          slug: 'payment-settings',
          locale: doc.locale,
        })
        const values = getPaymentEmailTemplateValues(doc, {
          adminUrl: `${baseURL}/admin/collections/payments/${doc.id}`,
          downloadUrl: `${baseURL}/api/payments/download/${doc.downloadToken}`,
          paymentInstructionsUrl: `${baseURL}/${doc.locale}/catalogue-payment/${doc.confirmationToken}`,
        })
        if (doc.status === PaymentStatus.PaymentClaimed) {
          const admins = await req.payload.find({
            collection: 'users',
            where: { isAdmin: { equals: true } },
            limit: 100,
            depth: 0,
          })
          const recipients = admins.docs.map((user: any) => user.email).filter(Boolean)
          const template = settings.emailTemplates?.customerMarkedPaid
          if (recipients.length)
            await sendEmail({
              htmlTemplate:
                template?.html ||
                '<p>{{buyerName}} ({{buyerEmail}}) marked payment <strong>{{paymentId}}</strong> as paid.</p><p><a href="{{adminUrl}}">Review payment</a></p>',
              req,
              subjectTemplate:
                template?.subject || 'Payment {{paymentId}}: customer marked as paid',
              to: recipients,
              values,
            })
        }
        if (doc.status === PaymentStatus.Paid && doc.downloadToken) {
          const template = settings.emailTemplates?.catalogueReady
          await sendEmail({
            htmlTemplate:
              template?.html ||
              '<p>Your payment was received. Download your catalogue before this private link expires:</p><p><a href="{{downloadUrl}}">Download catalogue</a></p>',
            req,
            subjectTemplate: template?.subject || 'Your catalogue is ready',
            to: doc.buyerEmail,
            values,
          })
        }
        if (doc.status === PaymentStatus.PaymentNotReceived) {
          const template = settings.emailTemplates?.paymentNotReceived
          await sendEmail({
            htmlTemplate:
              template?.html ||
              '<p>We could not find payment <strong>{{paymentId}}</strong>. Please check the bank transfer and confirm it again once paid.</p><p><a href="{{paymentInstructionsUrl}}">View payment instructions</a></p>',
            req,
            subjectTemplate: template?.subject || 'We could not find your payment',
            to: doc.buyerEmail,
            values,
          })
        }
        return doc
      },
    ],
  },
  endpoints: [
    {
      path: '/create',
      method: 'post',
      handler: async (req) => {
        const body = (await req.json?.()) as
          | {
              catalogueId?: string
              name?: string
              email?: string
              locale?: string
              currency?: Currency
            }
          | undefined
        if (!body) throw new APIError('Invalid request body.', 400)
        if (!body.catalogueId || !body.name?.trim() || !body.email?.trim())
          throw new APIError('Name, email and catalogue are required.', 400)
        if (!isLocale(body.locale)) throw new APIError('Invalid locale.', 400)
        const catalogue = await req.payload.findByID({
          collection: 'catalogues',
          id: body.catalogueId,
          overrideAccess: true,
        })
        if (!catalogue.isActive) throw new APIError('This catalogue is no longer available.', 404)
        const selectedCurrency = body.currency
        if (selectedCurrency !== Currency.CZK && selectedCurrency !== Currency.EUR)
          throw new APIError('Select CZK or EUR as the payment currency.', 400)
        const amount = selectedCurrency === Currency.CZK ? catalogue.priceCzk : catalogue.priceEur
        const payment = await req.payload.create({
          collection: 'payments',
          overrideAccess: true,
          data: {
            buyerName: body.name.trim(),
            buyerEmail: body.email.trim().toLowerCase(),
            locale: body.locale,
            catalogue: catalogue.id,
            amount,
            currency: selectedCurrency,
            status: PaymentStatus.AwaitingPayment,
          },
        })
        const updated = await req.payload.update({
          collection: 'payments',
          id: payment.id,
          overrideAccess: true,
          data: { paymentId: String(payment.id) },
          context: { paymentIdCreated: true },
        })
        return Response.json({
          checkoutUrl: `/${body.locale}/catalogue-payment/${updated.confirmationToken}`,
        })
      },
    },
    {
      path: '/claim',
      method: 'post',
      handler: async (req) => {
        const body = (await req.json?.()) as { token?: string } | undefined
        const confirmationToken = body?.token
        if (!confirmationToken) throw new APIError('Missing payment token.', 400)
        const found = await req.payload.find({
          collection: 'payments',
          overrideAccess: true,
          where: { confirmationToken: { equals: confirmationToken } },
          limit: 1,
          depth: 0,
        })
        const payment = found.docs[0]
        if (!payment) throw new APIError('Payment not found.', 404)
        if (
          ![PaymentStatus.AwaitingPayment, PaymentStatus.PaymentNotReceived].includes(
            payment.status as PaymentStatus,
          )
        )
          throw new APIError('This payment cannot be confirmed again.', 409)
        await req.payload.update({
          collection: 'payments',
          id: payment.id,
          overrideAccess: true,
          data: { status: PaymentStatus.PaymentClaimed },
        })
        return Response.json({ ok: true })
      },
    },
    {
      path: '/download/:token',
      method: 'get',
      handler: async (req) => {
        const downloadToken = req.routeParams?.token
        const found = await req.payload.find({
          collection: 'payments',
          overrideAccess: true,
          where: {
            and: [
              { downloadToken: { equals: downloadToken } },
              { status: { equals: PaymentStatus.Paid } },
              { downloadExpiresAt: { greater_than: new Date().toISOString() } },
            ],
          },
          limit: 1,
          depth: 0,
        })
        const payment = found.docs[0]
        if (!payment) throw new APIError('This download link is invalid or expired.', 404)
        const catalogueID =
          typeof payment.catalogue === 'object' ? payment.catalogue.id : payment.catalogue
        const catalogue = (await req.payload.findByID({
          collection: 'catalogues',
          id: catalogueID,
          overrideAccess: true,
        })) as { filename?: string; mimeType?: string }
        if (!catalogue.filename) throw new APIError('Catalogue file not found.', 404)
        const filename = path.basename(catalogue.filename)
        const file = await readFile(path.join(catalogueStorageDir, filename))
        return new Response(new Uint8Array(file), {
          headers: {
            'Content-Type': catalogue.mimeType || 'application/pdf',
            'Content-Disposition': `attachment; filename="${filename}"`,
            'Cache-Control': 'private, no-store',
          },
        })
      },
    },
  ],
}
