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
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group relative overflow-hidden cursor-pointer"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--burgundy)]/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

        <div className="absolute inset-0 p-8 flex flex-col justify-end">
          <div className="transform transition-transform duration-300 group-hover:translate-y-[-8px]">
            <h3 className="text-[var(--cream)] mb-2 text-xl font-semibold">{title}</h3>
            <p className="text-[var(--text-light)] mb-4 text-sm">{tagline}</p>
            <p className="text-[var(--gold)] mb-4 font-semibold">From {price}</p>
            <div className="flex items-center text-[var(--cream)] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="mr-2">View Details</span>
              <ArrowRight size={18} />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
