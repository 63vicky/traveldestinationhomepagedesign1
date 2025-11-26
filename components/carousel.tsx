"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface CarouselProps {
  items: any[]
  renderItem: (item: any, index: number) => React.ReactNode
  autoplay?: boolean
  autoplayInterval?: number
  itemsPerView?: {
    mobile?: number
    tablet?: number
    desktop?: number
  }
}

export function Carousel({
  items,
  renderItem,
  autoplay = true,
  autoplayInterval = 5000,
  itemsPerView = { mobile: 1, tablet: 2, desktop: 3 },
}: CarouselProps) {
  const [current, setCurrent] = useState(0)
  const [isAutoplay, setIsAutoplay] = useState(autoplay)
  const [itemsToShow, setItemsToShow] = useState(itemsPerView.desktop || 3)

  useEffect(() => {
    const updateItemsToShow = () => {
      if (window.innerWidth >= 1024) {
        setItemsToShow(itemsPerView.desktop || 3)
      } else if (window.innerWidth >= 640) {
        setItemsToShow(itemsPerView.tablet || 2)
      } else {
        setItemsToShow(itemsPerView.mobile || 1)
      }
    }

    updateItemsToShow()
    window.addEventListener("resize", updateItemsToShow)
    return () => window.removeEventListener("resize", updateItemsToShow)
  }, [itemsPerView])

  const maxIndex = Math.max(0, items.length - itemsToShow)

  useEffect(() => {
    if (!isAutoplay || items.length <= itemsToShow) return

    const interval = setInterval(() => {
      setCurrent((prev) => (prev >= maxIndex ? 0 : prev + 1))
    }, autoplayInterval)

    return () => clearInterval(interval)
  }, [isAutoplay, items.length, itemsToShow, maxIndex, autoplayInterval])

  const next = () => {
    setCurrent((prev) => (prev >= maxIndex ? 0 : prev + 1))
    setIsAutoplay(false)
  }

  const prev = () => {
    setCurrent((prev) => (prev <= 0 ? maxIndex : prev - 1))
    setIsAutoplay(false)
  }

  const getItemWidth = () => {
    // Show partial items on sides - make items slightly smaller to show peek
    if (itemsToShow >= 3) {
      return `${90 / itemsToShow}%`
    }
    return `${100 / itemsToShow}%`
  }

  const getGap = () => {
    return itemsToShow >= 3 ? '1.5rem' : '1rem'
  }

  return (
    <div className="relative w-full">
      <div className="overflow-visible px-4 sm:px-8 md:px-12 lg:px-16">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-out"
            style={{
              transform: `translateX(-${current * (100 / itemsToShow)}%)`,
              gap: getGap(),
            }}
          >
            {items.map((item, index) => (
              <div
                key={index}
                className="flex-shrink-0"
                style={{ width: getItemWidth() }}
              >
                {renderItem(item, index)}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      {items.length > itemsToShow && (
        <>
          <button
            onClick={prev}
            className="absolute left-0 sm:left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-[var(--burgundy)] p-3 rounded-full transition-all duration-300 z-20 shadow-xl hover:shadow-2xl backdrop-blur-sm"
            aria-label="Previous"
          >
            <ChevronLeft size={24} strokeWidth={2.5} />
          </button>
          <button
            onClick={next}
            className="absolute right-0 sm:right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-[var(--burgundy)] p-3 rounded-full transition-all duration-300 z-20 shadow-xl hover:shadow-2xl backdrop-blur-sm"
            aria-label="Next"
          >
            <ChevronRight size={24} strokeWidth={2.5} />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {items.length > itemsToShow && (
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrent(index)
                setIsAutoplay(false)
              }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === current
                  ? "bg-[var(--burgundy)] w-10"
                  : "bg-[var(--text-muted)]/40 w-1.5 hover:bg-[var(--text-muted)]/60"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
