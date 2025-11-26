interface BlogCardProps {
  title: string
  excerpt: string
  date: string
  category: string
  image: string
}

export function BlogCard({ title, excerpt, date, category, image }: BlogCardProps) {
  return (
    <div className="group cursor-pointer">
      <div className="relative aspect-video overflow-hidden rounded-lg mb-4">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="inline-block px-3 py-1 bg-[var(--gold)] text-[var(--burgundy)] text-xs rounded mb-3 font-semibold">{category}</div>
      <h3 className="text-lg font-semibold text-[var(--burgundy)] mb-2 group-hover:text-[var(--gold-accent)] transition-colors">
        {title}
      </h3>
      <p className="text-[var(--text-muted)] text-sm mb-4">{excerpt}</p>
      <p className="text-xs text-[var(--text-muted)]">{date}</p>
    </div>
  )
}
