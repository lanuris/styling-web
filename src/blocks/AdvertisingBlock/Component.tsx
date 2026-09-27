'use client'

import type { AdvertisingBlock as AdvertisingBlockProps } from '@/payload-types'
import { Accordion } from '@/components/Accordion'

export const AdvertisingBlock: React.FC<AdvertisingBlockProps & { id?: string }> = ({
  accordionButtonPosition = 'right',
  id,
  items,
  title,
}) => {
  if (!items?.length) return null

  return (
    <section
      className="container overflow-x-clip py-6 sm:py-8"
      id={`block-${id}`}
      style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
    >
      <div className="relative">
        <div
          aria-hidden
          className="absolute -left-16 top-16 h-48 w-48 rounded-full bg-[#9b3437]/10 blur-3xl dark:bg-[#e28c85]/10"
        />

        <header className="relative max-w-4xl pb-6 sm:pb-8">
          <div aria-hidden className="mb-4 h-0.5 w-16 bg-[#9b3437] dark:bg-[#e28c85]" />
          <h2 className="max-w-3xl text-xl font-semibold leading-tight tracking-[0.02em] text-[#3d2923] sm:text-4xl dark:text-[#ead7cb]">
            {title}
          </h2>
        </header>

        <Accordion
          buttonPosition={accordionButtonPosition}
          className="relative border-y border-[#d9c7ba] dark:border-[#4a3933]"
          itemClassName="border-b border-[#d9c7ba] last:border-b-0 dark:border-[#4a3933]"
          items={items}
          renderContent={(item) => (
            <p className="max-w-3xl whitespace-pre-line border-l-2 border-[#9b3437] pl-5 text-lg leading-relaxed text-[#4c3933] sm:text-xl dark:border-[#e28c85] dark:text-[#ead7cb]">
              {item.text}
            </p>
          )}
          renderLabel={(item) => (
            <h3 className="text-base font-semibold leading-snug text-[#3d2923] sm:text-2xl dark:text-[#ead7cb]">
              {item.title}
            </h3>
          )}
        />
      </div>
    </section>
  )
}
