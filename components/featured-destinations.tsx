import { DestinationCard } from "./destination-card"
import Link from "next/link"

const destinations = [
  {
    id: 1,
    title: "Delhi",
    tagline: "Ancient temples & Mughal grandeur",
    price: "$1,299",
    image:
      "https://images.unsplash.com/photo-1608848461950-0fed8e1681a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
  },
  {
    id: 2,
    title: "Agra & Taj Mahal",
    tagline: "Monument to eternal love",
    price: "$1,599",
    image:
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
  },
  {
    id: 3,
    title: "Jaipur",
    tagline: "The Pink City's royal palaces",
    price: "$1,399",
    image:
      "https://images.unsplash.com/photo-1599722173432-b55f3cb1d3ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
  },
]

export function FeaturedDestinations() {
  return (
    <section id="destinations" className="py-16 sm:py-20 md:py-24 bg-[var(--burgundy)]">
      <div className="container-custom">
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <h2 className="mb-4 sm:mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-[var(--cream)]" style={{ fontFamily: 'var(--font-playfair)' }}>
            Journeys Through Time
          </h2>
          <p className="text-[var(--text-light)] max-w-2xl mx-auto text-base sm:text-lg md:text-xl leading-relaxed font-light px-4 sm:px-0" style={{ fontFamily: 'var(--font-inter)' }}>
            Wander through Delhi's living history, behold the eternal romance of the Taj Mahal, and lose yourself in
            Jaipur's royal mystique
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {destinations.map((dest) => (
            <Link key={dest.id} href={`/destinations/${dest.id}`}>
              <DestinationCard {...dest} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
