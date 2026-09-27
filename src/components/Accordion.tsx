'use client'

import { cn } from '@/utilities/ui'
import { useId, useState, type ReactNode } from 'react'

type AccordionItem = {
  id?: string | null
}

type AccordionProps<T extends AccordionItem> = {
  buttonPosition?: 'left' | 'right'
  className?: string
  itemClassName?: string
  items: T[]
  renderContent: (item: T, index: number) => ReactNode
  renderLabel: (item: T, index: number, isOpen: boolean) => ReactNode
}

export function Accordion<T extends AccordionItem>({
  buttonPosition = 'right',
  className,
  itemClassName,
  items,
  renderContent,
  renderLabel,
}: AccordionProps<T>) {
  const accordionId = useId().replace(/:/g, '')
  const [openItem, setOpenItem] = useState<string | null>(null)

  return (
    <div className={className}>
      {items.map((item, index) => {
        const itemId = String(item.id || `${accordionId}-${index}`)
        const answerId = `${itemId}-answer`
        const isOpen = openItem === itemId
        const indicator = (
          <span
            aria-hidden
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#c9b7aa] text-[#9b3437] transition-colors group-hover:bg-[#9b3437] group-hover:text-[#fffaf5] dark:border-[#5b4740] dark:text-[#e28c85] dark:group-hover:bg-[#e28c85] dark:group-hover:text-[#2b211e]"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
              <path d="M5 12h14" strokeLinecap="round" />
              <path
                className={cn('origin-center transition-transform duration-200', isOpen && 'scale-y-0')}
                d="M12 5v14"
                strokeLinecap="round"
              />
            </svg>
          </span>
        )

        return (
          <div className={itemClassName} key={itemId}>
            <button
              aria-controls={answerId}
              aria-expanded={isOpen}
              className="group flex w-full items-center justify-between gap-6 py-7 text-left sm:py-8"
              onClick={() => setOpenItem(isOpen ? null : itemId)}
              type="button"
            >
              {buttonPosition === 'left' && indicator}
              <div className="min-w-0 flex-1">{renderLabel(item, index, isOpen)}</div>
              {buttonPosition === 'right' && indicator}
            </button>

            <div
              className={cn(
                'grid transition-[grid-template-rows,opacity] duration-300 ease-out',
                isOpen ? 'grid-rows-[1fr] pb-8 opacity-100' : 'grid-rows-[0fr] opacity-0',
              )}
              id={answerId}
            >
              <div className="overflow-hidden">{renderContent(item, index)}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
