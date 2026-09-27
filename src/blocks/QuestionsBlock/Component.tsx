'use client'

import type { QuestionsBlock as QuestionsBlockProps } from '@/payload-types'
import { Accordion } from '@/components/Accordion'

export const QuestionsBlock: React.FC<QuestionsBlockProps & { id?: string }> = ({
  accordionButtonPosition = 'right',
  id,
  questions,
}) => {
  if (!questions?.length) return null

  return (
    <section
      className="container overflow-x-clip py-6 sm:py-8"
      id={`block-${id}`}
      style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
    >
      <div className="relative overflow-hidden rounded-[2.5rem] bg-[#f7f2ed] px-6 py-4 text-[#241c1a] shadow-[0_20px_60px_-30px_rgba(61,41,35,0.35)] ring-1 ring-[#e6d9ce] sm:px-12 sm:py-6 dark:bg-[#211b19] dark:text-[#f7f2ed] dark:ring-[#3a2e2a]">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#9b3437]/5 blur-3xl dark:bg-[#e28c85]/10"
        />

        <Accordion
          buttonPosition={accordionButtonPosition}
          className="relative divide-y divide-[#e6d9ce] dark:divide-[#3a2e2a]"
          items={questions}
          renderContent={(item) => (
            <p className="max-w-3xl whitespace-pre-line border-l-2 border-[#9b3437] pl-5 text-lg leading-relaxed text-[#4c3933] sm:text-xl dark:border-[#e28c85] dark:text-[#ead7cb]">
              {item.answer}
            </p>
          )}
          renderLabel={(item) => (
            <span className="text-base font-semibold leading-snug text-[#3d2923] sm:text-2xl dark:text-[#ead7cb]">
              {item.question}
            </span>
          )}
        />
      </div>
    </section>
  )
}
