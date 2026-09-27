import type { StaticImageData } from 'next/image'

import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

import type { MediaBlock as MediaBlockProps } from '@/payload-types'

import { Media } from '../../components/Media'

type Props = MediaBlockProps & {
  breakout?: boolean
  captionClassName?: string
  className?: string
  enableGutter?: boolean
  imgClassName?: string
  staticImage?: StaticImageData
  disableInnerContainer?: boolean
}

export const MediaBlock: React.FC<Props> = (props) => {
  const {
    captionClassName,
    className,
    enableGutter = true,
    imgClassName,
    media,
    scale = 100,
    staticImage,
    disableInnerContainer,
  } = props
  const originalWidth = media && typeof media === 'object' ? media.width : undefined
  const scaledWidth =
    typeof originalWidth === 'number' && originalWidth > 0 && typeof scale === 'number' && scale > 0
      ? (originalWidth * scale) / 100
      : undefined

  let caption
  if (media && typeof media === 'object') caption = media.caption

  return (
    <div
      className={cn(
        '',
        {
          container: enableGutter,
        },
        className,
      )}
    >
      {(media || staticImage) && (
        <div
          className={cn(scaledWidth && 'max-w-full')}
          style={scaledWidth ? { width: `${scaledWidth}px` } : undefined}
        >
          <Media
            className={cn(scaledWidth && 'w-full')}
            imgClassName={cn('h-auto w-full border border-border rounded-[0.8rem]', imgClassName)}
            pictureClassName={cn(scaledWidth && 'block w-full')}
            resource={media}
            src={staticImage}
            videoClassName={cn(scaledWidth && 'h-auto w-full')}
          />
        </div>
      )}
      {caption && (
        <div
          className={cn(
            'mt-6',
            {
              container: !disableInnerContainer,
            },
            captionClassName,
          )}
        >
          <RichText data={caption} enableGutter={false} />
        </div>
      )}
    </div>
  )
}
