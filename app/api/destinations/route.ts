import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import { Destination } from "@/lib/models/destination"

export async function GET() {
  try {
    await connectDB()
    const destinations = await Destination.find({ isActive: true })
    return NextResponse.json(destinations)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch destinations" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    const body = await request.json()

    const destination = await Destination.create(body)
    return NextResponse.json(destination, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create destination" }, { status: 500 })
  }
}
