"use client"

import { useEffect, useState } from "react"
import { Plus, Edit2, Trash2, Loader } from "lucide-react"
import AdminLayout from "@/components/admin-layout"
import DestinationForm from "@/components/admin/destination-form"

interface Destination {
  _id: string
  title: string
  price: string
  category: string
  duration: number
  isActive: boolean
}

export default function DestinationsPage() {
  const [destinations, setDestinations] = useState<Destination[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [selectedDest, setSelectedDest] = useState<Destination | null>(null)

  useEffect(() => {
    fetchDestinations()
  }, [])

  const fetchDestinations = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/destinations")
      const data = await response.json()
      setDestinations(data)
    } catch (error) {
      console.error("Failed to fetch destinations:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this destination?")) return

    try {
      await fetch(`/api/destinations/${id}`, { method: "DELETE" })
      setDestinations(destinations.filter((d) => d._id !== id))
    } catch (error) {
      console.error("Failed to delete destination:", error)
    }
  }

  const handleFormClose = () => {
    setShowForm(false)
    setEditingId(null)
    setSelectedDest(null)
  }

  const handleFormSubmit = () => {
    fetchDestinations()
    handleFormClose()
  }

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Destinations</h1>
          <button
            onClick={() => {
              setEditingId(null)
              setSelectedDest(null)
              setShowForm(!showForm)
            }}
            className="px-4 py-2 bg-[var(--gold)] text-[var(--charcoal)] rounded font-medium flex items-center gap-2 hover:bg-[var(--gold-accent)] transition"
          >
            <Plus size={20} /> Add Destination
          </button>
        </div>

        {showForm && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              {editingId ? "Edit Destination" : "Add New Destination"}
            </h2>
            <DestinationForm destination={selectedDest} onSubmit={handleFormSubmit} onCancel={handleFormClose} />
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader className="animate-spin text-gray-600" size={32} />
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Title</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Category</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Price</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Duration</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Status</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {destinations.map((dest) => (
                  <tr key={dest._id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-6 font-medium text-gray-900">{dest.title}</td>
                    <td className="py-4 px-6 capitalize text-gray-700">{dest.category}</td>
                    <td className="py-4 px-6 text-gray-700">{dest.price}</td>
                    <td className="py-4 px-6 text-gray-700">{dest.duration} days</td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-3 py-1 rounded text-sm font-medium ${
                          dest.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {dest.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="py-4 px-6 space-x-2">
                      <button
                        onClick={() => {
                          setSelectedDest(dest)
                          setEditingId(dest._id)
                          setShowForm(true)
                        }}
                        className="text-[var(--gold-accent)] hover:text-[var(--gold)] p-1"
                      >
                        <Edit2 size={18} className="inline" />
                      </button>
                      <button onClick={() => handleDelete(dest._id)} className="text-red-600 hover:text-red-800 p-1">
                        <Trash2 size={18} className="inline" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
