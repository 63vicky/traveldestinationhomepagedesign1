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
    <section id="contact" className="relative py-20 sm:py-24 md:py-32 bg-[var(--cream)]">
      <div className="container-custom text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-[var(--burgundy)] mb-6 sm:mb-8 text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-normal tracking-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
            Start Your <span className="text-[var(--gold)] italic">Adventure</span> Today
          </h2>
          <p className="text-[var(--charcoal-light)] mb-10 sm:mb-12 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed font-light px-2 sm:px-0 max-w-2xl mx-auto" style={{ fontFamily: 'var(--font-inter)' }}>
            Let our travel advisors craft the perfect journey tailored to your dreams and desires.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center items-center px-4 sm:px-0">
            <button 
              className="btn-primary w-full sm:w-auto"
              onClick={() => scrollToSection('contact')}
            >
              Contact Advisor
            </button>
            <button 
              className="btn-secondary border-[var(--burgundy)] text-[var(--burgundy)] hover:bg-[var(--burgundy)] hover:text-[var(--cream)] w-full sm:w-auto"
              onClick={() => scrollToSection('destinations')}
            >
              Browse All
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
