'use client'

import type { Page } from '@/payload-types'

import { Media } from '@/components/Media'
import { HighImpactHero } from '@/heros/HighImpact'

export const HighImpactOverlayHero: React.FC<Page['hero']> = ({
  overlayMedia,
  overlayPositionX,
  overlayPositionY,
  overlayScale,
  ...heroProps
}) => {
  const svgScale = typeof overlayScale === 'number' ? overlayScale : 100
  const svgPositionX = typeof overlayPositionX === 'number' ? overlayPositionX : 0
  const svgPositionY = typeof overlayPositionY === 'number' ? overlayPositionY : 0

  return (
    <div className="relative">
      <HighImpactHero {...heroProps} />
      {overlayMedia && typeof overlayMedia === 'object' && (
        <div className="pointer-events-none absolute inset-0 z-0">
          <div className="container h-full pb-0 sm:pb-0">
            <div className="relative h-full overflow-hidden rounded-b-2xl md:rounded-b-3xl">
              <div
                className="absolute inset-0"
                style={{
                  transform: `translate(${svgPositionX}%, ${svgPositionY}%) scale(${svgScale / 100})`,
                }}
              >
                <Media
                  fill
                  imgClassName="object-contain"
                  pictureClassName="block h-full w-full"
                  priority
                  resource={overlayMedia}
                  videoClassName="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
