# Travel Website - Features & Setup Guide

## Project Overview
A premium travel website with full admin panel and MongoDB integration featuring testimonial and tour carousels, built with Next.js 16, React, and TailwindCSS.

## Color Scheme
- **Primary**: Burgundy (#6b3e36)
- **Accent**: Gold (#d4af37)
- **Text**: Cream (#f5f1e8)
- **Luxury aesthetic** with warm, inviting tones

## Core Features Implemented

### Frontend Features
1. **Responsive Homepage**
   - Hero section with call-to-action
   - Featured destinations grid
   - Why Choose Us feature blocks
   - Signature tour highlight
   - Dynamic testimonials with carousel
   - Blog section
   - Newsletter subscription

2. **Smart Carousels**
   - **Testimonials**: Grid for ≤3 testimonials, fancy carousel for >3
   - **More Tours**: Grid for ≤3 tours, carousel for >3
   - Auto-rotating with manual navigation (arrows + dots)
   - Pause on interaction, smooth transitions
   - Mobile responsive

3. **Dynamic Data Loading**
   - Testimonials fetch from `/api/testimonials`
   - Tours fetch from `/api/tours`
   - Destinations fetch from `/api/destinations`
   - All data stored in MongoDB Atlas

### Admin Dashboard Features
- **Destinations Management**: Create, edit, delete destinations
- **Tours Management**: Create, edit, delete tours with featured flag
- **Testimonials Management**: Manage reviews with star ratings, toggle featured status
- **Bookings Dashboard**: View all booking inquiries
- **Settings Panel**: Site-wide configurations

### Database Models
\`\`\`
Destination: {
  title, tagline, price, description, image, 
  category, duration, highlights, isActive
}

Tour: {
  title, slug, tagline, description, price, currency,
  image, destination (ref), duration, highlights, 
  featured, isActive
}

Testimonial: {
  quote, name, location, image, rating, featured
}

Blog: {
  title, slug, excerpt, content, image, category,
  tags, published, publishedAt
}

Booking: {
  destinationId (ref), guestName, guestEmail, guestPhone,
  startDate, endDate, numberOfGuests, totalPrice,
  status, specialRequests
}
\`\`\`

## API Routes

### Destinations
- `GET /api/destinations` - Get all active destinations
- `POST /api/destinations` - Create destination (admin)
- `GET /api/destinations/[id]` - Get specific destination
- `PUT /api/destinations/[id]` - Update destination (admin)
- `DELETE /api/destinations/[id]` - Delete destination (admin)

### Tours
- `GET /api/tours?featured=true` - Get featured or all tours
- `POST /api/tours` - Create tour (admin)
- `GET /api/tours/[id]` - Get specific tour
- `PUT /api/tours/[id]` - Update tour (admin)
- `DELETE /api/tours/[id]` - Delete tour (admin)

### Testimonials
- `GET /api/testimonials?featured=true` - Get featured or all testimonials
- `POST /api/testimonials` - Create testimonial (admin)
- `PUT /api/testimonials/[id]` - Update testimonial (admin)
- `DELETE /api/testimonials/[id]` - Delete testimonial (admin)

### Blogs
- `GET /api/blogs?published=true` - Get published or all blogs
- `POST /api/blogs` - Create blog post (admin)
- `GET /api/blogs/[id]` - Get specific blog
- `PUT /api/blogs/[id]` - Update blog (admin)
- `DELETE /api/blogs/[id]` - Delete blog (admin)

### Bookings
- `GET /api/bookings` - Get all bookings (admin)
- `POST /api/bookings` - Create booking (public)

## Setup Instructions

### 1. Environment Variables
Add to `.env.local`:
\`\`\`
MONGODB_URI=mongodb+srv://63Vicky:1F8gMwM6NaO2QfxK@cluster0.n1eikph.mongodb.net/travel_website?retryWrites=true&w=majority
\`\`\`

### 2. MongoDB Atlas Setup
1. Ensure MongoDB Atlas cluster is accessible
2. Database name: `travel_website`
3. Collections will auto-create on first API call

### 3. Admin Access
- Admin page: `/admin`
- Navigate tabs: Destinations, Bookings, Tours, Testimonials, Settings

### 4. Adding Content
**Via Admin Dashboard:**
- Go to `/admin/destinations` to add destinations
- Go to `/admin/tours` to add tours
- Go to `/admin/testimonials` to add testimonials
- Toggle featured flag for carousel display

**Via API (curl example):**
\`\`\`bash
curl -X POST http://localhost:3000/api/tours \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Golden Triangle Tour",
    "tagline": "Iconic India Experience",
    "price": 2499,
    "currency": "USD",
    "duration": 7,
    "featured": true,
    "image": "https://example.com/image.jpg"
  }'
\`\`\`

## Component Structure
- `carousel.tsx` - Reusable carousel component
- `testimonials.tsx` - Testimonials with smart carousel
- `more-tours.tsx` - Tours with smart carousel
- `destination-card.tsx` - Individual card component
- `admin-layout.tsx` - Admin dashboard layout
- Admin pages: `/app/admin/[destinations|tours|testimonials]/page.tsx`

## Deployment to Vercel
1. Connect GitHub repository
2. Add MongoDB URI to Vercel environment variables
3. Deploy - all API routes and components ready
4. Access admin at `https://yourdomain.com/admin`

## Features Highlights
✓ Luxury travel aesthetic with burgundy & gold theme
✓ Fancy auto-rotating carousels with manual controls
✓ Smart grid-to-carousel switching (>3 items)
✓ Full CRUD operations for all content
✓ MongoDB integration with proper models
✓ Admin dashboard with intuitive UI
✓ Mobile responsive design
✓ Real-time data fetching
✓ Professional animations with Framer Motion
✓ Clean, maintainable component structure
