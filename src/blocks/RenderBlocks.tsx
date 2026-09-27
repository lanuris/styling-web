import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { ActiveCataloguesBlock } from '@/blocks/ActiveCatalogues/Component'
import { StyleServiceBlock } from '@/blocks/StyleServiceBlock/Component'
import { StyleServiceMediaBlock } from '@/blocks/StyleServiceMediaBlock/Component'
import { TextMediaBlock } from '@/blocks/TextMediaBlock/Component'
import { QuestionsBlock } from '@/blocks/QuestionsBlock/Component'
import { AdvertisingBlock } from '@/blocks/AdvertisingBlock/Component'
import { MediaCarouselBlock } from '@/blocks/MediaCarousel/Component'
import type { Locale } from '@/locales'

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  activeCatalogues: ActiveCataloguesBlock,
  service: StyleServiceBlock,
  serviceMedia: StyleServiceMediaBlock,
  textMedia: TextMediaBlock,
  questions: QuestionsBlock,
  advertising: AdvertisingBlock,
  mediaCarousel: MediaCarouselBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
  locale: Locale
}> = (props) => {
  const { blocks, locale } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div className={index === 0 ? 'my-10' : 'my-8'} key={index}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} locale={locale} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
//'-mt-16 mb-8 sm:-mt-8'
