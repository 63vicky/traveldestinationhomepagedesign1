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
      className="bg-[var(--cream)] p-8 rounded-lg shadow-lg border border-[var(--gold)]/20"
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={16} className="fill-[var(--gold)] text-[var(--gold)]" />
        ))}
      </div>
      <p className="text-[var(--text-dark)] mb-6 italic leading-relaxed">"{quote}"</p>
      <div className="flex items-center gap-4">
        <img src={image || "/placeholder.svg"} alt={name} className="w-12 h-12 rounded-full object-cover border-2 border-[var(--gold)]/30" />
        <div>
          <p className="font-semibold text-[var(--burgundy)]">{name}</p>
          <p className="text-sm text-[var(--text-muted)]">{location}</p>
        </div>
      </div>
    </motion.div>
  )
}
