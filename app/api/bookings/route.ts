import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import { Booking } from "@/lib/models/booking"

export async function GET() {
  try {
    await connectDB()
    const bookings = await Booking.find().sort({ createdAt: -1 })
    return NextResponse.json(bookings)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    const body = await request. json()

    // Create the booking
    const booking = await Booking.create(body)
    
    // Send email notifications (don't block on email failures)
    if (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD) {
      try {
        const { sendGuestConfirmation, sendAdminNotification } = await import("@/lib/email/send-email")
        
        // Send emails in parallel
        await Promise.all([
          sendGuestConfirmation(body),
          sendAdminNotification(body)
        ])
        
        console.log("Email notifications sent successfully")
      } catch (emailError) {
        console.error("Failed to send email notifications:", emailError)
        // Continue - don't fail the booking if emails fail
      }
    } else {
      console.warn("Email credentials not configured - skipping email notifications")
    }
    
    return NextResponse.json(booking, { status: 201 })
  } catch (error) {
    console.error("Booking creation error:", error)
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 })
  }
}
