import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { FeaturedDestinations } from "@/components/featured-destinations"
import { WhyChooseUs } from "@/components/why-choose-us"
import { SignatureTour } from "@/components/signature-tour"
import { MoreTours } from "@/components/more-tours"
import { Testimonials } from "@/components/testimonials"
import { Blog } from "@/components/blog"
import { CTA } from "@/components/cta"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <FeaturedDestinations />
      <WhyChooseUs />
      <SignatureTour />
      <MoreTours />
      <Testimonials />
      <Blog />
      <CTA />
      <Footer />
    </div>
  )
}
