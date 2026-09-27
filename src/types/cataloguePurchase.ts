import type { Currency } from '@/constants/payments'
import type { CheckoutTranslationSetting } from '@/payload-types'

export type CataloguePurchaseContent = CheckoutTranslationSetting['content']

export type CreateCataloguePaymentInput = {
  catalogueId: string
  name: string
  email: string
  locale: string
  currency: Currency
}

export type CreateCataloguePaymentResponse = {
  checkoutUrl: string
}
