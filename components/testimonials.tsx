"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { TestimonialCard } from "./testimonial-card"
import { Carousel } from "./carousel"

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

  const useCarousel = testimonials.length > 3

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-[var(--burgundy)]">
      <div className="container-custom">
        <motion.div 
          className="text-center mb-12 sm:mb-16 md:mb-20"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h2 className="mb-4 sm:mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-[var(--cream)]" style={{ fontFamily: 'var(--font-playfair)' }}>
            What Our Travelers Say
          </h2>
          <p className="text-[var(--text-light)] max-w-2xl mx-auto text-base sm:text-lg md:text-xl leading-relaxed font-light px-4 sm:px-0" style={{ fontFamily: 'var(--font-inter)' }}>
            Real stories from travelers who've experienced the magic of India's Golden Triangle
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center text-[var(--text-light)]">Loading testimonials...</div>
        ) : useCarousel ? (
          <Carousel
            items={testimonials}
            renderItem={(testimonial) => (
              <div className="px-4">
                <TestimonialCard {...testimonial} />
              </div>
            )}
            autoplay={true}
            autoplayInterval={5000}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial._id} {...testimonial} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
