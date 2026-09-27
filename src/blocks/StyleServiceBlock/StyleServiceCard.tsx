import type { Form, StyleService } from '@/payload-types'

import { StyleServiceContactForm } from './StyleServiceContactForm'

type StyleServiceCardProps = Pick<
  StyleService,
  | 'description'
  | 'place'
  | 'predefinedMessage'
  | 'price'
  | 'subtitle'
  | 'title'
> & {
  contactButtonLabel: string
  contactForm: number | Form
  closeButtonLabel: string
}

export const StyleServiceCard: React.FC<StyleServiceCardProps> = ({
  contactButtonLabel,
  contactForm,
  closeButtonLabel,
  description,
  place,
  price,
  predefinedMessage,
  subtitle,
  title,
}) => {
  const descriptionItems = description
    .split(/\r?\n/)
    .map((item) => item.trim().replace(/^[•\-–]\s*/, ''))
    .filter(Boolean)

  return (
    <article className="relative overflow-hidden rounded-[2.5rem] bg-[#f7f2ed] text-[#241c1a] shadow-[0_20px_60px_-30px_rgba(61,41,35,0.35)] ring-1 ring-[#e6d9ce] dark:bg-[#211b19] dark:text-[#f7f2ed] dark:ring-[#3a2e2a]">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#9b3437]/5 blur-3xl dark:bg-[#e28c85]/10"
      />

      <div className="relative grid gap-10 px-6 pb-6 pt-12 sm:px-12 sm:pb-8 sm:pt-16 lg:px-16 lg:pb-10 lg:pt-20">
        <div>
          <header>
            <div className="flex items-center gap-4">
              <span aria-hidden className="h-px w-10 bg-[#9b3437] dark:bg-[#e28c85]" />
            </div>
            <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-[0.02em] text-[#3d2923] sm:text-5xl dark:text-[#ead7cb]">
              {title}
            </h2>
          </header>

          <p className="mt-8 border-l-2 border-[#9b3437] pl-5 text-lg italic leading-relaxed text-[#4c3933] sm:text-xl dark:border-[#e28c85] dark:text-[#ead7cb]">
            {subtitle}
          </p>

          <ul className="mt-10 space-y-4">
            {descriptionItems.map((item) => (
              <li
                className="flex items-start gap-4 text-base leading-relaxed text-[#3d2923] sm:text-lg dark:text-[#ead7cb]"
                key={item}
              >
                <span
                  aria-hidden
                  className="mt-2 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#9b3437]/10 dark:bg-[#e28c85]/15"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#9b3437] dark:bg-[#e28c85]" />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <aside>
          <div className="flex h-full flex-col justify-between gap-8 rounded-3xl border border-[#e6d9ce] bg-[#fffaf5]/60 p-7 backdrop-blur-sm sm:p-9 dark:border-[#3a2e2a] dark:bg-[#2a2321]/60">
            <div className="flex flex-1 flex-col justify-center gap-6">
              <p className="text-center text-4xl font-semibold tracking-tight text-[#9b3437] sm:text-5xl dark:text-[#e28c85]">
                {price}
              </p>

              <div className="h-px w-full bg-[#e6d9ce] dark:bg-[#3a2e2a]" />

              <div className="flex items-center justify-center gap-3">
                <svg
                  aria-hidden
                  className="h-5 w-5 shrink-0 text-[#9b3437] dark:text-[#e28c85]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                  />
                </svg>
                <p className="text-base font-medium tracking-wide text-[#4c3933] sm:text-lg dark:text-[#d9c9c0]">
                  {place}
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {typeof contactForm === 'object' && contactForm && (
        <div className="relative px-6 pb-6 sm:px-12 sm:pb-8 lg:px-16 lg:pb-10">
          <StyleServiceContactForm
            buttonLabel={contactButtonLabel}
            closeButtonLabel={closeButtonLabel}
            form={contactForm}
            predefinedMessage={predefinedMessage}
          />
        </div>
      )}
    </article>
  )
}
