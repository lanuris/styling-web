import React from 'react'

import type { Page } from '@/payload-types'

import { ChapterHero } from '@/heros/Chapter'
import { HighImpactHero } from '@/heros/HighImpact'
import { HighImpactOverlayHero } from '@/heros/HighImpactOverlay'
import { LowImpactHero } from '@/heros/LowImpact'
import { MediumImpactHero } from '@/heros/MediumImpact'

const heroes = {
  chapter: ChapterHero,
  highImpact: HighImpactHero,
  highImpactOverlay: HighImpactOverlayHero,
  lowImpact: LowImpactHero,
  mediumImpact: MediumImpactHero,
}

export const RenderHero: React.FC<Page['hero']> = (props) => {
  const { type } = props || {}

  if (!type || type === 'none') return null

  const HeroToRender = heroes[type]

  if (!HeroToRender) return null

  return <HeroToRender {...props} />
}
