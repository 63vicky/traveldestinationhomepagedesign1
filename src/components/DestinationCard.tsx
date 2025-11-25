import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface DestinationCardProps {
  image: string;
  title: string;
  tagline: string;
  price?: string;
}

export function DestinationCard({ image, title, tagline, price }: DestinationCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group relative overflow-hidden cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <ImageWithFallback
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
        
        {/* Content Overlay */}
        <div className="absolute inset-0 p-8 flex flex-col justify-end">
          <div className="transform transition-transform duration-300 group-hover:translate-y-[-8px]">
            <h3 className="text-white mb-2">{title}</h3>
            <p className="text-white/90 mb-4">{tagline}</p>
            {price && (
              <p className="text-[var(--gold-accent)] mb-4">From {price}</p>
            )}
            <div className="flex items-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="mr-2">View Details</span>
              <ArrowRight size={18} />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
