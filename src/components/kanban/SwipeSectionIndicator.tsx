import { useEffect, useState } from 'react'

interface SwipeSectionIndicatorProps {
  containerId: string
  sections: string[]
}

export function SwipeSectionIndicator({
  containerId,
  sections,
}: SwipeSectionIndicatorProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const container = document.getElementById(containerId)

    if (!container) return

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft
      const width = container.clientWidth

      if (!width) return

      const index = Math.round(scrollLeft / width)

      setActiveIndex(
        Math.min(
          Math.max(index, 0),
          sections.length - 1,
        ),
      )
    }

    container.addEventListener(
      'scroll',
      handleScroll,
      { passive: true },
    )

    handleScroll()

    return () => {
      container.removeEventListener(
        'scroll',
        handleScroll,
      )
    }
  }, [containerId, sections.length])

  function scrollToSection(index: number) {
    const container =
      document.getElementById(containerId)

    if (!container) return

    container.scrollTo({
      left:
        index * container.clientWidth,
      behavior: 'smooth',
    })
  }

  return (
    <div
      className="
        flex items-center justify-center
        gap-1.5 py-3
        xl:hidden
      "
      aria-label="Kanban sections"
    >
      {sections.map((section, index) => (
        <button
          key={section}
          type="button"
          onClick={() =>
            scrollToSection(index)
          }
          aria-label={`Go to ${section}`}
          aria-current={
            activeIndex === index
              ? 'true'
              : undefined
          }
          className={[
            'rounded-full transition-all duration-200',
            activeIndex === index
              ? 'h-2 w-6 bg-violet-600'
              : 'h-2 w-2 bg-slate-300 hover:bg-slate-400',
          ].join(' ')}
        />
      ))}
    </div>
  )
}