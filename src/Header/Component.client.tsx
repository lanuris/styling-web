'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MoreHorizontal, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderActions, HeaderNav } from './Nav'
import type { Locale } from '@/locales'

interface HeaderClientProps {
  data: Header
  locale: Locale
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data, locale }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    setMobileMenuOpen(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme !== theme) setTheme(headerTheme ?? null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80"
      style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <div className="container relative flex items-center justify-between py-2 md:grid md:grid-cols-[1fr_auto_1fr] md:py-3">
        <Link href={`/${locale}`}>
          <Logo
            loading="eager"
            priority="high"
            className="!h-11 !w-44 object-cover md:!h-[4.5rem] md:!w-[18rem] dark:invert"
          />
        </Link>
        <div className="hidden md:block">
          <HeaderNav data={data} locale={locale} />
        </div>
        <div className="hidden justify-self-end md:block">
          <HeaderActions locale={locale} />
        </div>
        <button
          aria-controls="mobile-navigation"
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          className="rounded p-2 transition-colors hover:bg-foreground/10 md:hidden"
          onClick={() => setMobileMenuOpen((isOpen) => !isOpen)}
          type="button"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <MoreHorizontal className="h-6 w-6" />}
        </button>
        {mobileMenuOpen && (
          <div
            className="absolute inset-x-0 top-full border-b border-border bg-background px-4 py-6 shadow-lg md:hidden"
            id="mobile-navigation"
          >
            <div className="flex flex-col gap-6">
              <HeaderNav data={data} locale={locale} />
              <HeaderActions locale={locale} />
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
