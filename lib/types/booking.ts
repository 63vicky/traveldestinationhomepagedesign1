export interface Currency {
  code: string
  symbol: string
  name: string
}

export const CURRENCIES: Currency[] = [
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "British Pound" },
  { code: "INR", symbol: "₹", name: "Indian Rupee" },
  { code: "AUD", symbol: "A$", name: "Australian Dollar" },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar" },
  { code: "JPY", symbol: "¥", name: "Japanese Yen" },
  { code: "CNY", symbol: "¥", name: "Chinese Yuan" },
  { code: "CHF", symbol: "Fr", name: "Swiss Franc" },
  { code: "SGD", symbol: "S$", name: "Singapore Dollar" },
]

export const TRAVELER_TYPES = [
  "Couple",
  "Family",
  "Group of Friends",
  "Solo",
  "2+ Families",
  "Other",
] as const

export type TravelerType = (typeof TRAVELER_TYPES)[number]

export interface BookingFormData {
  // Step 1: Destinations
  destinations: string[]

  // Step 2: Dates
  travelYear: number
  travelMonth: string

  // Step 3: Traveler Type
  travelerType: TravelerType

  // Step 4: Traveler Count
  totalTravelers: number
  travelersUnder18: number

  // Step 5: Budget
  budgetAmount: number
  currency: string

  // Step 6: Contact Information
  firstName: string
  lastName: string
  countryCode: string
  phoneNumber: string
  email: string
  
  // Consent checkboxes
  consentEmail: boolean
  consentSMS: boolean
  consentContact: boolean
}
