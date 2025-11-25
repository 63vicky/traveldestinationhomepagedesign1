import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import { Testimonial } from "@/lib/models/testimonial"

export async function GET(request: NextRequest) {
  try {
    await connectDB()
    const searchParams = request.nextUrl.searchParams
    const featured = searchParams.get("featured")

    const query: any = {}
    if (featured === "true") {
      query.featured = true
    }

    const testimonials = await Testimonial.find(query).sort({ createdAt: -1 })
    return NextResponse.json(testimonials)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch testimonials" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    const body = await request.json()
    const testimonial = await Testimonial.create(body)
    return NextResponse.json(testimonial, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create testimonial" }, { status: 500 })
  }
}
