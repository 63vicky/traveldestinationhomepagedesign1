"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

export function SignatureTour() {
  return (
    <section id="tours" className="relative min-h-[500px] sm:h-[600px] flex items-center justify-center py-12 sm:py-0">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1599722173432-b55f3cb1d3ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
          alt="Lake Palace Jaipur"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--burgundy)]/80 via-[var(--burgundy)]/60 to-[var(--burgundy)]/30" />
      </div>

      <div className="relative z-10 text-[var(--cream)] px-6 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block bg-[var(--gold)] text-[var(--burgundy)] px-5 py-2.5 mb-8 rounded-md font-medium tracking-wider text-xs uppercase" style={{ fontFamily: 'var(--font-inter)' }}>
            Signature Experience
          </div>
          <h2 className="text-white mb-6 text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
            Promos & Packages
          </h2>
          <p className="text-white/90 mb-10 leading-relaxed text-lg sm:text-xl font-light" style={{ fontFamily: 'var(--font-inter)' }}>
            Explore classic Rajasthan with its imperial forts, grand havelis, vibrant bazaars, and private cultural
            workshops. An unforgettable 10-day journey through India's most iconic destinations.
          </p>
          <button className="btn-primary flex items-center gap-2">
            View Tour Details
            <ArrowRight size={20} />
          </button>
        </motion.div>
      </div>
    </section>
  )
}
