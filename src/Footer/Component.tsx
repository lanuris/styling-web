import { getCachedGlobal } from '@/utilities/getGlobals'
import type { Locale } from '@/locales'
import React from 'react'

import { CMSLink } from '@/components/Link'

export async function Footer({ locale }: { locale: Locale }) {
  const footerData = await getCachedGlobal('footer', 1, locale)()
  const navItems = footerData?.navItems || []
  const { contact, message } = footerData

  return (
    <footer
      className="mt-auto border-t border-[#e6d9ce] bg-[#f7f2ed] text-[#241c1a] dark:border-[#3a2e2a] dark:bg-[#211b19] dark:text-[#f7f2ed]"
      style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
    >
      <div className="container py-2 sm:py-4">
        <div className="grid gap-8 md:grid-cols-[1fr_auto_1fr] md:items-center">
          <nav className="flex flex-col gap-3 text-sm md:col-start-2 md:justify-self-center md:text-center" aria-label="Footer navigation">
            {navItems.map(({ link }, i) => (
              <CMSLink
                className="text-[#3d2923] transition-colors hover:text-[#9b3437] dark:text-[#ead7cb] dark:hover:text-[#e28c85]"
                key={i}
                {...link}
                locale={locale}
              />
            ))}
          </nav>
          <aside className="max-w-sm md:col-start-3 md:row-start-1 md:justify-self-end md:text-right">
            <p className="text-sm text-[#5a453d] dark:text-[#c9b5a8]">
              Website created by:{' '}
              <span className="font-semibold text-[#3d2923] dark:text-[#ead7cb]">Alexej Luněv</span>
            </p>
            {(message || contact) && (
              <p className="mt-1.5 text-xs leading-relaxed text-[#5a453d] dark:text-[#c9b5a8]">
                {message}
                {message && contact && ' '}
                {contact && (
                  <a
                    className="font-semibold text-[#9b3437] underline decoration-[#9b3437]/40 underline-offset-4 transition-colors hover:text-[#7f282b] hover:decoration-[#7f282b] dark:text-[#e28c85] dark:decoration-[#e28c85]/40 dark:hover:text-[#f0a49e]"
                    href={`mailto:${contact}`}
                  >
                    {contact}
                  </a>
                )}
                {contact && '.'}
              </p>
            )}
          </aside>
        </div>
      </div>
    </footer>
  )
}
