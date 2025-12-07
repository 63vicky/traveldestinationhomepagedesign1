"use client"

import { useEffect, useState } from "react"
import { DestinationCard } from "./destination-card"
import { Carousel } from "./carousel"

interface Destination {
  _id: string
  title: string
  tagline: string
  price: string
  image: string
}

export function MoreTours() {
  const [destinations, setDestinations] = useState<Destination[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await fetch("/api/destinations")
        const data = await response.json()
        setDestinations(data)
      } catch (error) {
        console.error("Error fetching destinations:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchDestinations()
  }, [])

  if (loading) {
    return (
      <section className="py-24 bg-[var(--cream)]">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="mb-4 text-[var(--burgundy)] text-3xl sm:text-4xl md:text-5xl">
              More Extraordinary Tours
            </h2>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto text-base sm:text-lg">
              Discover more curated journeys through India's most captivating destinations
            </p>
          </div>
          <div className="text-center text-[var(--text-muted)]">Loading destinations...</div>
        </div>
      </section>
    )
  }

  if (destinations.length === 0) {
    return (
      <section className="py-24 bg-[var(--cream)]">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="mb-4 text-[var(--burgundy)] text-3xl sm:text-4xl md:text-5xl">
              More Extraordinary Tours
            </h2>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto text-base sm:text-lg">
              Discover more curated journeys through India's most captivating destinations
            </p>
          </div>
          <div className="text-center text-[var(--text-muted)]">No destinations available</div>
        </div>
      </section>
    )
  }

  return (
    <section id="packages" className="py-16 sm:py-20 md:py-24 bg-[var(--cream)]">
      <div className="container-custom">
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <h2 className="mb-4 sm:mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-[var(--burgundy)]" style={{ fontFamily: 'var(--font-playfair)' }}>
            More Extraordinary Tours
          </h2>
          <p className="text-[var(--text-muted)] max-w-2xl mx-auto text-base sm:text-lg md:text-xl leading-relaxed font-light px-4 sm:px-0" style={{ fontFamily: 'var(--font-inter)' }}>
            Discover more curated journeys through India's most captivating destinations
          </p>
        </div>

        <Carousel
          items={destinations}
          renderItem={(destination) => (
            <DestinationCard
              title={destination.title}
              tagline={destination.tagline}
              price={destination.price}
              image={destination.image}
              id={destination._id}
            />
          )}
          autoplay={true}
          autoplayInterval={4000}
          itemsPerView={{ mobile: 1, tablet: 2, desktop: 3 }}
        />
      </div>
    </section>
  )
}
