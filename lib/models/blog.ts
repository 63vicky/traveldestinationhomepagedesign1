import mongoose from "mongoose"

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    excerpt: String,
    content: String,
    image: String,
    category: String,
    tags: [String],
    published: {
      type: Boolean,
      default: false,
    },
    publishedAt: Date,
  },
  { timestamps: true },
)

export const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema)
