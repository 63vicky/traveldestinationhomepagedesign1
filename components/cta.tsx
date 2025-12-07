"use client"

import { motion } from "framer-motion"

export function CTA() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="contact" className="relative py-20 sm:py-24 md:py-32 bg-[var(--charcoal)]">
      <div className="container-custom text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-[var(--cream)] mb-6 sm:mb-8 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
            Start Your Adventure Today
          </h2>
          <p className="text-white/90 mb-8 sm:mb-10 text-base sm:text-lg md:text-xl leading-relaxed font-light px-4 sm:px-0" style={{ fontFamily: 'var(--font-inter)' }}>
            Let our travel advisors craft the perfect journey tailored to your dreams.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center items-center px-4 sm:px-0">
            <button 
              className="btn-primary w-full sm:w-auto"
              onClick={() => scrollToSection('contact')}
            >
              Contact Our Travel Advisor
            </button>
            <button 
              className="btn-secondary border-[var(--cream)] text-[var(--cream)] hover:bg-[var(--cream)] hover:text-[var(--charcoal)] w-full sm:w-auto"
              onClick={() => scrollToSection('destinations')}
            >
              Browse All Destinations
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
