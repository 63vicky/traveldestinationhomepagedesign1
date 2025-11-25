import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import { Tour } from "@/lib/models/tour"

export async function GET(request: NextRequest) {
  try {
    await connectDB()
    const searchParams = request.nextUrl.searchParams
    const featured = searchParams.get("featured")

    const query: any = { isActive: true }
    if (featured === "true") {
      query.featured = true
    }

    const tours = await Tour.find(query).populate("destination", "title slug").sort({ createdAt: -1 })
    return NextResponse.json(tours)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch tours" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    const body = await request.json()
    const tour = await Tour.create(body)
    return NextResponse.json(tour, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create tour" }, { status: 500 })
  }
}
