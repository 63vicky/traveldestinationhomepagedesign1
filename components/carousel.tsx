"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
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
  const [itemsToShow, setItemsToShow] = useState(1) // Default to 1 for SSR/Mobile-first
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
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


  const getGap = () => {
    return itemsToShow === 1 ? '16px' : itemsToShow === 2 ? '24px' : '32px'
  }

  const getItemWidth = () => {
    const gapValue = getGap()
    // Formula: (100% - (itemsToShow - 1) * gap) / itemsToShow
    return `calc((100% - (${itemsToShow} - 1) * ${gapValue}) / ${itemsToShow})`
  }

  if (!isMounted) return <div className="min-h-[400px]" /> // Avoid hydration mismatch

  return (
    <div className="relative w-full group/carousel">
      <div className="overflow-visible px-4 sm:px-8 lg:px-12">
        <div className="overflow-hidden rounded-2xl">
          <div
            className="flex transition-transform duration-700 cubic-bezier(0.4, 0, 0.2, 1)"
            style={{
              transform: `translateX(calc(-${current} * (100% + ${getGap()}) / ${itemsToShow}))`,
              gap: getGap(),
            }}
          >
            {items.map((item, index) => {
              const isActive = index >= current && index < current + itemsToShow
              return (
                <div
                  key={index}
                  className="flex-shrink-0 transition-all duration-700 ease-out"
                  style={{ 
                    width: getItemWidth(),
                    opacity: isActive ? 1 : 0.3,
                    scale: isActive ? 1 : 0.9,
                    filter: isActive ? 'none' : 'blur(2px)',
                  }}
                >
                  {renderItem(item, index)}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      {items.length > itemsToShow && (
        <>
          <button
            onClick={prev}
            className="absolute left-0 sm:-left-4 lg:left-0 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-4 rounded-full transition-all duration-300 z-20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] backdrop-blur-md border border-white/20 opacity-0 group-hover/carousel:opacity-100 hidden sm:flex items-center justify-center hover:scale-110 active:scale-95"
            aria-label="Previous"
          >
            <ChevronLeft size={24} strokeWidth={1.5} />
          </button>
          <button
            onClick={next}
            className="absolute right-0 sm:-right-4 lg:right-0 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-4 rounded-full transition-all duration-300 z-20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] backdrop-blur-md border border-white/20 opacity-0 group-hover/carousel:opacity-100 hidden sm:flex items-center justify-center hover:scale-110 active:scale-95"
            aria-label="Next"
          >
            <ChevronRight size={24} strokeWidth={1.5} />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {items.length > itemsToShow && (
        <div className="flex justify-center items-center gap-3 mt-10">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrent(index)
                setIsAutoplay(false)
              }}
              className={`group/dot relative h-1.5 transition-all duration-500 rounded-full overflow-hidden ${
                index === current
                  ? "bg-[var(--gold)] w-10 shadow-[0_0_10px_rgba(212,175,55,0.5)]"
                  : "bg-white/20 w-3 hover:bg-white/40"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            >
               {index === current && (
                <motion.div
                  layoutId="activeDot"
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                  animate={{
                    x: ['-100%', '100%'],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
