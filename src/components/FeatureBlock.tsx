import { LucideIcon } from "lucide-react";

interface FeatureBlockProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function FeatureBlock({ icon: Icon, title, description }: FeatureBlockProps) {
  return (
    <div className="text-center p-8">
      <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-[var(--gold-accent)]/10">
        <Icon className="w-8 h-8 text-[var(--gold-accent)]" />
      </div>
      <h3 className="mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}
