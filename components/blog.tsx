import { BlogCard } from "./blog-card"

const blogs = [
  {
    id: 1,
    title: "10 Hidden Gems in the Maldives You Must Visit",
    excerpt: "Beyond the luxury resorts, discover the secret islands and local experiences.",
    date: "November 15, 2025",
    category: "Destinations",
    image:
      "https://images.unsplash.com/photo-1568727174680-7ae330b15345?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    id: 2,
    title: "Essential Packing Guide for Mountain Adventures",
    excerpt: "From base layers to summit gear, here's everything you need to pack.",
    date: "November 10, 2025",
    category: "Travel Tips",
    image:
      "https://images.unsplash.com/photo-1631684181713-e697596d2165?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    id: 3,
    title: "Cherry Blossom Season in Japan: A Complete Guide",
    excerpt: "Plan your perfect sakura viewing experience with our comprehensive guide.",
    date: "November 5, 2025",
    category: "Culture",
    image:
      "https://images.unsplash.com/photo-1712244876693-a89f6172178e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
]

export function Blog() {
  return (
    <section id="blog" className="py-24 bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="mb-4">Travel Stories & Inspiration</h2>
          <p className="text-[var(--text-light)] max-w-2xl mx-auto">
            Discover insider tips, destination guides, and inspiring stories from around the globe
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} {...blog} />
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="px-8 py-3 border-2 border-[var(--charcoal)] text-[var(--charcoal)] rounded hover:bg-[var(--charcoal)] hover:text-white transition-all">
            View All Articles
          </button>
        </div>
      </div>
    </section>
  )
}
