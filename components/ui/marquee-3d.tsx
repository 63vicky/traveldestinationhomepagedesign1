"use client"

import React, { useRef, useEffect, useState } from "react"
import { motion, useAnimationFrame, useMotionValue, useTransform } from "framer-motion"

interface Marquee3DProps {
  children: React.ReactNode[]
  speed?: number
  rows?: number
  pauseOnHover?: boolean
  className?: string
}

export function Marquee3D({ 
  children, 
  speed = 40, 
  rows = 2, 
  pauseOnHover = true,
  className = "" 
}: Marquee3DProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Split children into rows
  const rowItems = Array.from({ length: rows }, (_, i) => {
    const start = Math.floor((children.length / rows) * i)
    const end = Math.floor((children.length / rows) * (i + 1))
    return children.slice(start, end)
  })

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden py-10 ${className}`}
      style={{
        perspective: "1200px",
        WebkitPerspective: "1200px",
      }}
    >
      <div 
        className="flex flex-col gap-6 sm:gap-10"
        style={{
          transform: "rotateX(15deg) rotateY(-5deg) rotateZ(-2deg)",
          transformStyle: "preserve-3d",
        }}
      >
        {rowItems.map((items, rowIndex) => (
          <MarqueeRow 
            key={rowIndex} 
            items={items} 
            speed={speed * (1 + rowIndex * 0.2)} 
            direction={rowIndex % 2 === 0 ? "left" : "right"}
            pauseOnHover={pauseOnHover}
          />
        ))}
      </div>

      {/* Edge Gradient Masks */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[var(--cream)] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[var(--cream)] to-transparent z-10 pointer-events-none" />
    </div>
  )
}

interface MarqueeRowProps {
  items: React.ReactNode[]
  speed: number
  direction: "left" | "right"
  pauseOnHover: boolean
}

function MarqueeRow({ items, speed, direction, pauseOnHover }: MarqueeRowProps) {
  const [isHovered, setIsHovered] = useState(false)
  const x = useMotionValue(0)
  
  // Create a seamless loop by duplicating items
  const duplicatedItems = [...items, ...items, ...items]

  useAnimationFrame((t, delta) => {
    if (pauseOnHover && isHovered) return

    const moveBy = (delta / 1000) * speed
    const currentX = x.get()
    
    if (direction === "left") {
      const nextX = currentX - moveBy
      // Reset when we've moved past one complete set of items
      // This is a simplification; ideally we'd measure the content width
      if (nextX <= -100) {
        x.set(0)
      } else {
        x.set(nextX)
      }
    } else {
      const nextX = currentX + moveBy
      if (nextX >= 0) {
        x.set(-100)
      } else {
        x.set(nextX)
      }
    }
  })

  // We'll use a CSS-based marquee for better performance and simplicity in infinite looping
  const animationDuration = 100 / (speed / 10) // rough estimation

  return (
    <div 
      className="flex whitespace-nowrap"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div 
        className="flex gap-6 sm:gap-10"
        animate={{
          x: direction === "left" ? ["0%", "-33.33%"] : ["-33.33%", "0%"]
        }}
        transition={{
          duration: speed,
          ease: "linear",
          repeat: Infinity,
        }}
        style={{
          // Pause animation on hover
          animationPlayState: pauseOnHover && isHovered ? "paused" : "running"
        }}
      >
        {duplicatedItems.map((child, index) => (
          <div key={index} className="inline-block">
            {child}
          </div>
        ))}
      </motion.div>
    </div>
  )
}
