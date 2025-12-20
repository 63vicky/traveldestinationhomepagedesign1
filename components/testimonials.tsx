"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Marquee3D } from "./ui/marquee-3d"
import { TestimonialCard } from "./testimonial-card"

interface Testimonial {
  _id: string
  quote: string
  name: string
  location: string
  image: string
  rating: number
}

export function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch("/api/testimonials")
        const data = await response.json()
        setTestimonials(data)
      } catch (error) {
        console.error("Error fetching testimonials:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTestimonials()
  }, [])

  return (
    <section className="py-24 sm:py-32 md:py-40 bg-[var(--cream)] overflow-hidden">
      <div className="container-custom relative z-10">
        <motion.div 
          className="text-center mb-16 sm:mb-24"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="mb-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight text-[var(--burgundy)]" style={{ fontFamily: 'var(--font-playfair)' }}>
            What Our Travelers Say
          </h2>
          <p className="text-[var(--charcoal-light)] max-w-2xl mx-auto text-lg sm:text-xl md:text-2xl leading-relaxed font-light px-4 sm:px-0 opacity-80" style={{ fontFamily: 'var(--font-inter)' }}>
            Real stories from travelers who've experienced the magic of luxury journeys
          </p>
        </motion.div>
      </div>

      <div className="relative">
        {loading ? (
          <div className="text-center text-[var(--charcoal-light)] py-20">Loading testimonials...</div>
        ) : (
          <Marquee3D speed={60} rows={1}>
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial._id} {...testimonial} />
            ))}
          </Marquee3D>
        )}
      </div>
    </section>
  )
}
