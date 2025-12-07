import nodemailer from "nodemailer"
import type { BookingFormData } from "@/lib/types/booking"

// Email configuration
const createTransporter = () => {
  // For development, use a test account or configure with your SMTP settings
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || "smtp.gmail.com",
    port: Number(process.env.EMAIL_PORT) || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  })
}

// Email template for guest confirmation
const getGuestEmailHTML = (data: BookingFormData) => {
  const { firstName, lastName, destinations, travelMonth, travelYear, travelerType, totalTravelers, budgetAmount, currency } = data
  const currencySymbol = currency === "USD" ? "$" : currency === "EUR" ? "€" : currency === "GBP" ? "£" : currency === "INR" ? "₹" : currency

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background: linear-gradient(135deg, #8B4545 0%, #6B2C2C 100%);
            color: #F4E8D8;
            padding: 30px;
            text-align: center;
            border-radius: 10px 10px 0 0;
          }
          .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: normal;
          }
          .content {
            background: #fff;
            padding: 30px;
            border: 1px solid #e0e0e0;
          }
          .booking-details {
            background: #F9F6F2;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
          }
          .detail-row {
            display: flex;
            justify-content: space-between;
            padding: 10px 0;
            border-bottom: 1px solid #e0e0e0;
          }
          .detail-row:last-child {
            border-bottom: none;
          }
          .label {
            font-weight: bold;
            color: #8B4545;
          }
          .footer {
            background: #f5f5f5;
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #666;
            border-radius: 0 0 10px 10px;
          }
          .button {
            display: inline-block;
            padding: 12px 30px;
            background: #C9A961;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            margin: 20px 0;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>✓ Booking Request Received</h1>
          <p>Thank you for choosing The Golden Triangle</p>
        </div>
        
        <div class="content">
          <h2>Dear ${firstName} ${lastName},</h2>
          <p>Thank you for your booking request! We're excited to help you plan your perfect journey.</p>
          
          <div class="booking-details">
            <h3>Your Booking Details</h3>
            <div class="detail-row">
              <span class="label">Destinations:</span>
              <span>${destinations.join(", ")}</span>
            </div>
            <div class="detail-row">
              <span class="label">Travel Date:</span>
              <span>${travelMonth} ${travelYear}</span>
            </div>
            <div class="detail-row">
              <span class="label">Traveler Type:</span>
              <span>${travelerType}</span>
            </div>
            <div class="detail-row">
              <span class="label">Total Travelers:</span>
              <span>${totalTravelers}</span>
            </div>
            <div class="detail-row">
              <span class="label">Budget per Person:</span>
              <span>${currencySymbol}${budgetAmount.toLocaleString()} ${currency}</span>
            </div>
          </div>
          
          <p>Our travel specialists will review your request and contact you within 24-48 hours to discuss your personalized itinerary.</p>
          
          <p>If you have any immediate questions, please don't hesitate to reach out to us.</p>
          
          <p>Warm regards,<br><strong>The Golden Triangle Team</strong></p>
        </div>
        
        <div class="footer">
          <p>This is an automated confirmation email. Please do not reply to this message.</p>
          <p>&copy; 2024 The Golden Triangle. All rights reserved.</p>
        </div>
      </body>
    </html>
  `
}

// Email template for admin notification
const getAdminEmailHTML = (data: any) => {
  const { firstName, lastName, email, phoneNumber, countryCode, destinations, travelMonth, travelYear, travelerType, totalTravelers, travelersUnder18, budgetAmount, currency, consentEmail, consentSMS, consentContact, referralSource, additionalNotes } = data
  const currencySymbol = currency === "USD" ? "$" : currency === "EUR" ? "€" : currency === "GBP" ? "£" : currency === "INR" ? "₹" : currency

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 700px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background: #8B4545;
            color: white;
            padding: 20px;
            text-align: center;
          }
          .section {
            background: #fff;
            padding: 20px;
            margin: 10px 0;
            border: 1px solid #e0e0e0;
            border-radius: 5px;
          }
          .section h3 {
            margin-top: 0;
            color: #8B4545;
            border-bottom: 2px solid #C9A961;
            padding-bottom: 10px;
          }
          .info-grid {
            display: grid;
            grid-template-columns: 180px 1fr;
            gap: 10px;
          }
          .label {
            font-weight: bold;
            color: #666;
          }
          .consent {
            background: #f0f0f0;
            padding: 10px;
            margin: 5px 0;
            border-radius: 3px;
          }
          .consent-yes {
            color: green;
          }
          .consent-no {
            color: #999;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h2>🔔 New Booking Request</h2>
        </div>
        
        <div class="section">
          <h3>Contact Information</h3>
          <div class="info-grid">
            <span class="label">Name:</span>
            <span>${firstName} ${lastName}</span>
            <span class="label">Email:</span>
            <span><a href="mailto:${email}">${email}</a></span>
            <span class="label">Phone:</span>
            <span>${countryCode} ${phoneNumber}</span>
          </div>
        </div>
        
        <div class="section">
          <h3>Trip Details</h3>
          <div class="info-grid">
            <span class="label">Destinations:</span>
            <span>${destinations.join(", ")}</span>
            <span class="label">Travel Date:</span>
            <span>${travelMonth} ${travelYear}</span>
            <span class="label">Traveler Type:</span>
            <span>${travelerType}</span>
            <span class="label">Total Travelers:</span>
            <span>${totalTravelers}</span>
            <span class="label">Under 18:</span>
            <span>${travelersUnder18}</span>
            <span class="label">Budget per Person:</span>
            <span>${currencySymbol}${budgetAmount.toLocaleString()} ${currency}</span>
          </div>
        </div>
        
        <div class="section">
          <h3>Consent Preferences</h3>
          <div class="consent">
            <span class="${consentEmail ? 'consent-yes' : 'consent-no'}">
              ${consentEmail ? '✓' : '✗'} Email Communications
            </span>
          </div>
          <div class="consent">
            <span class="${consentSMS ? 'consent-yes' : 'consent-no'}">
              ${consentSMS ? '✓' : '✗'} SMS Communications
            </span>
          </div>
          <div class="consent">
            <span class="${consentContact ? 'consent-yes' : 'consent-no'}">
              ${consentContact ? '✓' : '✗'} Phone/Email Contact
            </span>
          </div>
        </div>
        
        ${referralSource || additionalNotes ? `
        <div class="section">
          <h3>Additional Information</h3>
          ${referralSource ? `
          <div class="info-grid">
            <span class="label">How they heard about us:</span>
            <span>${referralSource}</span>
          </div>
          ` : ''}
          ${additionalNotes ? `
          <div style="margin-top: 15px;">
            <span class="label">Additional Notes:</span>
            <p style="margin: 10px 0; padding: 15px; background: #f9f9f9; border-left: 3px solid #C9A961; white-space: pre-wrap;">${additionalNotes}</p>
          </div>
          ` : ''}
        </div>
        ` : ''}
      </body>
    </html>
  `
}

// Send booking confirmation email to guest
export const sendGuestConfirmation = async (bookingData: BookingFormData) => {
  try {
    const transporter = createTransporter()
    
    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: bookingData.email,
      subject: "Booking Confirmation - The Golden Triangle",
      html: getGuestEmailHTML(bookingData),
    }

    const info = await transporter.sendMail(mailOptions)
    console.log("Guest confirmation email sent:", info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error("Error sending guest confirmation email:", error)
    return { success: false, error }
  }
}

// Send notification email to admin
export const sendAdminNotification = async (bookingData: BookingFormData) => {
  try {
    const transporter = createTransporter()
    
    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
      subject: `New Booking Request from ${bookingData.firstName} ${bookingData.lastName}`,
      html: getAdminEmailHTML(bookingData),
    }

    const info = await transporter.sendMail(mailOptions)
    console.log("Admin notification email sent:", info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error("Error sending admin notification email:", error)
    return { success: false, error }
  }
}
