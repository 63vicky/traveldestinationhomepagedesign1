"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Loader } from "lucide-react"

const REFERRAL_OPTIONS = [
  "I've travelled with you before",
  "By word of mouth or referral",
  "I read about you in the Press",
  "Online",
]

export default function ThankYouPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const bookingId = searchParams.get("bookingId")
  const guestName = searchParams.get("name") || "there"

  const [referralSource, setReferralSource] = useState("")
  const [additionalNotes, setAdditionalNotes] = useState("")
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!referralSource) {
      alert("Please select how you heard about us")
      return
    }

    setLoading(true)

    try {
      // Update the booking with referral info
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          referralSource,
          additionalNotes,
        }),
      })

      if (response.ok) {
        setSubmitted(true)
        // Redirect to home after 3 seconds
        setTimeout(() => {
          router.push("/")
        }, 3000)
      } else {
        alert("Failed to submit. Please try again.")
      }
    } catch (error) {
      console.error("Error submitting referral info:", error)
      alert("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[var(--burgundy)] to-[var(--burgundy-dark)] flex items-center justify-center px-4">
        <div className="text-center text-white">
          <div className="text-6xl mb-6">✓</div>
          <h1 className="text-3xl mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
            Thank you!
          </h1>
          <p className="text-lg text-[var(--cream)]">Redirecting you to the homepage...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--burgundy)] to-[var(--burgundy-dark)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl">
        

        {/* Main Content */}
        <div className="text-center mb-12">
          <h1
            className="text-5xl md:text-6xl text-white mb-6"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            <span className="italic">Thanks</span> for your enquiry
          </h1>
          <p className="text-lg text-[var(--cream)]">
            We'll be in touch soon to start planning your dream trip
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Referral Source */}
          <div>
            <h2 className="text-white text-lg mb-6 text-center">
              One last thing, how did you hear about us?
            </h2>
            <div className="space-y-3 max-w-md mx-auto">
              {REFERRAL_OPTIONS.map((option) => (
                <label
                  key={option}
                  className="flex items-center gap-4 px-6 py-4 border border-white/20 rounded-md cursor-pointer hover:bg-white/5 transition-colors"
                >
                  <input
                    type="radio"
                    name="referral"
                    value={option}
                    checked={referralSource === option}
                    onChange={(e) => setReferralSource(e.target.value)}
                    className="w-5 h-5 text-[var(--gold-accent)] border-white/40 focus:ring-[var(--gold-accent)] bg-transparent"
                  />
                  <span className="text-white flex-1">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Additional Notes */}
          <div className="max-w-2xl mx-auto">
            <h2 className="text-white text-lg mb-4 text-center">
              Is there anything else you'd like us to know about your trip?
            </h2>
            <textarea
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
              placeholder="Type your response"
              rows={4}
              className="w-full px-6 py-4 bg-transparent border border-white/20 rounded-md text-white placeholder-white/40 focus:outline-none focus:border-[var(--gold-accent)] transition-colors"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-6">
            <button
              type="submit"
              disabled={loading || !referralSource}
              className="px-12 py-4 bg-[var(--gold-accent)] text-white rounded-md hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 text-lg font-medium"
            >
              {loading && <Loader size={20} className="animate-spin" />}
              {loading ? "Submitting..." : "SUBMIT"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
