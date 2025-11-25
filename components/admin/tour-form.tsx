"use client"

import type React from "react"
import { useState, useEffect } from "react"

interface Destination {
  _id: string
  title: string
}

interface Tour {
  _id?: string
  title: string
  slug: string
  tagline: string
  description: string
  price: number
  currency: string
  image: string
  destination: string
  duration: number
  highlights: string[]
  featured: boolean
  isActive: boolean
}

interface TourFormProps {
  tour?: Tour | null
  onSubmit: () => void
  onCancel: () => void
}

export default function TourForm({ tour, onSubmit, onCancel }: TourFormProps) {
  const [formData, setFormData] = useState<Tour>({
    title: "",
    slug: "",
    tagline: "",
    description: "",
    price: 0,
    currency: "USD",
    image: "",
    destination: "",
    duration: 1,
    highlights: [],
    featured: false,
    isActive: true,
  })
  const [destinations, setDestinations] = useState<Destination[]>([])
  const [highlightsInput, setHighlightsInput] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchDestinations()
  }, [])

  useEffect(() => {
    if (tour) {
      setFormData({
        ...tour,
        destination: typeof tour.destination === "object" ? (tour.destination as any)._id : tour.destination,
      })
      setHighlightsInput(tour.highlights?.join(", ") || "")
    }
  }, [tour])

  const fetchDestinations = async () => {
    try {
      const response = await fetch("/api/destinations")
      const data = await response.json()
      setDestinations(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error("Failed to fetch destinations:", error)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    })
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value
    setFormData({
      ...formData,
      title,
      slug: tour?._id ? formData.slug : generateSlug(title),
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const dataToSend = {
        ...formData,
        price: Number(formData.price),
        duration: Number(formData.duration),
        highlights: highlightsInput
          .split(",")
          .map((h) => h.trim())
          .filter(Boolean),
      }

      const url = tour?._id ? `/api/tours/${tour._id}` : "/api/tours"
      const method = tour?._id ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      })

      if (response.ok) {
        onSubmit()
      }
    } catch (error) {
      console.error("Failed to save tour:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleTitleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--gold)] focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">Slug</label>
          <input
            type="text"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--gold)] focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">Destination</label>
          <select
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--gold)] focus:border-transparent"
          >
            <option value="">Select destination (optional)</option>
            {destinations.map((dest) => (
              <option key={dest._id} value={dest._id}>
                {dest.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">Tagline</label>
          <input
            type="text"
            name="tagline"
            value={formData.tagline}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--gold)] focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            min="0"
            className="w-full px-4 py-2 border border-gray-300 rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--gold)] focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">Currency</label>
          <select
            name="currency"
            value={formData.currency}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--gold)] focus:border-transparent"
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="AUD">AUD</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">Duration (days)</label>
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            required
            min="1"
            className="w-full px-4 py-2 border border-gray-300 rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--gold)] focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">Image URL</label>
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--gold)] focus:border-transparent"
            placeholder="https://example.com/image.jpg"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--gold)] focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">Highlights (comma-separated)</label>
        <textarea
          value={highlightsInput}
          onChange={(e) => setHighlightsInput(e.target.value)}
          rows={2}
          className="w-full px-4 py-2 border border-gray-300 rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--gold)] focus:border-transparent"
          placeholder="e.g., Guided tours, Local cuisine, Photography spots"
        />
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center">
          <input
            type="checkbox"
            name="featured"
            id="featured"
            checked={formData.featured}
            onChange={handleChange}
            className="w-4 h-4"
          />
          <label htmlFor="featured" className="ml-2 text-sm font-medium text-gray-900">
            Featured Tour
          </label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            name="isActive"
            id="isActive"
            checked={formData.isActive}
            onChange={handleChange}
            className="w-4 h-4"
          />
          <label htmlFor="isActive" className="ml-2 text-sm font-medium text-gray-900">
            Active
          </label>
        </div>
      </div>

      <div className="flex gap-4 pt-6">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-[var(--gold)] text-[var(--charcoal)] rounded font-medium hover:bg-[var(--gold-accent)] transition disabled:opacity-50"
        >
          {loading ? "Saving..." : tour?._id ? "Update" : "Create"} Tour
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded font-medium hover:bg-gray-50 transition"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
