import React from 'react'

import type { Page } from '@/payload-types'

import RichText from '@/components/RichText'

export const ChapterHero: React.FC<Page['hero']> = ({ richText }) => {
  if (!richText) return null

  return (
    <section className="container mt-8 sm:mt-12 -mb-18 sm:mb-0 ">
      <RichText
        className="grid gap-x-16 gap-y-8 font-[Georgia,'Times_New_Roman',serif] text-[#241c1a] lg:grid-cols-[minmax(14rem,0.72fr)_minmax(0,1.28fr)] dark:text-[#f7f2ed] [&_a]:font-semibold [&_a]:text-[#9b3437] [&_a]:underline [&_a]:decoration-[#9b3437]/40 [&_a]:underline-offset-4 [&_a]:transition-colors [&_a:hover]:text-[#6f2024] dark:[&_a]:text-[#e28c85] dark:[&_a:hover]:text-[#f0aca5] [&_h1]:m-0 [&_h1]:w-min [&_h1]:break-keep [&_h1]:border-b-2 [&_h1]:border-[#9b3437] [&_h1]:pb-7 [&_h1]:text-5xl [&_h1]:font-semibold [&_h1]:leading-[0.96] [&_h1]:tracking-[0.055em] [&_h1]:text-[#3d2923] sm:[&_h1]:pb-9 sm:[&_h1]:text-6xl lg:[&_h1]:row-span-4 lg:[&_h1]:text-7xl dark:[&_h1]:border-[#e28c85] dark:[&_h1]:text-[#ead7cb] [&_h2]:mt-5 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:leading-tight [&_h2]:tracking-[0.02em] [&_h2]:text-[#3d2923] lg:[&_h2]:col-start-2 dark:[&_h2]:text-[#ead7cb] [&_p]:max-w-2xl [&_p]:text-lg [&_p]:leading-[1.75] [&_p]:text-[#594a45] lg:[&_p]:col-start-2 sm:[&_p]:text-xl dark:[&_p]:text-[#d9c9c0] [&_ul]:max-w-2xl [&_ul]:list-disc [&_ul]:space-y-3 [&_ul]:pl-6 lg:[&_ul]:col-start-2 [&_ol]:max-w-2xl [&_ol]:list-decimal [&_ol]:space-y-3 [&_ol]:pl-6 lg:[&_ol]:col-start-2"
        data={richText}
        enableGutter={false}
        enableProse={false}
      />
    </section>
  )
}
