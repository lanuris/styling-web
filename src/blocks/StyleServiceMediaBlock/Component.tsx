'use client'

import { Media } from '@/components/Media'
import type { StyleServiceMediaBlock as StyleServiceMediaBlockProps } from '@/payload-types'
import { cn } from '@/utilities/ui'
import { useEffect, useRef, useState } from 'react'

import { StyleServiceCard } from '../StyleServiceBlock/StyleServiceCard'

export const StyleServiceMediaBlock: React.FC<StyleServiceMediaBlockProps & { id?: string }> = ({
  closeButtonLabel,
  contactButtonLabel,
  contactForm,
  id,
  media,
  mediaPosition = 'left',
  service,
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

  if (typeof service !== 'object' || !service) return null

  return (
    <section
      className="container overflow-x-clip py-6 sm:py-8"
      id={`block-${id}`}
      ref={sectionRef}
      style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
    >
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
        <div
          className={cn(
            'transform-gpu transition-[opacity,transform] delay-150 duration-700 ease-out [will-change:transform] motion-reduce:translate-x-0 motion-reduce:opacity-100 motion-reduce:transition-none',
            isVisible
              ? 'translate-x-0 opacity-100'
              : mediaPosition === 'right'
                ? '-translate-x-12 opacity-0'
                : 'translate-x-12 opacity-0',
          )}
        >
          <StyleServiceCard
            {...service}
            closeButtonLabel={closeButtonLabel}
            contactButtonLabel={contactButtonLabel}
            contactForm={contactForm}
          />
        </div>
      </div>
    </section>
  )
}
