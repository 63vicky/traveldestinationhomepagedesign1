import type { LucideIcon } from "lucide-react"

interface FeatureBlockProps {
  icon: LucideIcon
  title: string
  description: string
}

export function FeatureBlock({ icon: Icon, title, description }: FeatureBlockProps) {
  return (
    <div className="text-center">
      <Icon className="w-12 h-12 text-[var(--gold)] mx-auto mb-4" />
      <h3 className="mb-3 text-[var(--cream)]">{title}</h3>
      <p className="text-[var(--text-light)] text-sm">{description}</p>
    </div>
  )
}
