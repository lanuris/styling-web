'use client'

import { useEffect, useState } from 'react'
import type { Form as FormType } from '@payloadcms/plugin-form-builder/types'

import type { Form } from '@/payload-types'
import { FormBlock } from '@/blocks/Form/Component'

type StyleServiceContactFormProps = {
  buttonLabel: string
  closeButtonLabel: string
  form: Form
  predefinedMessage: string
}

export const StyleServiceContactForm: React.FC<StyleServiceContactFormProps> = ({
  buttonLabel,
  closeButtonLabel,
  form,
  predefinedMessage,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const formWithPredefinedMessage = {
    ...form,
    fields: form.fields?.map((field) =>
      'name' in field && field.name === 'message'
        ? { ...field, defaultValue: predefinedMessage }
        : field,
    ),
  }

  useEffect(() => {
    if (!isOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false)
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen])

  return (
    <>
      <button
        className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#2b211e] px-8 py-4 text-base font-semibold tracking-wide text-[#fffaf5] transition-all duration-200 hover:bg-[#9b3437] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a64643] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fffaf5] dark:bg-[#ead7cb] dark:text-[#2b211e] dark:hover:bg-[#e28c85] dark:focus-visible:ring-offset-[#2a2321]"
        onClick={() => setIsOpen(true)}
        type="button"
      >
        {buttonLabel}
        <svg
          aria-hidden
          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto px-4 py-6 sm:items-center sm:py-10">
          <button
            aria-label={closeButtonLabel}
            className="fixed inset-0 bg-[#241c1a]/65 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
            type="button"
          />

          <section
            aria-label={buttonLabel}
            aria-modal="true"
            className="relative z-10 w-full max-w-3xl"
            role="dialog"
          >
            <button
              className="absolute right-5 top-5 z-10 inline-flex items-center gap-2 rounded-full bg-[#fffaf5] px-4 py-2 text-sm font-semibold text-[#3d2923] shadow-sm transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a64643] dark:bg-[#2b2421] dark:text-[#ead7cb] dark:hover:bg-[#3a2e29]"
              onClick={() => setIsOpen(false)}
              type="button"
            >
              {closeButtonLabel}
              <span aria-hidden className="text-lg leading-none">
                ×
              </span>
            </button>

            <FormBlock
              enableIntro={false}
              form={formWithPredefinedMessage as unknown as FormType}
            />
          </section>
        </div>
      )}
    </>
  )
}
