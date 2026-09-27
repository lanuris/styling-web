import 'server-only'

import Link from 'next/link'
import { getPayload } from 'payload'

import type { ActiveCataloguesBlock as ActiveCataloguesBlockProps } from '@/payload-types'
import config from '@payload-config'
import type { Locale } from '@/locales'
import { getCataloguePurchasePath } from '@/utilities/catalogueRoutes'

export const ActiveCataloguesBlock: React.FC<
  ActiveCataloguesBlockProps & { locale: Locale; id?: string }
> = async ({ buyButtonLabel, emptyMessage, id, locale, title }) => {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'catalogues',
    overrideAccess: true,
    where: { isActive: { equals: true } },
    depth: 0,
    limit: 1,
    locale,
    sort: '-updatedAt',
  })
  const catalogue = docs[0]

  return (
    <section
      className="container py-6 sm:py-8"
      id={`block-${id}`}
      style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
    >
      <div className="relative overflow-hidden rounded-[2rem] bg-[#f7f2ed] px-6 py-8 text-[#241c1a] shadow-[0_20px_60px_-30px_rgba(61,41,35,0.35)] ring-1 ring-[#e6d9ce] sm:px-12 sm:py-12 lg:px-20 lg:py-16 dark:bg-[#211b19] dark:text-[#f7f2ed] dark:ring-[#3a2e2a]">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#9b3437]/5 blur-3xl dark:bg-[#e28c85]/10"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-[#9b3437]/5 blur-3xl dark:bg-[#e28c85]/10"
        />
        {title && (
          <div className="relative mb-10 sm:mb-14">
            <h2 className="text-5xl font-semibold tracking-[0.04em] text-[#3d2923] sm:text-6xl lg:text-7xl dark:text-[#ead7cb]">
              {title}
            </h2>
            <div className="mt-4 h-0.5 w-20 bg-[#9b3437] dark:bg-[#e28c85]" />
          </div>
        )}

        {catalogue ? (
          <article className="relative mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-start lg:gap-16">
            <div className="max-w-4xl">
              {catalogue.subtitle && (
                <p className="text-2xl font-semibold leading-tight tracking-[0.02em] text-[#3d2923] sm:text-3xl lg:text-4xl dark:text-[#ead7cb]">
                  {catalogue.subtitle}
                </p>
              )}

              {catalogue.description && (
                <p className="mt-5 max-w-4xl whitespace-pre-line text-base leading-relaxed sm:text-lg lg:text-xl">
                  {catalogue.description}
                </p>
              )}
            </div>

            <aside className="rounded-3xl border border-[#e6d9ce] bg-[#fffaf5] p-6 shadow-[0_10px_40px_-15px_rgba(61,41,35,0.25)] sm:p-8 lg:translate-x-5 dark:border-[#3a2e2a] dark:bg-[#2b211e]">
              <div className="flex flex-wrap items-baseline justify-center gap-x-2 gap-y-1 text-center sm:gap-x-3">
                <span className="whitespace-nowrap text-4xl font-semibold tracking-tight text-[#241c1a] dark:text-[#f7f2ed]">
                  {catalogue.priceCzk} <span className="text-xl font-semibold text-[#9b3437] dark:text-[#e28c85]">CZK</span>
                </span>
                <span aria-hidden className="text-[#a6958b]">/</span>
                <span className="whitespace-nowrap text-4xl font-semibold tracking-tight text-[#241c1a] dark:text-[#f7f2ed]">
                  {catalogue.priceEur} <span className="text-xl font-semibold text-[#9b3437] dark:text-[#e28c85]">EUR</span>
                </span>
              </div>

              <Link
                className="group mt-8 flex w-full items-center justify-center gap-3 rounded-full bg-[#9b3437] px-8 py-4 text-lg font-semibold tracking-wide text-[#fffaf5] shadow-lg shadow-[#9b3437]/30 transition-all hover:-translate-y-0.5 hover:bg-[#7f282b] hover:shadow-xl hover:shadow-[#9b3437]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9b3437] focus-visible:ring-offset-4 focus-visible:ring-offset-[#f7f2ed] dark:bg-[#e28c85] dark:text-[#2b211e] dark:shadow-[#e28c85]/20 dark:hover:bg-[#f0a49e] dark:focus-visible:ring-offset-[#211b19]"
                href={getCataloguePurchasePath(locale, catalogue.id)}
              >
                {buyButtonLabel || 'Buy catalogue'}
                <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </aside>
          </article>
        ) : (
          <p className="text-xl text-muted-foreground">
            {emptyMessage || 'No catalogues are currently available.'}
          </p>
        )}
      </div>
    </section>
  )
}
