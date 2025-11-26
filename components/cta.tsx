"use client"

import { motion } from "framer-motion"

export function CTA() {
  return (
    <section id="contact" className="relative py-32 bg-[var(--charcoal)]">
      <div className="container-custom text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-[var(--cream)] mb-8 text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
            Start Your Adventure Today
          </h2>
          <p className="text-white/90 mb-10 text-lg sm:text-xl leading-relaxed font-light" style={{ fontFamily: 'var(--font-inter)' }}>
            Let our travel advisors craft the perfect journey tailored to your dreams.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <button className="btn-primary">Contact Our Travel Advisor</button>
            <button className="btn-secondary border-[var(--cream)] text-[var(--cream)] hover:bg-[var(--cream)] hover:text-[var(--charcoal)]">Browse All Destinations</button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
