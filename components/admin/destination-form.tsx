"use client"

import type React from "react"

import { useState, useEffect } from "react"

interface Destination {
  _id?: string
  title: string
  tagline: string
  price: string
  description: string
  image: string
  category: "luxury" | "adventure" | "cultural" | "beach" | "mountain"
  duration: number
  highlights: string[]
  isActive: boolean
}

interface DestinationFormProps {
  destination?: Destination | null
  onSubmit: () => void
  onCancel: () => void
}

export default function DestinationForm({ destination, onSubmit, onCancel }: DestinationFormProps) {
  const [formData, setFormData] = useState<Destination>({
    title: "",
    tagline: "",
    price: "",
    description: "",
    image: "",
    category: "luxury",
    duration: 0,
    highlights: [],
    isActive: true,
  })

  const [loading, setLoading] = useState(false)
  const [highlightsInput, setHighlightsInput] = useState("")

  useEffect(() => {
    if (destination) {
      setFormData(destination)
      setHighlightsInput(destination.highlights.join(", "))
    }
  }, [destination])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
        highlights: highlightsInput.split(",").map((h) => h.trim()),
        duration: Number.parseInt(formData.duration.toString()),
      }

      const url = destination?._id ? `/api/destinations/${destination._id}` : "/api/destinations"

      const method = destination?._id ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      })

      if (response.ok) {
        onSubmit()
      }
    } catch (error) {
      console.error("Failed to save destination:", error)
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
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--gold)] focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--gold)] focus:border-transparent"
          >
            <option value="luxury">Luxury</option>
            <option value="adventure">Adventure</option>
            <option value="cultural">Cultural</option>
            <option value="beach">Beach</option>
            <option value="mountain">Mountain</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">Tagline</label>
          <input
            type="text"
            name="tagline"
            value={formData.tagline}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--gold)] focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">Price</label>
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--gold)] focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">Duration (days)</label>
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            required
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
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--gold)] focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">Highlights (comma-separated)</label>
        <textarea
          value={highlightsInput}
          onChange={(e) => setHighlightsInput(e.target.value)}
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--gold)] focus:border-transparent"
          placeholder="e.g., Swimming, Hiking, Local Cuisine"
        />
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

      <div className="flex gap-4 pt-6">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-[var(--gold)] text-[var(--charcoal)] rounded font-medium hover:bg-[var(--gold-accent)] transition disabled:opacity-50"
        >
          {loading ? "Saving..." : destination?._id ? "Update" : "Create"} Destination
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
