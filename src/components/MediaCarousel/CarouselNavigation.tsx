'use client'

import nextArrow from '@/assets/icons/carousel-arrow-next.svg'
import previousArrow from '@/assets/icons/carousel-arrow-previous.svg'

type CarouselNavigationProps = {
  onNext: () => void
  onPrevious: () => void
}

export const CarouselNavigation: React.FC<CarouselNavigationProps> = ({ onNext, onPrevious }) => {
  const buttonClassName =
    'absolute top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[#e6d9ce] bg-[#fffaf5]/90 text-[#9b3437] shadow-lg backdrop-blur-sm transition-colors hover:bg-[#9b3437] hover:text-[#fffaf5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9b3437] focus-visible:ring-offset-4 dark:border-[#3a2e2a] dark:bg-[#2b211e]/90 dark:text-[#e28c85] dark:hover:bg-[#e28c85] dark:hover:text-[#2b211e] lg:flex'

  return (
    <>
      <button
        aria-label="Previous images"
        className={`${buttonClassName} left-4 lg:-left-16`}
        onClick={onPrevious}
        type="button"
      >
        <span
          aria-hidden
          className="h-5 w-5 bg-current [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain] [-webkit-mask-position:center] [-webkit-mask-repeat:no-repeat] [-webkit-mask-size:contain]"
          style={{ maskImage: `url(${previousArrow.src})`, WebkitMaskImage: `url(${previousArrow.src})` }}
        />
      </button>
      <button
        aria-label="Next images"
        className={`${buttonClassName} right-4 lg:-right-16`}
        onClick={onNext}
        type="button"
      >
        <span
          aria-hidden
          className="h-5 w-5 bg-current [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain] [-webkit-mask-position:center] [-webkit-mask-repeat:no-repeat] [-webkit-mask-size:contain]"
          style={{ maskImage: `url(${nextArrow.src})`, WebkitMaskImage: `url(${nextArrow.src})` }}
        />
      </button>
    </>
  )
}
