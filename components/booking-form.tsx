"use client"

import type React from "react"

import { useState } from "react"
import { Loader } from "lucide-react"

interface BookingFormProps {
  destinationId: string
  destinationPrice?: string
  onClose: () => void
}

export default function BookingForm({ destinationId, destinationPrice, onClose }: BookingFormProps) {
  const [formData, setFormData] = useState({
    guestName: "",
    guestEmail: "",
    guestPhone: "",
    startDate: "",
    endDate: "",
    numberOfGuests: 1,
    specialRequests: "",
  })

  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: name === "numberOfGuests" ? Number.parseInt(value) : value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Extract price amount from string like "$3,999" or use 0 as fallback
      const priceAmount = destinationPrice 
        ? Number.parseFloat(destinationPrice.replace(/[$,]/g, "")) || 0
        : 0

      const bookingData = {
        destinationId,
        ...formData,
        totalPrice: priceAmount * formData.numberOfGuests,
        status: "pending",
      }

      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      })

      if (response.ok) {
        setSubmitted(true)
      } else {
        console.error("Booking failed")
      }
    } catch (error) {
      console.error("Failed to create booking:", error)
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-8">
        <p className="text-lg font-semibold text-green-600 mb-4">Booking submitted successfully!</p>
        <p className="text-sm text-[var(--text-light)] mb-4">We'll contact you soon at {formData.guestEmail}</p>
        <button
          onClick={onClose}
          className="px-4 py-2 border border-[var(--border-light)] rounded hover:bg-[var(--cream)] transition"
        >
          Close
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Full Name</label>
        <input
          type="text"
          name="guestName"
          value={formData.guestName}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-[var(--border-light)] rounded text-sm focus:outline-none focus:border-[var(--gold-accent)]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Email</label>
        <input
          type="email"
          name="guestEmail"
          value={formData.guestEmail}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-[var(--border-light)] rounded text-sm focus:outline-none focus:border-[var(--gold-accent)]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Phone</label>
        <input
          type="tel"
          name="guestPhone"
          value={formData.guestPhone}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-[var(--border-light)] rounded text-sm focus:outline-none focus:border-[var(--gold-accent)]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Start Date</label>
        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-[var(--border-light)] rounded text-sm focus:outline-none focus:border-[var(--gold-accent)]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">End Date</label>
        <input
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-[var(--border-light)] rounded text-sm focus:outline-none focus:border-[var(--gold-accent)]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Number of Guests</label>
        <input
          type="number"
          name="numberOfGuests"
          value={formData.numberOfGuests}
          onChange={handleChange}
          min="1"
          required
          className="w-full px-3 py-2 border border-[var(--border-light)] rounded text-sm focus:outline-none focus:border-[var(--gold-accent)]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Special Requests (Optional)</label>
        <textarea
          name="specialRequests"
          value={formData.specialRequests}
          onChange={handleChange}
          rows={3}
          className="w-full px-3 py-2 border border-[var(--border-light)] rounded text-sm focus:outline-none focus:border-[var(--gold-accent)]"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {loading && <Loader size={16} className="animate-spin" />}
        {loading ? "Booking..." : "Confirm Booking"}
      </button>
    </form>
  )
}
