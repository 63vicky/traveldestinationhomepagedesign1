"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { ArrowLeft, MapPin, Calendar } from "lucide-react"
import Link from "next/link"
import BookingForm from "@/components/booking-form"

interface Destination {
  _id: string
  title: string
  tagline: string
  price: string
  description?: string
  image: string
  category?: string
  duration?: number
  highlights?: string[]
}

export default function DestinationPage() {
  const params = useParams()
  const [destination, setDestination] = useState<Destination | null>(null)
  const [loading, setLoading] = useState(true)
  const [showBookingForm, setShowBookingForm] = useState(false)

  useEffect(() => {
    const fetchDestination = async () => {
      try {
        const response = await fetch(`/api/destinations/${params.id}`)
        const data = await response.json()
        setDestination(data)
      } catch (error) {
        console.error("Failed to fetch destination:", error)
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchDestination()
    }
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  if (!destination) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Destination not found</h1>
        <Link href="/" className="text-[var(--gold-accent)] hover:underline">
          Back to homepage
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container-custom py-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[var(--gold-accent)] hover:text-[var(--gold-accent)]/80 mb-8"
        >
          <ArrowLeft size={20} /> Back to Destinations
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <img
                src={destination.image || "/placeholder.svg"}
                alt={destination.title}
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>

            <h1 className="text-4xl font-bold mb-4">{destination.title}</h1>
            <p className="text-xl text-[var(--text-light)] mb-6">{destination.tagline}</p>

            <div className="flex flex-wrap gap-6 mb-8 pb-8 border-b">
              {destination.duration && (
                <div className="flex items-center gap-3">
                  <Calendar size={24} className="text-[var(--gold-accent)]" />
                  <div>
                    <p className="text-sm text-[var(--text-light)]">Duration</p>
                    <p className="font-semibold">{destination.duration} Days</p>
                  </div>
                </div>
              )}
              {destination.category && (
                <div className="flex items-center gap-3">
                  <MapPin size={24} className="text-[var(--gold-accent)]" />
                  <div>
                    <p className="text-sm text-[var(--text-light)]">Category</p>
                    <p className="font-semibold capitalize">{destination.category}</p>
                  </div>
                </div>
              )}
            </div>

            {destination.description && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4">About This Trip</h2>
                <p className="text-[var(--text-light)] leading-relaxed mb-6">{destination.description}</p>
              </div>
            )}

            {destination.highlights && destination.highlights.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Highlights</h2>
                <ul className="grid grid-cols-2 gap-4">
                  {destination.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-[var(--gold-accent)] mt-1">✓</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 bg-[var(--cream)] rounded-lg p-8">
              <p className="text-sm text-[var(--text-light)] mb-2">Starting from</p>
              <p className="text-3xl font-bold text-[var(--gold-accent)] mb-6">{destination.price}</p>

              {!showBookingForm ? (
                <button onClick={() => setShowBookingForm(true)} className="btn-primary w-full mb-4">
                  Book Now
                </button>
              ) : (
                <BookingForm
                  destinationId={destination._id}
                  destinationPrice={destination.price}
                  onClose={() => setShowBookingForm(false)}
                />
              )}

              <div className="mt-6 pt-6 border-t border-[var(--border-light)]">
                <h3 className="font-semibold mb-4">What's Included</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="text-[var(--gold-accent)]">✓</span> Accommodation
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[var(--gold-accent)]">✓</span> Meals
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[var(--gold-accent)]">✓</span> Expert Guide
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[var(--gold-accent)]">✓</span> Activities
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
