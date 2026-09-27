'use client'

import type { Media as MediaType, MediaCarouselBlock as MediaCarouselBlockProps } from '@/payload-types'
import { Media } from '@/components/Media'
import { CarouselNavigation } from '@/components/MediaCarousel/CarouselNavigation'
import { CarouselPagination } from '@/components/MediaCarousel/CarouselPagination'
import { useEffect, useRef, useState, type CSSProperties } from 'react'

type CarouselItem = {
  id?: string | null
  image: MediaType
}

const aspectRatioClasses = {
  square: 'aspect-square',
  portrait: 'aspect-[4/5]',
  tallPortrait: 'aspect-[2/3]',
  landscape: 'aspect-[4/3]',
  widescreen: 'aspect-video',
}

const calculateSlideBasis = (imagesPerRow: number, gapInRem: number) =>
  `calc(${100 / imagesPerRow}% - ${(gapInRem * (imagesPerRow - 1)) / imagesPerRow}rem)`

export const MediaCarouselBlock: React.FC<MediaCarouselBlockProps & { id?: string }> = ({
  aspectRatio = 'portrait',
  desktopImagesPerRow = 3,
  id,
  infiniteScrolling = false,
  media,
  mobileImagesPerRow = 1,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const items = (media || []).filter(
    (item): item is typeof item & CarouselItem => typeof item.image === 'object' && item.image !== null,
  )
  const canLoop = infiniteScrolling && items.length > 1
  const displayedItems = canLoop ? [...items, ...items, ...items] : items
  const mobileColumns = Math.min(Math.max(mobileImagesPerRow, 1), 3)
  const desktopColumns = Math.min(Math.max(desktopImagesPerRow, 1), 6)
  const hasMobileOverflow = items.length > mobileColumns
  const hasDesktopOverflow = items.length > desktopColumns
  const slideStyle = {
    '--media-carousel-mobile-basis': calculateSlideBasis(mobileColumns, 1),
    '--media-carousel-desktop-basis': calculateSlideBasis(desktopColumns, 1.5),
  } as CSSProperties & Record<'--media-carousel-mobile-basis' | '--media-carousel-desktop-basis', string>
  const aspectRatioClass = aspectRatioClasses[aspectRatio]

  useEffect(() => {
    const carousel = scrollRef.current
    if (!carousel || !canLoop) return

    const positionAtMiddle = () => {
      carousel.scrollLeft = carousel.scrollWidth / 3
    }

    const frame = requestAnimationFrame(positionAtMiddle)
    window.addEventListener('resize', positionAtMiddle)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', positionAtMiddle)
    }
  }, [canLoop, items.length])

  const handleScroll = () => {
    const carousel = scrollRef.current
    if (!carousel) return

    if (canLoop) {
      const groupWidth = carousel.scrollWidth / 3
      if (carousel.scrollLeft < groupWidth * 0.5) carousel.scrollLeft += groupWidth
      if (carousel.scrollLeft > groupWidth * 1.5) carousel.scrollLeft -= groupWidth
    }

    const firstSlide = carousel.firstElementChild as HTMLElement | null
    if (!firstSlide) return

    const gap = Number.parseFloat(window.getComputedStyle(carousel).columnGap) || 0
    const slideWidth = firstSlide.offsetWidth + gap
    setActiveIndex(Math.round(carousel.scrollLeft / slideWidth) % items.length)
  }

  const scrollByVisibleImages = (direction: -1 | 1) => {
    const carousel = scrollRef.current
    const firstSlide = carousel?.firstElementChild as HTMLElement | null
    if (!carousel || !firstSlide) return

    const gap = Number.parseFloat(window.getComputedStyle(carousel).columnGap) || 0
    carousel.scrollBy({
      behavior: 'smooth',
      left: direction * (firstSlide.offsetWidth + gap) * desktopColumns,
    })
  }

  if (!items.length) return null

  return (
    <section className="container py-2 sm:py-8" id={`block-${id}`}>
      <div className="relative">
        <div
          aria-label="Media carousel"
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-6"
          onScroll={handleScroll}
          ref={scrollRef}
          tabIndex={0}
        >
          {displayedItems.map((item, index) => (
            <div
              className={`media-carousel-item relative shrink-0 snap-start ${aspectRatioClass}`}
              key={`${Math.floor(index / items.length)}-${item.id || index % items.length}`}
              style={slideStyle}
            >
              <Media
                fill
                imgClassName="rounded-[2rem] border border-[#e6d9ce] object-cover dark:border-[#3a2e2a]"
                pictureClassName="block h-full w-full"
                resource={item.image}
                videoClassName="rounded-[2rem] border border-[#e6d9ce] object-cover dark:border-[#3a2e2a]"
              />
            </div>
          ))}
        </div>

        {hasDesktopOverflow && (
          <CarouselNavigation
            onNext={() => scrollByVisibleImages(1)}
            onPrevious={() => scrollByVisibleImages(-1)}
          />
        )}

        {hasMobileOverflow && (
          <CarouselPagination activeIndex={activeIndex} className="lg:hidden" itemCount={items.length} />
        )}
        {hasDesktopOverflow && (
          <CarouselPagination activeIndex={activeIndex} className="hidden lg:flex" itemCount={items.length} />
        )}
      </div>
    </section>
  )
}
