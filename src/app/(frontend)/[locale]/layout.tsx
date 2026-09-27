import { notFound } from 'next/navigation'
import React from 'react'

import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { isLocale } from '@/locales'

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!isLocale(locale)) notFound()

  return (
    <div lang={locale}>
      <Header locale={locale} />
      {children}
      <Footer locale={locale} />
    </div>
  )
}
