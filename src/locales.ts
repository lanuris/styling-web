export const locales = ['en', 'cs'] as const

export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'en'

export const isLocale = (value: string | null | undefined): value is Locale =>
  !!value && locales.includes(value as Locale)
