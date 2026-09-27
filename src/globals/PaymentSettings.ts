import type { GlobalConfig } from 'payload'

import { adminOnly } from '@/access/adminOnly'
import { paymentEmailTemplateVariablesDescription } from '@/collections/payments/emailTemplates'

export const PaymentSettings: GlobalConfig = {
  slug: 'payment-settings',
  label: 'Payment settings',
  access: {
    read: adminOnly,
    update: adminOnly,
  },
  admin: {
    group: 'Settings',
  },
  fields: [
    {
      type: 'group',
      name: 'bankAccount',
      label: 'Czech bank account',
      fields: [
        { name: 'accountOwner', type: 'text', required: true },
        {
          name: 'accountNumber',
          type: 'text',
          required: true,
          admin: { description: 'Czech account number including the bank code.' },
        },
      ],
    },
    {
      type: 'group',
      name: 'sepaAccount',
      label: 'SEPA bank account',
      admin: { description: 'Required to offer EUR transfers. Use the EUR account details supplied by your bank.' },
      fields: [
        { name: 'accountOwner', type: 'text', admin: { description: 'Beneficiary name shown in the SEPA transfer.' } },
        { name: 'iban', type: 'text', admin: { description: 'IBAN for EUR transfers.' } },
        { name: 'bic', type: 'text', admin: { description: 'BIC / SWIFT code, if supplied by your bank.' } },
      ],
    },
    {
      name: 'downloadValidityDays',
      type: 'number',
      required: true,
      defaultValue: 7,
      min: 1,
      admin: { description: 'How long an approved catalogue download link remains valid.' },
    },
    {
      type: 'group',
      name: 'emailTemplates',
      label: 'Payment email templates',
      admin: {
        description: paymentEmailTemplateVariablesDescription,
      },
      fields: [
        {
          type: 'group',
          name: 'customerMarkedPaid',
          label: 'Customer marked payment as paid (sent to admins)',
          fields: [
            { name: 'subject', type: 'text', required: true, localized: true, defaultValue: 'Payment {{paymentId}}: customer marked as paid' },
            { name: 'html', type: 'textarea', required: true, localized: true, defaultValue: '<p>{{buyerName}} ({{buyerEmail}}) marked payment <strong>{{paymentId}}</strong> as paid.</p><p><a href="{{adminUrl}}">Review payment</a></p>' },
          ],
        },
        {
          type: 'group',
          name: 'catalogueReady',
          label: 'Catalogue ready (sent to customer)',
          fields: [
            { name: 'subject', type: 'text', required: true, localized: true, defaultValue: 'Your catalogue is ready' },
            { name: 'html', type: 'textarea', required: true, localized: true, defaultValue: '<p>Your payment was received. Download your catalogue before this private link expires:</p><p><a href="{{downloadUrl}}">Download catalogue</a></p>' },
          ],
        },
        {
          type: 'group',
          name: 'paymentNotReceived',
          label: 'Payment not received (sent to customer)',
          fields: [
            { name: 'subject', type: 'text', required: true, localized: true, defaultValue: 'We could not find your payment' },
            { name: 'html', type: 'textarea', required: true, localized: true, defaultValue: '<p>We could not find payment <strong>{{paymentId}}</strong>. Please check the bank transfer and confirm it again once paid.</p><p><a href="{{paymentInstructionsUrl}}">View payment instructions</a></p>' },
          ],
        },
      ],
    },
  ],
}
