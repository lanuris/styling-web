'use client'

import { Media } from '@/components/Media'
import type { TextMediaBlock as TextMediaBlockProps } from '@/payload-types'
import { cn } from '@/utilities/ui'
import { useEffect, useRef, useState } from 'react'

const textSizeClasses = {
  large: 'text-xl leading-relaxed sm:text-2xl',
  medium: 'text-lg leading-relaxed sm:text-xl',
  small: 'text-base leading-relaxed sm:text-lg',
}

const textFontFamilies = {
  sans: 'var(--font-geist-sans), Arial, sans-serif',
  serif: "Georgia, 'Times New Roman', serif",
}

export const TextMediaBlock: React.FC<TextMediaBlockProps & { id?: string }> = ({
  id,
  media,
  mediaPosition = 'left',
  text,
  textFont = 'serif',
  textSize = 'medium',
  title,
}) => {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setIsVisible(true)
        observer.disconnect()
      },
      { threshold: 0.2 },
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="container overflow-x-clip py-6 sm:py-8" id={`block-${id}`} ref={sectionRef}>
      <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
        <div
          className={cn(
            'transform-gpu transition-[opacity,transform] duration-700 ease-out [will-change:transform] motion-reduce:translate-x-0 motion-reduce:opacity-100 motion-reduce:transition-none',
            mediaPosition === 'right' && 'lg:order-2',
            isVisible
              ? 'translate-x-0 opacity-100'
              : mediaPosition === 'right'
                ? 'translate-x-12 opacity-0'
                : '-translate-x-12 opacity-0',
          )}
        >
          <Media
            className="w-full"
            imgClassName="h-auto w-full rounded-[2.5rem] border border-[#e6d9ce]"
            pictureClassName="block w-full"
            resource={media}
            videoClassName="h-auto w-full rounded-[2.5rem] border border-[#e6d9ce]"
          />
        </div>

        <article
          className={cn(
            'relative overflow-hidden rounded-[2.5rem] bg-[#f7f2ed] text-[#241c1a] shadow-[0_20px_60px_-30px_rgba(61,41,35,0.35)] ring-1 ring-[#e6d9ce] dark:bg-[#211b19] dark:text-[#f7f2ed] dark:ring-[#3a2e2a]',
            'transform-gpu transition-[opacity,transform] delay-150 duration-700 ease-out [will-change:transform] motion-reduce:translate-x-0 motion-reduce:opacity-100 motion-reduce:transition-none',
            isVisible
              ? 'translate-x-0 opacity-100'
              : mediaPosition === 'right'
                ? '-translate-x-12 opacity-0'
                : 'translate-x-12 opacity-0',
          )}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#9b3437]/5 blur-3xl dark:bg-[#e28c85]/10"
          />
          <div className="relative px-6 py-12 sm:px-12 sm:py-16 lg:px-16 lg:py-20">
            <h2
              className="text-4xl font-semibold leading-tight tracking-[0.02em] text-[#3d2923] sm:text-5xl dark:text-[#ead7cb]"
              style={{ fontFamily: textFontFamilies[textFont] }}
            >
              {title}
            </h2>
            <p
              className={cn('mt-8 whitespace-pre-line text-[#4c3933] dark:text-[#ead7cb]', textSizeClasses[textSize])}
              style={{ fontFamily: textFontFamilies[textFont] }}
            >
              {text}
            </p>
          </div>
        </article>
      </div>
    </section>
  )
}
