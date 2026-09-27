import type { BankTransferTranslationSetting } from '@/payload-types'

export type CataloguePaymentContent = BankTransferTranslationSetting['content']

export type PaymentClaimContent = Pick<
  CataloguePaymentContent,
  | 'submittingConfirmation'
  | 'submitConfirmation'
  | 'confirmationSubmitted'
  | 'confirmationError'
  | 'confirmationNetworkError'
>

export type ClaimCataloguePaymentInput = {
  token: string
}

export type ClaimCataloguePaymentResponse = {
  ok: true
}
