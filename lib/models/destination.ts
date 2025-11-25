import mongoose from "mongoose"

const destinationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    tagline: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["luxury", "adventure", "cultural", "beach", "mountain"],
      default: "luxury",
    },
    duration: {
      type: Number,
      required: true,
    },
    highlights: [String],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
)

export const Destination = mongoose.models.Destination || mongoose.model("Destination", destinationSchema)
