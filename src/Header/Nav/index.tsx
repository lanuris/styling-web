'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { Instagram } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { isLocale, locales, type Locale } from '@/locales'



export const HeaderNav: React.FC<{ data: HeaderType; locale: Locale }> = ({ data, locale }) => {
  const instagramUrl = data?.instagramUrl
  const navItems = data?.navItems || []

  return (
    <nav className="flex flex-col items-start gap-5 md:flex-row md:items-center md:gap-8" aria-label="Main navigation">
      <div className="flex flex-col items-start gap-5 md:flex-row md:items-center md:gap-16">
        {navItems.map(({ link }, i) => {
          return <CMSLink key={i} {...link} appearance="link" className="text-lg" locale={locale} />
        })}
      </div>
      {instagramUrl && (
        <a
          aria-label="Instagram"
          className="text-[#E4405F] transition-opacity hover:opacity-60"
          href={instagramUrl}
          rel="noopener noreferrer"
          target="_blank"
        >
          <Instagram className="h-7 w-7" />
        </a>
      )}
    </nav>
  )
}

export const HeaderActions: React.FC<{ locale: Locale }> = ({ locale }) => {
  const pathname = usePathname()
  const [firstSegment, ...pathSegments] = pathname.split('/').filter(Boolean)
  const pathWithoutLocale = isLocale(firstSegment) ? `/${pathSegments.join('/')}` || '/' : pathname

  return (
    <div className="flex items-center gap-3">
      <ThemeSelector />
      <div className="flex gap-2" aria-label="Language">
        {locales.map((nextLocale) => (
          <a
            key={nextLocale}
            href={`/${nextLocale}${pathWithoutLocale}`}
            aria-current={locale === nextLocale ? 'page' : undefined}
            className={locale === nextLocale ? 'font-semibold' : 'opacity-60 hover:opacity-100'}
          >
            {nextLocale.toUpperCase()}
          </a>
        ))}
      </div>
    </div>
  )
}
