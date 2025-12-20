import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import { Testimonial } from "@/lib/models/testimonial"

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB()
    const { id } = await params
    const body = await request.json()
    const testimonial = await Testimonial.findByIdAndUpdate(id, body, { new: true })
    if (!testimonial) {
      return NextResponse.json({ error: "Testimonial not found" }, { status: 404 })
    }
    return NextResponse.json(testimonial)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update testimonial" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB()
    const { id } = await params
    const testimonial = await Testimonial.findByIdAndDelete(id)
    if (!testimonial) {
      return NextResponse.json({ error: "Testimonial not found" }, { status: 404 })
    }
    return NextResponse.json({ message: "Testimonial deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete testimonial" }, { status: 500 })
  }
}
