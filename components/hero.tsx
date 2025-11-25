"use client"

import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"

export function Hero() {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center pt-20">
      <div className="absolute inset-0">
        <div className="grid grid-cols-2 h-full">
          <img
            src="https://images.unsplash.com/photo-1608848461950-0fed8e1681a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600"
            alt="Monument 1"
            className="w-full h-full object-cover"
          />
          <img
            src="https://images.unsplash.com/photo-1564507592333-c60657eea523?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600"
            alt="Monument 2"
            className="w-full h-full object-cover"
          />
          <img
            src="https://images.unsplash.com/photo-1599722173432-b55f3cb1d3ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600"
            alt="Monument 3"
            className="w-full h-full object-cover"
          />
          <img
            src="https://images.unsplash.com/photo-1537799943-22f77e59d978?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600"
            alt="Monument 4"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/60 to-[var(--burgundy)]/80" />
      </div>

      <div className="relative z-10 text-center text-[var(--cream)] px-6 max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="mb-6 text-5xl md:text-6xl font-light tracking-wider">THE GOLDEN TRIANGLE</h1>
          <p className="text-[var(--text-light)] mb-8 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed">
            Step into the timeless rhythm of India's Golden Triangle, where history breathes through sandstone, silk and
            every street. Walk through vibrant streets alive with colour, spices and handcrafted treasures.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary">Start Your Journey</button>
            <button className="btn-secondary">Learn More</button>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          className="w-6 h-10 border-2 border-[var(--cream)]/50 rounded-full flex items-start justify-center p-2"
        >
          <ChevronDown className="w-4 h-4 text-[var(--cream)]/50" />
        </motion.div>
      </div>
    </section>
  )
}
