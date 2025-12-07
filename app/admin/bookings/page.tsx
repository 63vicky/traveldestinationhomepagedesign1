"use client"

import { useEffect, useState } from "react"
import { Loader, Eye, Trash2, Check, X, Clock } from "lucide-react"
import AdminLayout from "@/components/admin-layout"

interface Booking {
  _id: string
  // Contact Information
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  countryCode: string
  // Trip Details
  destinations: string[]
  travelYear: number
  travelMonth: string
  travelerType: string
  totalTravelers: number
  travelersUnder18: number
  budgetAmount: number
  currency: string
  // Consent
  consentEmail: boolean
  consentSMS: boolean
  consentContact: boolean
  // Referral (optional from thank you page)
  referralSource?: string
  additionalNotes?: string
  // Status
  status: "pending" | "confirmed" | "cancelled"
  createdAt?: string
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/bookings")
      const data = await response.json()
      setBookings(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error("Failed to fetch bookings:", error)
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id: string, status: "pending" | "confirmed" | "cancelled") => {
    try {
      const response = await fetch(`/api/bookings/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })
      if (response.ok) {
        setBookings(bookings.map((b) => (b._id === id ? { ...b, status } : b)))
        if (selectedBooking?._id === id) {
          setSelectedBooking({ ...selectedBooking, status })
        }
      }
    } catch (error) {
      console.error("Failed to update booking:", error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this booking?")) return

    try {
      await fetch(`/api/bookings/${id}`, { method: "DELETE" })
      setBookings(bookings.filter((b) => b._id !== id))
      if (selectedBooking?._id === id) {
        setSelectedBooking(null)
      }
    } catch (error) {
      console.error("Failed to delete booking:", error)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Check size={14} />
      case "cancelled":
        return <X size={14} />
      default:
        return <Clock size={14} />
    }
  }

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Bookings</h1>
          <div className="flex items-center gap-4 text-sm">
            <span className="flex items-center gap-2 text-gray-700">
              <span className="w-3 h-3 rounded-full bg-yellow-400" />
              Pending: {bookings.filter((b) => b.status === "pending").length}
            </span>
            <span className="flex items-center gap-2 text-gray-700">
              <span className="w-3 h-3 rounded-full bg-green-500" />
              Confirmed: {bookings.filter((b) => b.status === "confirmed").length}
            </span>
            <span className="flex items-center gap-2 text-gray-700">
              <span className="w-3 h-3 rounded-full bg-red-500" />
              Cancelled: {bookings.filter((b) => b.status === "cancelled").length}
            </span>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader className="animate-spin text-gray-600" size={32} />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Bookings Table */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {bookings.length === 0 ? (
                <div className="p-8 text-center text-gray-500">No bookings yet</div>
              ) : (
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left py-4 px-6 font-semibold text-gray-900">Guest</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-900">Destination</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-900">Travel Date</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-900">Budget</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-900">Status</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking) => (
                      <tr
                        key={booking._id}
                        className={`border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                          selectedBooking?._id === booking._id ? "bg-blue-50" : ""
                        }`}
                        onClick={() => setSelectedBooking(booking)}
                      >
                        <td className="py-4 px-6">
                          <div>
                            <p className="font-medium text-gray-900">{booking.firstName} {booking.lastName}</p>
                            <p className="text-sm text-gray-500">{booking.email}</p>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-sm">
                          <p className="text-gray-900">{booking.destinations.join(", ")}</p>
                        </td>
                        <td className="py-4 px-6 text-sm">
                          <p className="text-gray-900">{booking.travelMonth} {booking.travelYear}</p>
                        </td>
                        <td className="py-4 px-6 font-semibold text-[var(--burgundy)]">
                          {booking.currency === "USD" ? "$" : booking.currency === "EUR" ? "€" : booking.currency === "GBP" ? "£" : booking.currency === "INR" ? "₹" : booking.currency}
                          {booking.budgetAmount.toLocaleString()}
                        </td>
                        <td className="py-4 px-6">
                          <span
                            className={`inline-flex items-center gap-1 px-3 py-1 rounded text-sm font-medium ${
                              booking.status === "confirmed"
                                ? "bg-green-100 text-green-800"
                                : booking.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                            }`}
                          >
                            {getStatusIcon(booking.status)}
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                setSelectedBooking(booking)
                              }}
                              className="text-blue-600 hover:text-blue-800 p-1"
                            >
                              <Eye size={18} />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleDelete(booking._id)
                              }}
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

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Booking Details</h2>
              {selectedBooking ? (
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Guest Name</p>
                    <p className="font-medium text-gray-900">{selectedBooking.firstName} {selectedBooking.lastName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Email</p>
                    <p className="font-medium text-gray-900">{selectedBooking.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Phone</p>
                    <p className="font-medium text-gray-900">{selectedBooking.countryCode} {selectedBooking.phoneNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Destinations</p>
                    <p className="font-medium text-gray-900">{selectedBooking.destinations.join(", ")}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Travel Date</p>
                      <p className="font-medium text-gray-900">
                        {selectedBooking.travelMonth} {selectedBooking.travelYear}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Traveler Type</p>
                      <p className="font-medium text-gray-900">{selectedBooking.travelerType}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Total Travelers</p>
                      <p className="font-medium text-gray-900">{selectedBooking.totalTravelers}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Budget per Person</p>
                      <p className="font-semibold text-[var(--burgundy)]">
                        {selectedBooking.currency === "USD" ? "$" : selectedBooking.currency === "EUR" ? "€" : selectedBooking.currency === "GBP" ? "£" : selectedBooking.currency === "INR" ? "₹" : selectedBooking.currency}
                        {selectedBooking.budgetAmount.toLocaleString()} {selectedBooking.currency}
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500 font-medium mb-2">Consent Preferences</p>
                    <div className="text-sm space-y-1">
                      <p className={selectedBooking.consentEmail ? "text-green-700" : "text-gray-400"}>
                        {selectedBooking.consentEmail ? "✓" : "✗"} Email Communications
                      </p>
                      <p className={selectedBooking.consentSMS ? "text-green-700" : "text-gray-400"}>
                        {selectedBooking.consentSMS ? "✓" : "✗"} SMS Communications
                      </p>
                      <p className={selectedBooking.consentContact ? "text-green-700" : "text-gray-400"}>
                        {selectedBooking.consentContact ? "✓" : "✗"} Contact Permission
                      </p>
                    </div>
                  </div>
                  
                  {selectedBooking.referralSource && (
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Referral Source</p>
                      <p className="text-sm text-gray-700">{selectedBooking.referralSource}</p>
                    </div>
                  )}
                  {selectedBooking.additionalNotes && (
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Additional Notes</p>
                      <p className="text-sm text-gray-700 whitespace-pre-wrap">{selectedBooking.additionalNotes}</p>
                    </div>
                  )}

                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-500 font-medium mb-3">Update Status</p>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => updateStatus(selectedBooking._id, "confirmed")}
                        disabled={selectedBooking.status === "confirmed"}
                        className={`flex items-center gap-1 px-3 py-2 rounded text-sm font-medium transition ${
                          selectedBooking.status === "confirmed"
                            ? "bg-green-500 text-white"
                            : "bg-green-100 text-green-800 hover:bg-green-200"
                        }`}
                      >
                        <Check size={16} /> Confirm
                      </button>
                      <button
                        onClick={() => updateStatus(selectedBooking._id, "pending")}
                        disabled={selectedBooking.status === "pending"}
                        className={`flex items-center gap-1 px-3 py-2 rounded text-sm font-medium transition ${
                          selectedBooking.status === "pending"
                            ? "bg-yellow-500 text-white"
                            : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                        }`}
                      >
                        <Clock size={16} /> Pending
                      </button>
                      <button
                        onClick={() => updateStatus(selectedBooking._id, "cancelled")}
                        disabled={selectedBooking.status === "cancelled"}
                        className={`flex items-center gap-1 px-3 py-2 rounded text-sm font-medium transition ${
                          selectedBooking.status === "cancelled"
                            ? "bg-red-500 text-white"
                            : "bg-red-100 text-red-800 hover:bg-red-200"
                        }`}
                      >
                        <X size={16} /> Cancel
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">Select a booking to view details</p>
              )}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
