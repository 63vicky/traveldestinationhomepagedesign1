import mongoose from "mongoose"

const bookingSchema = new mongoose.Schema(
  {
    // Destinations
    destinations: {
      type: [String],
      required: true,
    },
    
    // Travel Dates
    travelYear: {
      type: Number,
      required: true,
    },
    travelMonth: {
      type: String,
      required: true,
    },
    
    // Traveler Information
    travelerType: {
      type: String,
      enum: ["Couple", "Family", "Group of Friends", "Solo", "2+ Families", "Other"],
      required: true,
    },
    totalTravelers: {
      type: Number,
      required: true,
    },
    travelersUnder18: {
      type: Number,
      default: 0,
    },
    
    // Budget
    budgetAmount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
      default: "USD",
    },
    
    // Contact Information
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: false,
    },
    countryCode: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    
    // Consent Flags
    consentEmail: {
      type: Boolean,
      default: false,
    },
    consentSMS: {
      type: Boolean,
      default: false,
    },
    consentContact: {
      type: Boolean,
      default: false,
    },
    
    // Referral Information (from thank you page)
    referralSource: {
      type: String,
      required: false,
    },
    additionalNotes: {
      type: String,
      required: false,
    },
    
    // Booking Status
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true },
)

export const Booking = mongoose.models.Booking || mongoose.model("Booking", bookingSchema)
