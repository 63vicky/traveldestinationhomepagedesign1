import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import { Booking } from "@/lib/models/booking"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB()
    const { id } = await params
    const booking = await Booking.findById(id)
    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 })
    }
    return NextResponse.json(booking)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch booking" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB()
    const { id } = await params
    const body = await request.json()
    const booking = await Booking.findByIdAndUpdate(id, body, { new: true })
    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 })
    }
    return NextResponse.json(booking)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update booking" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB()
    const { id } = await params
    const booking = await Booking.findByIdAndDelete(id)
    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 })
    }
    return NextResponse.json({ message: "Booking deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete booking" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB()
    const { id } = await params
    const body = await request.json()

    // Update the booking with referral info (no email sent)
    const booking = await Booking.findByIdAndUpdate(
      id,
      { 
        referralSource: body.referralSource,
        additionalNotes: body.additionalNotes 
      },
      { new: true }
    )

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 })
    }

    return NextResponse.json(booking)
  } catch (error) {
    console.error("Booking update error:", error)
    return NextResponse.json({ error: "Failed to update booking" }, { status: 500 })
  }
}
