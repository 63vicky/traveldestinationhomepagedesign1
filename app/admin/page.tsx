"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { MapPin, Plane, Calendar, MessageSquare, FileText, TrendingUp, Users, DollarSign, Loader } from "lucide-react"
import AdminLayout from "@/components/admin-layout"

interface Stats {
  destinations: number
  tours: number
  bookings: number
  testimonials: number
  blogs: number
  pendingBookings: number
  confirmedBookings: number
  totalRevenue: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    destinations: 0,
    tours: 0,
    bookings: 0,
    testimonials: 0,
    blogs: 0,
    pendingBookings: 0,
    confirmedBookings: 0,
    totalRevenue: 0,
  })
  const [loading, setLoading] = useState(true)
  const [healthStatus, setHealthStatus] = useState<"ok" | "error" | "loading">("loading")

  useEffect(() => {
    fetchStats()
    checkHealth()
  }, [])

  const fetchStats = async () => {
    try {
      const [destinations, tours, bookings, testimonials, blogs] = await Promise.all([
        fetch("/api/destinations").then((r) => r.json()),
        fetch("/api/tours").then((r) => r.json()),
        fetch("/api/bookings").then((r) => r.json()),
        fetch("/api/testimonials").then((r) => r.json()),
        fetch("/api/blogs").then((r) => r.json()),
      ])

      const pendingBookings = Array.isArray(bookings) ? bookings.filter((b: any) => b.status === "pending").length : 0
      const confirmedBookings = Array.isArray(bookings)
        ? bookings.filter((b: any) => b.status === "confirmed").length
        : 0
      const totalRevenue = Array.isArray(bookings)
        ? bookings
            .filter((b: any) => b.status === "confirmed")
            .reduce((sum: number, b: any) => sum + (b.totalPrice || 0), 0)
        : 0

      setStats({
        destinations: Array.isArray(destinations) ? destinations.length : 0,
        tours: Array.isArray(tours) ? tours.length : 0,
        bookings: Array.isArray(bookings) ? bookings.length : 0,
        testimonials: Array.isArray(testimonials) ? testimonials.length : 0,
        blogs: Array.isArray(blogs) ? blogs.length : 0,
        pendingBookings,
        confirmedBookings,
        totalRevenue,
      })
    } catch (error) {
      console.error("Failed to fetch stats:", error)
    } finally {
      setLoading(false)
    }
  }

  const checkHealth = async () => {
    try {
      const response = await fetch("/api/health")
      const data = await response.json()
      setHealthStatus(data.status === "ok" ? "ok" : "error")
    } catch {
      setHealthStatus("error")
    }
  }

  const statCards = [
    {
      label: "Destinations",
      value: stats.destinations,
      icon: MapPin,
      href: "/admin/destinations",
      color: "bg-blue-500",
    },
    { label: "Tours", value: stats.tours, icon: Plane, href: "/admin/tours", color: "bg-purple-500" },
    { label: "Bookings", value: stats.bookings, icon: Calendar, href: "/admin/bookings", color: "bg-green-500" },
    {
      label: "Testimonials",
      value: stats.testimonials,
      icon: MessageSquare,
      href: "/admin/testimonials",
      color: "bg-orange-500",
    },
    { label: "Blog Posts", value: stats.blogs, icon: FileText, href: "/admin/blogs", color: "bg-pink-500" },
  ]

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome back! Here's what's happening.</p>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`w-3 h-3 rounded-full ${
                healthStatus === "ok" ? "bg-green-500" : healthStatus === "error" ? "bg-red-500" : "bg-yellow-500"
              }`}
            />
            <span className="text-sm text-gray-600">
              {healthStatus === "ok"
                ? "Database Connected"
                : healthStatus === "error"
                  ? "Database Error"
                  : "Checking..."}
            </span>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader className="animate-spin text-gray-600" size={32} />
          </div>
        ) : (
          <>
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <DollarSign className="text-green-600" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Total Revenue</p>
                    <p className="text-2xl font-bold text-gray-900">${stats.totalRevenue.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-yellow-100 rounded-lg">
                    <TrendingUp className="text-yellow-600" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Pending Bookings</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.pendingBookings}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Users className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Confirmed Bookings</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.confirmedBookings}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {statCards.map((card) => {
                const Icon = card.icon
                return (
                  <Link
                    key={card.label}
                    href={card.href}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-gray-300 transition group"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-2 rounded-lg ${card.color}`}>
                        <Icon className="text-white" size={20} />
                      </div>
                      <span className="text-3xl font-bold text-gray-900">{card.value}</span>
                    </div>
                    <p className="text-sm text-gray-500 group-hover:text-gray-700 transition font-medium">
                      {card.label}
                    </p>
                  </Link>
                )
              })}
            </div>

            {/* Quick Actions */}
            <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/admin/destinations"
                  className="px-4 py-2 bg-[var(--gold)] text-[var(--charcoal)] rounded font-medium text-sm hover:bg-[var(--gold-accent)] transition"
                >
                  Add Destination
                </Link>
                <Link
                  href="/admin/tours"
                  className="px-4 py-2 bg-[var(--gold)] text-[var(--charcoal)] rounded font-medium text-sm hover:bg-[var(--gold-accent)] transition"
                >
                  Add Tour
                </Link>
                <Link
                  href="/admin/blogs"
                  className="px-4 py-2 bg-[var(--gold)] text-[var(--charcoal)] rounded font-medium text-sm hover:bg-[var(--gold-accent)] transition"
                >
                  Write Blog Post
                </Link>
                <Link
                  href="/admin/bookings"
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded font-medium hover:bg-gray-50 transition text-sm"
                >
                  View Bookings
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  )
}
