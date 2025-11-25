import { Calendar, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface BlogCardProps {
  image: string;
  title: string;
  excerpt: string;
  date: string;
  category?: string;
}

export function BlogCard({ image, title, excerpt, date, category }: BlogCardProps) {
  return (
    <div className="group cursor-pointer">
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden mb-6">
        <ImageWithFallback
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {category && (
          <div className="absolute top-4 left-4 bg-[var(--gold-accent)] text-white px-4 py-1">
            {category}
          </div>
        )}
      </div>

      {/* Content */}
      <div>
        <div className="flex items-center gap-2 text-muted-foreground mb-3">
          <Calendar size={16} />
          <span>{date}</span>
        </div>
        <h3 className="mb-3 group-hover:text-[var(--gold-accent)] transition-colors duration-200">
          {title}
        </h3>
        <p className="text-muted-foreground mb-4 leading-relaxed">{excerpt}</p>
        <div className="flex items-center text-[var(--gold-accent)] group-hover:gap-2 transition-all duration-200">
          <span>Read More</span>
          <ArrowRight size={18} className="ml-1" />
        </div>
      </div>
    </div>
  );
}
