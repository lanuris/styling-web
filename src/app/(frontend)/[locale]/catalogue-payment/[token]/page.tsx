import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

import config from '@payload-config'
import { BankTransferPaymentFlow } from '@/components/BankTransferPaymentFlow'
import { isLocale } from '@/locales'
import { Currency, PaymentStatus } from '@/constants/payments'
import type { BankTransferTranslationSetting } from '@/payload-types'
import { getBankTransferDetails } from '@/utilities/bankTransferQr'

export default async function CataloguePaymentPage({
  params,
}: {
  params: Promise<{ token: string; locale: string }>
}) {
  const { token, locale } = await params
  if (!isLocale(locale)) notFound()

  const payload = await getPayload({ config })
  const found = await payload.find({
    collection: 'payments',
    overrideAccess: true,
    where: { confirmationToken: { equals: token } },
    limit: 1,
    depth: 1,
  })
  const payment = found.docs[0] as
    | {
        paymentId: string
        amount: number
        currency: Currency
        status: PaymentStatus
        confirmationToken: string
        locale: string
      }
    | undefined
  if (
    !payment ||
    payment.locale !== locale ||
    ![Currency.CZK, Currency.EUR].includes(payment.currency)
  )
    notFound()

  const settings = (await payload.findGlobal({
    slug: 'payment-settings',
    overrideAccess: true,
  })) as {
    bankAccount?: { accountOwner?: string; accountNumber?: string }
    sepaAccount?: { accountOwner?: string; iban?: string; bic?: string }
  }
  const bankTransfer = await getBankTransferDetails({
    settings,
    amount: payment.amount,
    currency: payment.currency,
    paymentId: payment.paymentId,
  })
  const cataloguePaymentSettings = (await payload.findGlobal({
    slug: 'bank-transfer-translation-settings',
    locale,
    overrideAccess: true,
  })) as BankTransferTranslationSetting

  return (
    <BankTransferPaymentFlow
      amount={payment.amount}
      currency={payment.currency}
      paymentId={payment.paymentId}
      token={payment.confirmationToken}
      status={payment.status}
      content={cataloguePaymentSettings.content}
      {...bankTransfer}
    />
  )
}
