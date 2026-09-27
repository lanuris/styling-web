import { getPayload } from 'payload'
import { notFound } from 'next/navigation'

import config from '@payload-config'
import { CataloguePurchasePageClient } from './page.client'
import { isLocale } from '@/locales'
import type { CheckoutTranslationSetting } from '@/payload-types'

export default async function BuyCataloguePage({
  params,
}: {
  params: Promise<{ id: string; locale: string }>
}) {
  const { id, locale } = await params
  if (!isLocale(locale)) notFound()
  const payload = await getPayload({ config })
  try {
    const catalogue = (await payload.findByID({
      collection: 'catalogues',
      id,
      locale,
      overrideAccess: true,
    })) as unknown as {
      id: number
      title: string
      priceCzk: number
      priceEur: number
      isActive: boolean
    }
    if (!catalogue.isActive) notFound()
    const checkoutSettings = (await payload.findGlobal({
      slug: 'checkout-translation-settings',
      locale,
      overrideAccess: true,
    })) as CheckoutTranslationSetting
    return (
      <main className="container py-12">
        <CataloguePurchasePageClient
          catalogue={{
            id: String(catalogue.id),
            title: catalogue.title,
            priceCzk: catalogue.priceCzk,
            priceEur: catalogue.priceEur,
          }}
          locale={locale}
          content={checkoutSettings.content}
        />
      </main>
    )
  } catch {
    notFound()
  }
}
