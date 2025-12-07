import { Heart, MapPin, Users, Crown } from "lucide-react"
import { FeatureBlock } from "./feature-block"

const features = [
  {
    icon: Heart,
    title: "Luxury & Comfort",
    description: "Handpicked luxury accommodations and best-in-class experiences throughout your journey",
  },
  {
    icon: MapPin,
    title: "Immersive Experiences",
    description: "Private cooking classes, heritage workshops, and authentic cultural encounters",
  },
  {
    icon: Users,
    title: "Expert Guides",
    description: "Knowledgeable naturalists and guides to enrich your exploration with insight and passion",
  },
  {
    icon: Crown,
    title: "Exclusive Adventures",
    description: "Private horse rides, camel safaris, and elephant interactions in their natural habitats",
  },
]

export function WhyChooseUs() {
  return (
    <section id="why-us" className="py-16 sm:py-20 md:py-24 bg-[var(--burgundy)]">
      <div className="container-custom">
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <h2 className="mb-4 sm:mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-[var(--cream)]" style={{ fontFamily: 'var(--font-playfair)' }}>
            Why Choose This Journey
          </h2>
          <p className="text-[var(--text-light)] max-w-2xl mx-auto text-base sm:text-lg md:text-xl leading-relaxed font-light px-4 sm:px-0" style={{ fontFamily: 'var(--font-inter)' }}>
            A seamless blend of culture, heritage, and wilderness – India's essence in one journey
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((feature, i) => (
            <FeatureBlock key={i} {...feature} />
          ))}
        </div>
      </div>
    </section>
  )
}
