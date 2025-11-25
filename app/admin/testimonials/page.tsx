"use client"

import { useEffect, useState } from "react"
import { Plus, Edit2, Trash2, Loader, Star } from "lucide-react"
import AdminLayout from "@/components/admin-layout"
import TestimonialForm from "@/components/admin/testimonial-form"

interface Testimonial {
  _id: string
  quote: string
  name: string
  location: string
  rating: number
  featured: boolean
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null)

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/testimonials")
      const data = await response.json()
      setTestimonials(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error("Failed to fetch testimonials:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return

    try {
      await fetch(`/api/testimonials/${id}`, { method: "DELETE" })
      setTestimonials(testimonials.filter((t) => t._id !== id))
    } catch (error) {
      console.error("Failed to delete testimonial:", error)
    }
  }

  const toggleFeatured = async (id: string, featured: boolean) => {
    try {
      const response = await fetch(`/api/testimonials/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ featured: !featured }),
      })
      if (response.ok) {
        setTestimonials(testimonials.map((t) => (t._id === id ? { ...t, featured: !featured } : t)))
      }
    } catch (error) {
      console.error("Failed to update testimonial:", error)
    }
  }

  const handleFormClose = () => {
    setShowForm(false)
    setEditingTestimonial(null)
  }

  const handleFormSubmit = () => {
    fetchTestimonials()
    handleFormClose()
  }

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Testimonials</h1>
          <button
            onClick={() => {
              setEditingTestimonial(null)
              setShowForm(!showForm)
            }}
            className="px-4 py-2 bg-[var(--gold)] text-[var(--charcoal)] rounded font-medium flex items-center gap-2 hover:bg-[var(--gold-accent)] transition"
          >
            <Plus size={20} /> Add Testimonial
          </button>
        </div>

        {showForm && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              {editingTestimonial ? "Edit Testimonial" : "Add New Testimonial"}
            </h2>
            <TestimonialForm testimonial={editingTestimonial} onSubmit={handleFormSubmit} onCancel={handleFormClose} />
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader className="animate-spin text-gray-600" size={32} />
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {testimonials.length === 0 ? (
              <div className="p-8 text-center text-gray-500">No testimonials yet. Add your first one!</div>
            ) : (
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Name</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Location</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Rating</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Featured</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {testimonials.map((testimonial) => (
                    <tr key={testimonial._id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-6 font-medium text-gray-900">{testimonial.name}</td>
                      <td className="py-4 px-6 text-gray-500">{testimonial.location || "—"}</td>
                      <td className="py-4 px-6">
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              className={`${
                                i < testimonial.rating ? "fill-[var(--gold)] text-[var(--gold)]" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <button
                          onClick={() => toggleFeatured(testimonial._id, testimonial.featured)}
                          className={`px-3 py-1 rounded text-sm font-medium ${
                            testimonial.featured ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {testimonial.featured ? "Featured" : "Not Featured"}
                        </button>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setEditingTestimonial(testimonial)
                              setShowForm(true)
                            }}
                            className="text-blue-600 hover:text-blue-800 p-1"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(testimonial._id)}
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
