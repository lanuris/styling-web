'use client'

import moonIcon from '@/assets/icons/theme-moon.svg'
import sunIcon from '@/assets/icons/theme-sun.svg'
import React from 'react'

import { useTheme } from '..'

export const ThemeSelector: React.FC = () => {
  const { setTheme, theme } = useTheme()
  const isDark = (theme ?? 'light') === 'dark'
  const nextTheme = isDark ? 'light' : 'dark'

  return (
    <button
      aria-checked={isDark}
      aria-label={`Switch to ${nextTheme} theme`}
      className="flex rounded-full border border-[#c9b7aa] bg-[#fffaf5] p-1 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9b3437] focus-visible:ring-offset-2 dark:border-[#5b4740] dark:bg-[#2b211e] dark:focus-visible:ring-[#e28c85]"
      onClick={() => setTheme(nextTheme)}
      role="switch"
      type="button"
    >
      <span
        aria-hidden
        className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
          isDark
            ? 'text-[#6b5148] dark:text-[#d8c7bb]'
            : 'bg-[#9b3437] text-[#fffaf5] shadow-sm ring-2 ring-[#9b3437] ring-offset-1 dark:bg-[#e28c85] dark:text-[#2b211e] dark:ring-[#e28c85] dark:ring-offset-[#2b211e]'
        }`}
      >
        <span
          className="h-4 w-4 bg-current [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain] [-webkit-mask-position:center] [-webkit-mask-repeat:no-repeat] [-webkit-mask-size:contain]"
          style={{ maskImage: `url(${sunIcon.src})`, WebkitMaskImage: `url(${sunIcon.src})` }}
        />
      </span>
      <span
        aria-hidden
        className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
          isDark
            ? 'bg-[#9b3437] text-[#fffaf5] shadow-sm ring-2 ring-[#9b3437] ring-offset-1 dark:bg-[#e28c85] dark:text-[#2b211e] dark:ring-[#e28c85] dark:ring-offset-[#2b211e]'
            : 'text-[#6b5148] dark:text-[#d8c7bb]'
        }`}
      >
        <span
          className="h-4 w-4 bg-current [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain] [-webkit-mask-position:center] [-webkit-mask-repeat:no-repeat] [-webkit-mask-size:contain]"
          style={{ maskImage: `url(${moonIcon.src})`, WebkitMaskImage: `url(${moonIcon.src})` }}
        />
      </span>
    </button>
  )
}
