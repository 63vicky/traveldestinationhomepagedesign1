"use client"

import { motion } from "framer-motion"

interface BlogCardProps {
  title: string
  excerpt: string
  date: string
  category: string
  image: string
}

export function BlogCard({ title, excerpt, date, category, image }: BlogCardProps) {
  return (
    <motion.div 
      className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-[var(--burgundy)]/5"
      whileHover={{ y: -12 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4">
          <div className="px-3 py-1 bg-[var(--gold)] text-[var(--burgundy)] text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg">
            {category}
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      
      <div className="p-6 sm:p-8">
        <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-[0.2em] mb-3 font-medium">{date}</p>
        <h3 className="text-xl sm:text-2xl font-normal text-[var(--burgundy)] mb-3 group-hover:text-[var(--gold)] transition-colors duration-300 leading-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
          {title}
        </h3>
        <p className="text-[var(--text-muted)] text-sm sm:text-base mb-6 font-light leading-relaxed line-clamp-2" style={{ fontFamily: 'var(--font-inter)' }}>
          {excerpt}
        </p>
        
        <div className="flex items-center text-[var(--burgundy)] text-xs font-bold tracking-widest uppercase group/link">
          <span className="mr-2">Read Story</span>
          <div className="h-[1px] w-8 bg-[var(--gold)] transform origin-left group-hover/link:scale-x-150 transition-transform duration-500" />
        </div>
      </div>
    </motion.div>
  )
}
