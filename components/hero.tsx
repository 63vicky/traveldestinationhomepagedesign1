"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

export function Hero() {
  const router = useRouter();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      id="home"
      className="relative h-screen flex items-center justify-center pt-20 overflow-hidden"
    >
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1564507592333-c60657eea523?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
          alt="Golden Triangle"
          className="w-full h-full object-cover hero-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--burgundy)]/40 via-[var(--burgundy)]/60 to-[var(--burgundy)]/80" />
      </div>

      <div className="relative z-10 text-center text-[var(--cream)] px-5 sm:px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="mb-6 sm:mb-8 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight text-white leading-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
            The Golden Triangle
          </h1>
          <p className="text-white/90 mb-8 sm:mb-10 max-w-3xl mx-auto text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed font-light px-2 sm:px-0" style={{ fontFamily: 'var(--font-inter)' }}>
            Step into the timeless rhythm of India's Golden Triangle, where
            history breathes through sandstone, silk and every street. Walk
            through vibrant streets alive with colour, spices and handcrafted
            treasures.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center items-center px-4 sm:px-0">
            <button 
              className="btn-primary w-full sm:w-auto"
              onClick={() => router.push('/booking')}
            >
              Plan Your Journey
            </button>
            <button 
              className="btn-secondary w-full sm:w-auto"
              onClick={() => scrollToSection('destinations')}
            >
              Learn More
            </button>
          </div>
        </motion.div>
      </div>

      <div className="absolute hidden sm:block bottom-8 left-1/2 transform -translate-x-1/2">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          className="w-6 h-10 border-2 border-[var(--cream)]/50 rounded-full flex items-start justify-center p-2 cursor-pointer"
          onClick={() => scrollToSection('destinations')}
        >
          <ChevronDown className="w-4 h-4 text-[var(--cream)]/50" />
        </motion.div>
      </div>
    </section>
  );
}
