import QRCode from 'qrcode'

import { Currency } from '@/constants/payments'

export type BankTransferAccount = {
  accountOwner?: string | null
  accountNumber?: string | null
  iban?: string | null
  bic?: string | null
}

type BankTransferDetails = {
  accountOwner?: string
  accountNumber?: string
  iban?: string
  bic?: string
  qrCode: string | null
  isConfigured: boolean
}

const normalize = (value?: string | null) => value?.trim() || undefined
const normalizeIban = (value?: string | null) =>
  value?.replace(/\s/g, '').toUpperCase() || undefined
const normalizeOwner = (value?: string | null) => value?.replace(/[\r\n]/g, ' ').trim() || undefined

export async function createBankTransferQrCode({
  account,
  amount,
  currency,
  paymentId,
}: {
  account: BankTransferAccount
  amount: number
  currency: Currency
  paymentId: string
}) {
  const accountIdentifier =
    currency === Currency.CZK ? normalize(account.accountNumber) : normalizeIban(account.iban)
  if (!accountIdentifier) return null

  const payload =
    currency === Currency.CZK
      ? `SPD*1.0*ACC:${accountIdentifier}*AM:${amount.toFixed(2)}*CC:${currency}*X-VS:${paymentId}`
      : account.accountOwner
        ? [
            'BCD',
            '002',
            '1',
            'SCT',
            account.bic?.replace(/\s/g, '').toUpperCase() || '',
            account.accountOwner.replace(/[\r\n]/g, ' '),
            accountIdentifier,
            `EUR${amount.toFixed(2)}`,
            '',
            '',
            paymentId,
          ].join('\n')
        : null

  return payload ? QRCode.toDataURL(payload, { width: 320, margin: 1 }) : null
}

export async function getBankTransferDetails({
  settings,
  amount,
  currency,
  paymentId,
}: {
  settings: { bankAccount?: BankTransferAccount; sepaAccount?: BankTransferAccount }
  amount: number
  currency: Currency
  paymentId: string
}): Promise<BankTransferDetails> {
  const account = currency === Currency.EUR ? settings.sepaAccount : settings.bankAccount
  const accountOwner = normalizeOwner(account?.accountOwner)
  const iban = currency === Currency.EUR ? normalizeIban(account?.iban) : undefined
  const bic = normalizeIban(account?.bic)
  const accountNumber = normalize(account?.accountNumber)
  const qrCode = account
    ? await createBankTransferQrCode({
        account: { ...account, accountOwner, iban, bic },
        amount,
        currency,
        paymentId,
      })
    : null
  const isConfigured =
    currency === Currency.CZK
      ? Boolean(accountOwner && accountNumber && qrCode)
      : Boolean(accountOwner && iban)

  return { accountOwner, accountNumber, iban, bic, qrCode, isConfigured }
}
