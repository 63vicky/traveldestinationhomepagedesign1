"use client"

import { MultiStepBookingForm } from "@/components/multi-step-booking-form"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"

export default function BookingPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-[var(--cream)] py-8 px-4">
      {/* Header with back button */}
      <div className="container-custom max-w-4xl mx-auto mb-8">
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-2 text-[var(--burgundy)] hover:text-[var(--gold-accent)] transition-colors mb-6"
        >
          <ArrowLeft size={20} />
          <span className="text-sm font-medium">Back to Home</span>
        </button>
        
        <div className="text-center mb-8">
          <h1
            className="text-4xl md:text-5xl text-[var(--burgundy)] mb-3"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Plan Your Journey
          </h1>
          <p className="text-[var(--text-light)] text-lg">
            Tell us about your dream destination and we'll create the perfect itinerary
          </p>
        </div>
      </div>

      {/* Booking Form */}
      <div className="container-custom max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12">
        <MultiStepBookingForm onClose={() => router.push("/")} />
      </div>
    </div>
  )
}
