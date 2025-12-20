"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

export function SignatureTour() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="tours" className="relative min-h-[500px] sm:h-[600px] flex items-center justify-center py-12 sm:py-0">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1121&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Lake Palace Jaipur"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--burgundy)]/95 via-[var(--burgundy)]/80 to-transparent" />
      </div>

      <div className="relative z-10 text-[var(--charcoal)] px-5 sm:px-6 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block bg-[var(--gold)] text-[var(--burgundy)] px-4 sm:px-5 py-2 sm:py-2.5 mb-6 sm:mb-8 rounded-md font-medium tracking-wider text-xs uppercase" style={{ fontFamily: 'var(--font-inter)' }}>
            Signature Experience
          </div>
          <h2 className="text-[var(--cream)] mb-4 sm:mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
            Promos & Packages
          </h2>
          <p className="text-[var(--cream)]/80 mb-8 sm:mb-10 leading-relaxed text-base sm:text-lg md:text-xl font-light" style={{ fontFamily: 'var(--font-inter)' }}>
            Explore classic Rajasthan with its imperial forts, grand havelis, vibrant bazaars, and private cultural
            workshops. An unforgettable 10-day journey through India's most iconic destinations.
          </p>
          <button 
            className="btn-primary flex items-center gap-2 w-full sm:w-auto justify-center"
            onClick={() => scrollToSection('packages')}
          >
            View Tour Details
            <ArrowRight size={20} />
          </button>
        </motion.div>
      </div>
    </section>
  )
}
