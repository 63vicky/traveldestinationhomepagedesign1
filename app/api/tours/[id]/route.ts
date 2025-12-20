import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import { Tour } from "@/lib/models/tour"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB()
    const { id } = await params
    const tour = await Tour.findById(id).populate("destination")
    if (!tour) {
      return NextResponse.json({ error: "Tour not found" }, { status: 404 })
    }
    return NextResponse.json(tour)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch tour" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB()
    const { id } = await params
    const body = await request.json()
    const tour = await Tour.findByIdAndUpdate(id, body, { new: true }).populate("destination")
    if (!tour) {
      return NextResponse.json({ error: "Tour not found" }, { status: 404 })
    }
    return NextResponse.json(tour)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update tour" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB()
    const { id } = await params
    const tour = await Tour.findByIdAndDelete(id)
    if (!tour) {
      return NextResponse.json({ error: "Tour not found" }, { status: 404 })
    }
    return NextResponse.json({ message: "Tour deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete tour" }, { status: 500 })
  }
}
