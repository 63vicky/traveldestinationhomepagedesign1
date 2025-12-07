"use client"

import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"

interface FeatureBlockProps {
  icon: LucideIcon
  title: string
  description: string
}

export function FeatureBlock({ icon: Icon, title, description }: FeatureBlockProps) {
  return (
    <motion.div
      className="group text-center p-8"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ y: -8, scale: 1.05 }}
    >
      <motion.div 
        className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[var(--gold)]/10 mb-6"
        whileHover={{ rotate: 360, scale: 1.1 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-[var(--gold)]" />
      </motion.div>
      <h3 className="mb-4 text-xl sm:text-2xl font-normal tracking-tight text-[var(--cream)]" style={{ fontFamily: 'var(--font-playfair)' }}>
        {title}
      </h3>
      <p className="text-[var(--text-light)] leading-relaxed text-sm sm:text-base font-light" style={{ fontFamily: 'var(--font-inter)' }}>
        {description}
      </p>
    </motion.div>
  )
}
