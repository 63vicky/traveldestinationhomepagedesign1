import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import { Blog } from "@/lib/models/blog"

export async function GET(request: NextRequest) {
  try {
    await connectDB()
    const searchParams = request.nextUrl.searchParams
    const published = searchParams.get("published")

    const query: any = {}
    if (published === "true") {
      query.published = true
    }

    const blogs = await Blog.find(query).sort({ publishedAt: -1, createdAt: -1 })
    return NextResponse.json(blogs)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    const body = await request.json()
    if (body.published) {
      body.publishedAt = new Date()
    }
    const blog = await Blog.create(body)
    return NextResponse.json(blog, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create blog" }, { status: 500 })
  }
}
