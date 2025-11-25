"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Star } from "lucide-react"

interface Testimonial {
  _id?: string
  quote: string
  name: string
  location: string
  image: string
  rating: number
  featured: boolean
}

interface TestimonialFormProps {
  testimonial?: Testimonial | null
  onSubmit: () => void
  onCancel: () => void
}

export default function TestimonialForm({ testimonial, onSubmit, onCancel }: TestimonialFormProps) {
  const [formData, setFormData] = useState<Testimonial>({
    quote: "",
    name: "",
    location: "",
    image: "",
    rating: 5,
    featured: false,
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (testimonial) {
      setFormData(testimonial)
    }
  }, [testimonial])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const dataToSend = {
        ...formData,
        rating: Number(formData.rating),
      }

      const url = testimonial?._id ? `/api/testimonials/${testimonial._id}` : "/api/testimonials"
      const method = testimonial?._id ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      })

      if (response.ok) {
        onSubmit()
      }
    } catch (error) {
      console.error("Failed to save testimonial:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--gold)] focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--gold)] focus:border-transparent"
            placeholder="e.g., New York, USA"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">Image URL</label>
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--gold)] focus:border-transparent"
            placeholder="https://example.com/avatar.jpg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">Rating</label>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setFormData({ ...formData, rating: star })}
                className="p-1"
              >
                <Star
                  size={24}
                  className={`${
                    star <= formData.rating ? "fill-[var(--gold)] text-[var(--gold)]" : "text-gray-300"
                  } transition-colors`}
                />
              </button>
            ))}
            <span className="ml-2 text-sm text-gray-500">
              {formData.rating} star{formData.rating !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">Quote / Testimonial</label>
        <textarea
          name="quote"
          value={formData.quote}
          onChange={handleChange}
          required
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--gold)] focus:border-transparent"
          placeholder="What did the customer say about their experience?"
        />
      </div>

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
          Featured Testimonial
        </label>
      </div>

      <div className="flex gap-4 pt-6">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-[var(--gold)] text-[var(--charcoal)] rounded font-medium hover:bg-[var(--gold-accent)] transition disabled:opacity-50"
        >
          {loading ? "Saving..." : testimonial?._id ? "Update" : "Add"} Testimonial
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
