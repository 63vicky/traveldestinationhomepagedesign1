"use client"

import { useEffect, useState } from "react"
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
    <section className="py-24 bg-[var(--burgundy)]">
      <div className="container-custom">
        <div className="text-center mb-20">
          <h2 className="mb-6 text-[var(--cream)] text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
            What Our Travelers Say
          </h2>
          <p className="text-[var(--text-light)] max-w-2xl mx-auto text-lg sm:text-xl leading-relaxed font-light" style={{ fontFamily: 'var(--font-inter)' }}>
            Real stories from travelers who've experienced the magic of India's Golden Triangle
          </p>
        </div>

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
