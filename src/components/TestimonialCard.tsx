import { Star } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface TestimonialCardProps {
  quote: string;
  name: string;
  location: string;
  image: string;
  rating?: number;
}

export function TestimonialCard({ quote, name, location, image, rating = 5 }: TestimonialCardProps) {
  return (
    <div className="bg-white p-8 border border-border">
      {/* Rating */}
      <div className="flex gap-1 mb-4">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} className="w-5 h-5 fill-[var(--gold-accent)] text-[var(--gold-accent)]" />
        ))}
      </div>

      {/* Quote */}
      <p className="text-[var(--charcoal)] mb-6 italic leading-relaxed">"{quote}"</p>

      {/* Author */}
      <div className="flex items-center gap-4">
        <ImageWithFallback
          src={image}
          alt={name}
          className="w-14 h-14 rounded-full object-cover"
        />
        <div>
          <p className="text-[var(--charcoal)]">{name}</p>
          <p className="text-muted-foreground">{location}</p>
        </div>
      </div>
    </div>
  );
}
