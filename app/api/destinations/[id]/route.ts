import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import { Destination } from "@/lib/models/destination"
import mongoose from "mongoose"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()
    const { id } = params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid destination ID" }, { status: 400 })
    }

    const destination = await Destination.findById(id)
    if (!destination) {
      return NextResponse.json({ error: "Destination not found" }, { status: 404 })
    }

    return NextResponse.json(destination)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch destination" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()
    const { id } = params
    const body = await request.json()

    const destination = await Destination.findByIdAndUpdate(id, body, {
      new: true,
    })

    if (!destination) {
      return NextResponse.json({ error: "Destination not found" }, { status: 404 })
    }

    return NextResponse.json(destination)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update destination" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()
    const { id } = params

    const destination = await Destination.findByIdAndDelete(id)

    if (!destination) {
      return NextResponse.json({ error: "Destination not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Destination deleted" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete destination" }, { status: 500 })
  }
}
