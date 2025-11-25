"use client"

import { useEffect, useState } from "react"
import { Plus, Edit2, Trash2, Loader, Star } from "lucide-react"
import AdminLayout from "@/components/admin-layout"
import TourForm from "@/components/admin/tour-form"

interface Tour {
  _id: string
  title: string
  slug: string
  price: number
  currency: string
  duration: number
  featured: boolean
  isActive: boolean
  destination?: {
    _id: string
    title: string
  }
}

export default function ToursPage() {
  const [tours, setTours] = useState<Tour[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingTour, setEditingTour] = useState<Tour | null>(null)

  useEffect(() => {
    fetchTours()
  }, [])

  const fetchTours = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/tours")
      const data = await response.json()
      setTours(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error("Failed to fetch tours:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this tour?")) return

    try {
      await fetch(`/api/tours/${id}`, { method: "DELETE" })
      setTours(tours.filter((t) => t._id !== id))
    } catch (error) {
      console.error("Failed to delete tour:", error)
    }
  }

  const toggleFeatured = async (tour: Tour) => {
    try {
      const response = await fetch(`/api/tours/${tour._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ featured: !tour.featured }),
      })
      if (response.ok) {
        setTours(tours.map((t) => (t._id === tour._id ? { ...t, featured: !t.featured } : t)))
      }
    } catch (error) {
      console.error("Failed to update tour:", error)
    }
  }

  const handleFormClose = () => {
    setShowForm(false)
    setEditingTour(null)
  }

  const handleFormSubmit = () => {
    fetchTours()
    handleFormClose()
  }

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Tours</h1>
          <button
            onClick={() => {
              setEditingTour(null)
              setShowForm(!showForm)
            }}
            className="px-4 py-2 bg-[var(--gold)] text-[var(--charcoal)] rounded font-medium flex items-center gap-2 hover:bg-[var(--gold-accent)] transition"
          >
            <Plus size={20} /> Add Tour
          </button>
        </div>

        {showForm && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">{editingTour ? "Edit Tour" : "Add New Tour"}</h2>
            <TourForm tour={editingTour} onSubmit={handleFormSubmit} onCancel={handleFormClose} />
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader className="animate-spin text-gray-600" size={32} />
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {tours.length === 0 ? (
              <div className="p-8 text-center text-gray-500">No tours yet. Create your first one!</div>
            ) : (
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Title</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Destination</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Duration</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Price</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Featured</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Status</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tours.map((tour) => (
                    <tr key={tour._id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-6 font-medium text-gray-900">{tour.title}</td>
                      <td className="py-4 px-6 text-gray-500">{tour.destination?.title || "—"}</td>
                      <td className="py-4 px-6 text-gray-700">{tour.duration} days</td>
                      <td className="py-4 px-6 font-semibold text-[var(--burgundy)]">
                        {tour.currency} {tour.price.toLocaleString()}
                      </td>
                      <td className="py-4 px-6">
                        <button
                          onClick={() => toggleFeatured(tour)}
                          className={`flex items-center gap-1 px-3 py-1 rounded text-sm font-medium ${
                            tour.featured ? "bg-yellow-100 text-yellow-800" : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          <Star size={14} className={tour.featured ? "fill-yellow-500" : ""} />
                          {tour.featured ? "Featured" : "Regular"}
                        </button>
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`px-3 py-1 rounded text-sm font-medium ${
                            tour.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {tour.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setEditingTour(tour)
                              setShowForm(true)
                            }}
                            className="text-blue-600 hover:text-blue-800 p-1"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(tour._id)}
                            className="text-red-600 hover:text-red-800 p-1"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
