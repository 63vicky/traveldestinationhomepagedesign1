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
    <section id="why-us" className="py-24 bg-[var(--burgundy)]">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="mb-4 text-[var(--cream)]">Why Choose This Journey</h2>
          <p className="text-[var(--text-light)] max-w-2xl mx-auto">
            A seamless blend of culture, heritage, and wilderness – India's essence in one journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, i) => (
            <FeatureBlock key={i} {...feature} />
          ))}
        </div>
      </div>
    </section>
  )
}
