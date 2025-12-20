import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import { Blog } from "@/lib/models/blog"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB()
    const { id } = await params
    const blog = await Blog.findById(id)
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 })
    }
    return NextResponse.json(blog)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch blog" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB()
    const { id } = await params
    const body = await request.json()
    if (body.published && !body.publishedAt) {
      body.publishedAt = new Date()
    }
    const blog = await Blog.findByIdAndUpdate(id, body, { new: true })
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 })
    }
    return NextResponse.json(blog)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update blog" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB()
    const { id } = await params
    const blog = await Blog.findByIdAndDelete(id)
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 })
    }
    return NextResponse.json({ message: "Blog deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 })
  }
}
