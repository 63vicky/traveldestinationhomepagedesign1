import { Star } from "lucide-react"

interface TestimonialCardProps {
  quote: string
  name: string
  location: string
  image: string
}

export function TestimonialCard({ quote, name, location, image }: TestimonialCardProps) {
  return (
    <div className="bg-white p-8 rounded-lg shadow-sm border border-[var(--border-light)]">
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={16} className="fill-[var(--gold-accent)] text-[var(--gold-accent)]" />
        ))}
      </div>
      <p className="text-[var(--text-light)] mb-6 italic">"{quote}"</p>
      <div className="flex items-center gap-4">
        <img src={image || "/placeholder.svg"} alt={name} className="w-12 h-12 rounded-full object-cover" />
        <div>
          <p className="font-semibold text-[var(--charcoal)]">{name}</p>
          <p className="text-sm text-[var(--text-light)]">{location}</p>
        </div>
      </div>
    </div>
  )
}
