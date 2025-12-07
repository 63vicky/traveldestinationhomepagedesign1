"use client"

import { useState, type FormEvent } from "react"
import { X, ChevronLeft, ChevronRight, Plus, Loader } from "lucide-react"
import { CURRENCIES, TRAVELER_TYPES, type BookingFormData, type TravelerType } from "@/lib/types/booking"
import { RangeSlider } from "@/components/ui/range-slider"

interface MultiStepBookingFormProps {
  onClose: () => void
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
const PRICE_POINTS = [10000, 12500, 15000, 17500, 20000, 25000, 35000, 50000]
const COUNTRY_CODES = [
  { code: "+1", country: "US", flag: "🇺🇸" },
  { code: "+44", country: "UK", flag: "🇬🇧" },
  { code: "+91", country: "IN", flag: "🇮🇳" },
  { code: "+61", country: "AU", flag: "🇦🇺" },
  { code: "+86", country: "CN", flag: "🇨🇳" },
]

export function MultiStepBookingForm({ onClose }: MultiStepBookingFormProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [destinationInput, setDestinationInput] = useState("")

  const [formData, setFormData] = useState<BookingFormData>({
    destinations: [],
    travelYear: new Date().getFullYear(),
    travelMonth: "",
    travelerType: "Couple",
    totalTravelers: 0,
    travelersUnder18: 0,
    budgetAmount: 15000,
    currency: "USD",
    firstName: "",
    lastName: "",
    countryCode: "+91",
    phoneNumber: "",
    email: "",
    consentEmail: false,
    consentSMS: false,
    consentContact: false,
  })


  // Skip step 4 if Solo or Couple is selected
  const shouldSkipTravelerCount = formData.travelerType === "Solo" || formData.travelerType === "Couple"
  
  // Always use 6 actual steps, but display fewer when skipping
  const getTotalDisplaySteps = () => shouldSkipTravelerCount ? 5 : 6
  
  const getDisplayStep = (actualStep: number) => {
    if (!shouldSkipTravelerCount) return actualStep
    // When skipping step 4:
    // Actual 1-3 → Display 1-3
    // Actual 4 is skipped
    // Actual 5 → Display 4
    // Actual 6 → Display 5
    if (actualStep <= 3) return actualStep
    if (actualStep >= 5) return actualStep - 1
    return actualStep
  }

  const updateFormData = (updates: Partial<BookingFormData>) => {
    setFormData({ ...formData, ...updates })
  }

  const addDestination = () => {
    if (destinationInput.trim() && !formData.destinations.includes(destinationInput.trim())) {
      updateFormData({ destinations: [...formData.destinations, destinationInput.trim()] })
      setDestinationInput("")
    }
  }

  const removeDestination = (destination: string) => {
    updateFormData({ destinations: formData.destinations.filter((d) => d !== destination) })
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addDestination()
    }
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.destinations.length > 0
      case 2:
        return formData.travelMonth !== ""
      case 3:
        return true // travelerType always has a default value
      case 4:
        return formData.totalTravelers > 0
      case 5:
        return formData.budgetAmount > 0
      case 6:
        return (
          formData.firstName.trim() !== "" &&
          formData.email.trim() !== "" &&
          formData.phoneNumber.trim() !== "" &&
          (formData.consentEmail || formData.consentSMS || formData.consentContact)
        )
      default:
        return false
    }
  }

  const handleNext = () => {
    if (canProceed()) {
      let nextStep = currentStep + 1
      
      // Auto-set traveler count based on type when moving from step 3
      if (currentStep === 3) {
        if (formData.travelerType === "Solo") {
          updateFormData({ totalTravelers: 1, travelersUnder18: 0 })
          nextStep = 5  // Skip step 4 (traveler count)
        } else if (formData.travelerType === "Couple") {
          updateFormData({ totalTravelers: 2, travelersUnder18: 0 })
          nextStep = 5  // Skip step 4 (traveler count)
        }
      }
      
      // Always allow progression to final step
      setCurrentStep(nextStep)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      let prevStep = currentStep - 1
      
      // Skip step 4 when going back if Solo or Couple
      if (currentStep === 5 && shouldSkipTravelerCount) {
        prevStep = 3
      }
      
      setCurrentStep(prevStep)
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!canProceed()) return

    setLoading(true)
    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          status: "pending",
        }),
      })

      if (response.ok) {
        const result = await response.json()
        const bookingId = result._id
        
        // Redirect to thank you page with booking info
        window.location.href = `/booking/thank-you?bookingId=${bookingId}&name=${encodeURIComponent(formData.firstName)}`
      } else {
        console.error("Booking failed")
        alert("Failed to submit booking. Please try again.")
      }
    } catch (error) {
      console.error("Failed to create booking:", error)
      alert("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const selectedCurrency = CURRENCIES.find((c) => c.code === formData.currency) || CURRENCIES[0]

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-[var(--border-light)]">
        <div className="flex-1">
          <div className="text-sm text-[var(--text-light)] mb-1">
            Step {getDisplayStep(currentStep)} of {getTotalDisplaySteps()}
          </div>
          <div className="w-full bg-[var(--border-light)] h-1.5 rounded-full overflow-hidden">
            <div
              className="h-full bg-[var(--gold-accent)] transition-all duration-300"
              style={{ width: `${(getDisplayStep(currentStep) / getTotalDisplaySteps()) * 100}%` }}
            />
          </div>
        </div>
        <button
          onClick={onClose}
          className="ml-6 text-[var(--text-light)] hover:text-[var(--burgundy)] transition-colors"
        >
          <X size={24} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Step 1: Destination Selection */}
        {currentStep === 1 && (
          <div className="min-h-[400px] flex flex-col">
            <h2 className="text-3xl mb-2" style={{ fontFamily: "var(--font-playfair)" }}>
              <span className="italic">Where</span> would you like to travel?
            </h2>
            <p className="text-[var(--text-light)] mb-8">Please select the destinations you'd like to visit</p>

            <div className="flex-1">
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={destinationInput}
                  onChange={(e) => setDestinationInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your destination and hit enter"
                  className="flex-1 px-4 py-3 border border-[var(--border-light)] rounded-md text-sm focus:outline-none focus:border-[var(--gold-accent)] transition-colors"
                />
                <button
                  type="button"
                  onClick={addDestination}
                  className="px-6 py-3 bg-[var(--gold-accent)] text-white rounded-md hover:opacity-90 transition-opacity"
                >
                  ADD
                </button>
              </div>

              {formData.destinations.length > 0 && (
                <div className="flex flex-wrap gap-3 mt-6">
                  {formData.destinations.map((destination) => (
                    <div
                      key={destination}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--cream)] border border-[var(--border-light)] rounded-full"
                    >
                      <span className="text-sm">{destination}</span>
                      <button
                        type="button"
                        onClick={() => removeDestination(destination)}
                        className="text-[var(--text-light)] hover:text-[var(--burgundy)] transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 2: Date Selection */}
        {currentStep === 2 && (
          <div className="min-h-[400px] flex flex-col">
            <h2 className="text-3xl mb-2" style={{ fontFamily: "var(--font-playfair)" }}>
              <span className="italic">When</span> would you like to travel to {formData.destinations[0]}?
            </h2>
            <p className="text-[var(--text-light)] mb-8">
              Please select one or more of the following. A general idea is fine.
            </p>

            <div className="flex-1">
              {/* Year Selector */}
              <div className="flex items-center justify-center gap-4 mb-8">
                <button
                  type="button"
                  onClick={() => updateFormData({ travelYear: formData.travelYear - 1 })}
                  className="p-2 hover:bg-[var(--cream)] rounded-full transition-colors"
                >
                  <ChevronLeft size={20} />
                </button>
                <span className="text-xl font-medium w-20 text-center">{formData.travelYear}</span>
                <button
                  type="button"
                  onClick={() => updateFormData({ travelYear: formData.travelYear + 1 })}
                  className="p-2 hover:bg-[var(--cream)] rounded-full transition-colors"
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              {/* Month Grid */}
              <div className="grid grid-cols-4 gap-3">
                {MONTHS.map((month) => (
                  <button
                    key={month}
                    type="button"
                    onClick={() => updateFormData({ travelMonth: month })}
                    className={`px-4 py-3 border rounded-md text-sm transition-all ${
                      formData.travelMonth === month
                        ? "bg-[var(--gold-accent)] text-white border-[var(--gold-accent)]"
                        : "border-[var(--border-light)] hover:border-[var(--gold-accent)] hover:bg-[var(--cream)]"
                    }`}
                  >
                    {month}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Traveler Type */}
        {currentStep === 3 && (
          <div className="min-h-[400px] flex flex-col">
            <h2 className="text-3xl mb-2" style={{ fontFamily: "var(--font-playfair)" }}>
              <span className="italic">Who</span> are you travelling to {formData.destinations[0]} with?
            </h2>
            <p className="text-[var(--text-light)] mb-8">Please select one of the following</p>

            <div className="flex-1 space-y-3">
              {TRAVELER_TYPES.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => updateFormData({ travelerType: type as TravelerType })}
                  className={`w-full px-6 py-4 border rounded-md text-left transition-all flex items-center justify-between ${
                    formData.travelerType === type
                      ? "bg-[var(--gold-accent)] text-white border-[var(--gold-accent)]"
                      : "border-[var(--border-light)] hover:border-[var(--gold-accent)] hover:bg-[var(--cream)]"
                  }`}
                >
                  <span>{type}</span>
                  {formData.travelerType === type && (
                    <div className="w-5 h-5 rounded-full bg-white border-2 border-[var(--gold-accent)] flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-[var(--gold-accent)]" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Traveler Count */}
        {currentStep === 4 && (
          <div className="min-h-[400px] flex flex-col">
            <h2 className="text-3xl mb-2" style={{ fontFamily: "var(--font-playfair)" }}>
              <span className="italic">Who</span> are you travelling with?
            </h2>
            <p className="text-[var(--text-light)] mb-8">How many people will be travelling?</p>

            <div className="flex-1 space-y-6 max-w-md">
              <div>
                <label className="block text-sm font-medium mb-3">How many people will be travelling?</label>
                <select
                  value={formData.totalTravelers}
                  onChange={(e) => updateFormData({ totalTravelers: Number(e.target.value) })}
                  className="w-full px-4 py-3 border border-[var(--border-light)] rounded-md text-sm focus:outline-none focus:border-[var(--gold-accent)] bg-white"
                >
                  <option value={0}>0</option>
                  {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-3">How many of the group are under 18?</label>
                <select
                  value={formData.travelersUnder18}
                  onChange={(e) => updateFormData({ travelersUnder18: Number(e.target.value) })}
                  className="w-full px-4 py-3 border border-[var(--border-light)] rounded-md text-sm focus:outline-none focus:border-[var(--gold-accent)] bg-white"
                >
                  <option value={0}>0</option>
                  {Array.from({ length: Math.min(formData.totalTravelers, 20) }, (_, i) => i + 1).map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Budget */}
        {currentStep === 5 && (
          <div className="min-h-[400px] flex flex-col">
            <h2 className="text-3xl mb-2" style={{ fontFamily: "var(--font-playfair)" }}>
              What is your <span className="italic">budget</span> for this trip?
            </h2>
            <p className="text-[var(--text-light)] mb-8">
              Please select your desired budget from the options below
              <br />
              (price per person)
            </p>

            <div className="flex-1 max-w-xl">
              {/* Currency Selector */}
              <div className="mb-8">
                <select
                  value={formData.currency}
                  onChange={(e) => updateFormData({ currency: e.target.value })}
                  className="px-4 py-2 border border-[var(--border-light)] rounded-md text-sm focus:outline-none focus:border-[var(--gold-accent)] bg-white"
                >
                  {CURRENCIES.map((currency) => (
                    <option key={currency.code} value={currency.code}>
                      {currency.symbol} {currency.code}
                    </option>
                  ))}
                </select>
              </div>

              {/* Range Slider */}
              <div className="mb-6">
                <div className="text-center mb-8">
                  <div className="text-4xl font-semibold text-[var(--burgundy)]">
                    {selectedCurrency.symbol}
                    {formData.budgetAmount.toLocaleString()}
                  </div>
                </div>

                <RangeSlider
                  value={[formData.budgetAmount]}
                  onValueChange={(values) => updateFormData({ budgetAmount: values[0] })}
                  min={PRICE_POINTS[0]}
                  max={PRICE_POINTS[PRICE_POINTS.length - 1]}
                  step={50}
                  pricePoints={PRICE_POINTS}
                  currency={selectedCurrency.symbol}
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 6: Contact Information */}
        {currentStep === 6 && (
          <div className="min-h-[400px] flex flex-col">
            <h2 className="text-3xl mb-2" style={{ fontFamily: "var(--font-playfair)" }}>
              <span className="italic">Finally</span>, how should we contact you?
            </h2>
            <p className="text-[var(--text-light)] mb-8"></p>

            <div className="flex-1 space-y-4 max-w-md">
              <input
                type="text"
                placeholder="First name"
                value={formData.firstName}
                onChange={(e) => updateFormData({ firstName: e.target.value })}
                className="w-full px-4 py-3 border border-[var(--border-light)] rounded-md text-sm focus:outline-none focus:border-[var(--gold-accent)]"
              />

              <input
                type="text"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={(e) => updateFormData({ lastName: e.target.value })}
                className="w-full px-4 py-3 border border-[var(--border-light)] rounded-md text-sm focus:outline-none focus:border-[var(--gold-accent)]"
              />

              <div className="flex gap-2">
                <select
                  value={formData.countryCode}
                  onChange={(e) => updateFormData({ countryCode: e.target.value })}
                  className="px-3 py-3 border border-[var(--border-light)] rounded-md text-sm focus:outline-none focus:border-[var(--gold-accent)] bg-white"
                >
                  {COUNTRY_CODES.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.flag} {country.code}
                    </option>
                  ))}
                </select>
                <input
                  type="tel"
                  placeholder="Your phone number"
                  value={formData.phoneNumber}
                  onChange={(e) => updateFormData({ phoneNumber: e.target.value })}
                  className="flex-1 px-4 py-3 border border-[var(--border-light)] rounded-md text-sm focus:outline-none focus:border-[var(--gold-accent)]"
                />
              </div>

              <input
                type="email"
                placeholder="Your email address"
                value={formData.email}
                onChange={(e) => updateFormData({ email: e.target.value })}
                className="w-full px-4 py-3 border border-[var(--border-light)] rounded-md text-sm focus:outline-none focus:border-[var(--gold-accent)]"
              />

              {/* Consent Checkboxes */}
              <div className="space-y-3 pt-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.consentEmail}
                    onChange={(e) => updateFormData({ consentEmail: e.target.checked })}
                    className="mt-1 w-4 h-4 text-[var(--gold-accent)] border-[var(--border-light)] rounded focus:ring-[var(--gold-accent)]"
                  />
                  <span className="text-sm text-[var(--text-light)] leading-relaxed">
                    I am happy to receive emails from you including the latest travel guides, tips and
                    information.
                  </span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.consentSMS}
                    onChange={(e) => updateFormData({ consentSMS: e.target.checked })}
                    className="mt-1 w-4 h-4 text-[var(--gold-accent)] border-[var(--border-light)] rounded focus:ring-[var(--gold-accent)]"
                  />
                  <span className="text-sm text-[var(--text-light)] leading-relaxed">
                    I am happy for you to contact me by SMS to facilitate the planning of my trip. You may opt-out any
                    time by replying STOP or ask for more information by replying HELP. Message frequency varies. Message
                    and data rates may apply. Data handling information can be found on our{" "}
                    <a href="#" className="underline">
                      privacy policy
                    </a>
                    .
                  </span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.consentContact}
                    onChange={(e) => updateFormData({ consentContact: e.target.checked })}
                    className="mt-1 w-4 h-4 text-[var(--gold-accent)] border-[var(--border-light)] rounded focus:ring-[var(--gold-accent)]"
                  />
                  <span className="text-sm text-[var(--text-light)] leading-relaxed">
                    I am happy for you to contact me using the details provided via phone or email, in accordance with
                    the privacy policy (required).
                  </span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center pt-8 border-t border-[var(--border-light)]">
          <button
            type="button"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="px-6 py-3 text-[var(--gold-accent)] hover:text-[var(--burgundy)] disabled:opacity-0 disabled:pointer-events-none transition-opacity"
          >
            Previous
          </button>

          {currentStep < 6 ? (
            <button
              type="button"
              onClick={handleNext}
              disabled={!canProceed()}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              NEXT STEP
            </button>
          ) : (
            <button
              type="submit"
              disabled={!canProceed() || loading}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading && <Loader size={16} className="animate-spin" />}
              {loading ? "Submitting..." : "SUBMIT"}
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
