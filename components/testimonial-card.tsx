"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"

interface TestimonialCardProps {
  quote: string
  name: string
  location: string
  image: string
}

export function TestimonialCard({ quote, name, location, image }: TestimonialCardProps) {
  return (
    <motion.div 
      className="bg-white/40 backdrop-blur-xl p-8 sm:p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-white/50 relative overflow-hidden group w-[350px] sm:w-[450px]"
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* Decorative Quote Mark */}
      <div className="absolute top-0 right-0 p-8 opacity-[0.05] group-hover:opacity-[0.1] transition-opacity duration-500">
        <svg width="100" height="100" viewBox="0 0 24 24" fill="var(--burgundy)">
          <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C15.4647 8 15.017 8.44772 15.017 9V12C15.017 12.5523 14.5693 13 14.017 13H12.017V21H14.017ZM6.017 21L6.017 18C6.017 16.8954 6.91243 16 8.017 16H11.017C11.5693 16 12.017 15.5523 12.017 15V9C12.017 8.44772 11.5693 8 11.017 8H8.017C7.46472 8 7.017 8.44772 7.017 9V12C7.017 12.5523 6.5693 13 6.017 13H4.017V21H6.017Z" />
        </svg>
      </div>

      <div className="flex gap-1.5 mb-8">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={16} className="fill-[var(--gold)] text-[var(--gold)]" />
        ))}
      </div>
      
      <p className="text-[var(--burgundy)] mb-12 text-xl sm:text-2xl font-light italic leading-relaxed relative z-10" style={{ fontFamily: 'var(--font-playfair)' }}>
        "{quote}"
      </p>
      
      <div className="flex items-center gap-5 mt-auto">
        <div className="relative">
          <img src={image || "/placeholder.svg"} alt={name} className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-xl" />
          <div className="absolute -bottom-1 -right-1 bg-[var(--gold)] rounded-full p-1.5 border-2 border-white">
            <svg className="w-2.5 h-2.5 text-[var(--burgundy)]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
            </svg>
          </div>
        </div>
        <div>
          <p className="font-semibold text-[var(--burgundy)] text-lg uppercase tracking-wider">{name}</p>
          <p className="text-xs text-[var(--text-muted)] font-bold tracking-[0.2em] uppercase opacity-60">{location}</p>
        </div>
      </div>
    </motion.div>
  )
}
