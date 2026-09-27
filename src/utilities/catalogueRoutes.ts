import type { Locale } from '@/locales'

export const getCataloguePurchasePath = (locale: Locale, catalogueId: string | number) =>
  `/${locale}/catalogues/${catalogueId}/buy`
