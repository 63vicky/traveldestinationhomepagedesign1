"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface CarouselProps {
  items: any[]
  renderItem: (item: any, index: number) => React.ReactNode
  autoplay?: boolean
  autoplayInterval?: number
}

export function Carousel({ items, renderItem, autoplay = true, autoplayInterval = 5000 }: CarouselProps) {
  const [current, setCurrent] = useState(0)
  const [isAutoplay, setIsAutoplay] = useState(autoplay)

  useEffect(() => {
    if (!isAutoplay || items.length <= 1) return

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % items.length)
    }, autoplayInterval)

    return () => clearInterval(interval)
  }, [isAutoplay, items.length, autoplayInterval])

  const next = () => {
    setCurrent((prev) => (prev + 1) % items.length)
    setIsAutoplay(false)
  }

  const prev = () => {
    setCurrent((prev) => (prev - 1 + items.length) % items.length)
    setIsAutoplay(false)
  }

  return (
    <div className="relative w-full">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {items.map((item, index) => (
            <div key={index} className="w-full flex-shrink-0">
              {renderItem(item, index)}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      {items.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-[var(--gold)] hover:bg-[var(--cream)] text-[var(--burgundy)] p-2 rounded-full transition-all duration-200 z-10"
            aria-label="Previous"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-[var(--gold)] hover:bg-[var(--cream)] text-[var(--burgundy)] p-2 rounded-full transition-all duration-200 z-10"
            aria-label="Next"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {items.length > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrent(index)
                setIsAutoplay(false)
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === current ? "bg-[var(--gold)] w-8" : "bg-[var(--text-light)]"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
