type CarouselPaginationProps = {
  activeIndex: number
  className?: string
  itemCount: number
}

export const CarouselPagination: React.FC<CarouselPaginationProps> = ({
  activeIndex,
  className,
  itemCount,
}) => {
  return (
    <div aria-hidden className={`mt-2 flex justify-center gap-2 ${className || ''}`}>
      {Array.from({ length: itemCount }, (_, index) => (
        <span
          className={
            index === activeIndex
              ? 'h-2 w-6 rounded-full bg-[#9b3437] transition-all dark:bg-[#e28c85]'
              : 'h-2 w-2 rounded-full bg-[#c9b7aa] transition-all dark:bg-[#5b4740]'
          }
          key={index}
        />
      ))}
    </div>
  )
}
