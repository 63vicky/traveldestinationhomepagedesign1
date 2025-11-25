import mongoose from "mongoose"

const testimonialSchema = new mongoose.Schema(
  {
    quote: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    location: String,
    image: String,
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 5,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
)

export const Testimonial = mongoose.models.Testimonial || mongoose.model("Testimonial", testimonialSchema)
