"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

interface DestinationCardProps {
  title: string
  tagline: string
  price: string
  image: string
  id?: string
}

export function DestinationCard({ title, tagline, price, image, id }: DestinationCardProps) {
  return (
    <motion.div
      whileHover={{ y: -12, scale: 1.02 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="group relative overflow-hidden cursor-pointer rounded-lg"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-lg shadow-xl group-hover:shadow-2xl transition-shadow duration-500">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-85 group-hover:opacity-95 transition-opacity duration-500" />

        <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end">
          <div className="transform transition-all duration-500 group-hover:translate-y-[-12px]">
            <div className="mb-3">
              <svg
                className="w-5 h-5 text-white/90 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <h3 className="text-white mb-3 text-xl sm:text-2xl font-normal tracking-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
              {title}
            </h3>
            <p className="text-white/80 mb-4 text-sm sm:text-base leading-relaxed font-light" style={{ fontFamily: 'var(--font-inter)' }}>
              {tagline}
            </p>
            <p className="text-[var(--gold)] mb-5 font-medium text-base sm:text-lg tracking-wide" style={{ fontFamily: 'var(--font-inter)' }}>
              From {price}
            </p>
            <div className="flex items-center text-white opacity-0 group-hover:opacity-100 transition-all duration-500 text-sm sm:text-base font-medium tracking-wide">
              <span className="mr-2" style={{ fontFamily: 'var(--font-inter)' }}>View Details</span>
              <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
