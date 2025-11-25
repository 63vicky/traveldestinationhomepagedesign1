"use client"

import { useEffect, useState } from "react"
import { DestinationCard } from "./destination-card"
import { Carousel } from "./carousel"

interface Tour {
  _id: string
  title: string
  tagline: string
  price: number
  currency: string
  image: string
}

export function MoreTours() {
  const [tours, setTours] = useState<Tour[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await fetch("/api/tours")
        const data = await response.json()
        setTours(data)
      } catch (error) {
        console.error("Error fetching tours:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTours()
  }, [])

  const useCarousel = tours.length > 3

  return (
    <section className="py-24 bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="mb-4 text-[var(--burgundy)]">More Extraordinary Tours</h2>
        </div>

        {loading ? (
          <div className="text-center text-[var(--text-light)]">Loading tours...</div>
        ) : useCarousel ? (
          <Carousel
            items={tours}
            renderItem={(tour) => (
              <div className="px-4">
                <DestinationCard
                  title={tour.title}
                  tagline={tour.tagline}
                  price={`${tour.currency} ${tour.price}`}
                  image={tour.image}
                  id={tour._id}
                />
              </div>
            )}
            autoplay={true}
            autoplayInterval={4000}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tours.map((tour) => (
              <DestinationCard
                key={tour._id}
                title={tour.title}
                tagline={tour.tagline}
                price={`${tour.currency} ${tour.price}`}
                image={tour.image}
                id={tour._id}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
