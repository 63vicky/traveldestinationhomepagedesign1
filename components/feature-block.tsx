import type { LucideIcon } from "lucide-react"

interface FeatureBlockProps {
  icon: LucideIcon
  title: string
  description: string
}

export function FeatureBlock({ icon: Icon, title, description }: FeatureBlockProps) {
  return (
    <div className="text-center">
      <Icon className="w-14 h-14 text-[var(--gold)] mx-auto mb-6" strokeWidth={1.5} />
      <h3 className="mb-4 text-[var(--cream)] text-xl font-normal tracking-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
        {title}
      </h3>
      <p className="text-[var(--text-light)] text-base leading-relaxed font-light" style={{ fontFamily: 'var(--font-inter)' }}>
        {description}
      </p>
    </div>
  )
}
