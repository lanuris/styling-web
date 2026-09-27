import Link from 'next/link'
import { getPayload } from 'payload'

import config from '@payload-config'
import { isLocale } from '@/locales'
import { notFound } from 'next/navigation'

export default async function CataloguesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const payload = await getPayload({ config })
  const { docs } = await payload.find({ collection: 'catalogues', overrideAccess: true, where: { isActive: { equals: true } }, depth: 0, sort: 'title' })
  return <main className="container py-12">
    <h1 className="mb-8 text-3xl font-bold">Catalogues</h1>
    <div className="grid gap-5 sm:grid-cols-2">
      {docs.map((catalogue) => <article key={catalogue.id} className="grid gap-4 rounded-2xl border border-border bg-card p-6">
        <h2 className="text-xl font-semibold">{catalogue.title}</h2>
        {catalogue.description && <p className="whitespace-pre-line text-muted-foreground">{catalogue.description}</p>}
        <p>{catalogue.priceCzk} CZK / {catalogue.priceEur} EUR</p>
        <Link className="w-fit rounded bg-black px-4 py-2 text-white" href={`/${locale}/catalogues/${catalogue.id}/buy`}>Buy catalogue</Link>
      </article>)}
    </div>
    {!docs.length && <p>No catalogues are currently available.</p>}
  </main>
}
