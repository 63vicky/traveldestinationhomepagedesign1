"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

interface DestinationCardProps {
  _id?: string
  title: string
  tagline: string
  price: string
  image: string
  id?: string
}

export function DestinationCard({ _id, title, tagline, price, image, id }: DestinationCardProps) {
  return (
    <motion.div
      whileHover={{ y: -15, scale: 1.03 }}
      transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
      className="group relative overflow-hidden cursor-pointer rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500"
    >
      <div className="relative aspect-[4/5] sm:aspect-[3/4] md:aspect-[4/5] overflow-hidden rounded-2xl">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
        />
        
        {/* Advanced Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Content Container */}
        <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end">
          <div className="transform transition-all duration-700 ease-out group-hover:translate-y-0 translate-y-4">
            <div className="mb-4 flex items-start justify-between">
              <div className="p-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 transform -translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                <svg
                  className="w-5 h-5 text-[var(--gold)]"
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
              <div className="bg-[var(--gold)] text-[var(--burgundy)] px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase shadow-lg transform -translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-200">
                Featured
              </div>
            </div>

            <h3 className="text-white mb-2 text-2xl sm:text-3xl font-normal tracking-tight leading-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
              {title}
            </h3>
            
            <p className="text-white/70 mb-5 text-sm sm:text-base leading-relaxed font-light line-clamp-2 group-hover:text-white/90 transition-colors duration-300" style={{ fontFamily: 'var(--font-inter)' }}>
              {tagline}
            </p>
            
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
              <div className="flex flex-col">
                <span className="text-white/50 text-[10px] uppercase tracking-widest mb-1">Starting from</span>
                <span className="text-[var(--gold)] font-medium text-lg sm:text-xl tracking-wide" style={{ fontFamily: 'var(--font-inter)' }}>
                  {price}
                </span>
              </div>
              
              <div className="flex items-center text-white text-sm font-medium tracking-wide bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full backdrop-blur-md border border-white/20 transition-all duration-300 transform group-hover:scale-110">
                <span className="mr-2" style={{ fontFamily: 'var(--font-inter)' }}>Explore</span>
                <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
