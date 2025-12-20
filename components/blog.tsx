"use client"

import { BlogCard } from "./blog-card"
import { Carousel } from "./carousel"

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
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="blog" className="py-16 sm:py-20 md:py-24 bg-[var(--cream)]">
      <div className="container-custom">
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <h2 className="mb-4 sm:mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-[var(--burgundy)]" style={{ fontFamily: 'var(--font-playfair)' }}>
            Travel Stories & Inspiration
          </h2>
          <p className="text-[var(--text-muted)] max-w-2xl mx-auto text-base sm:text-lg md:text-xl leading-relaxed font-light px-4 sm:px-0" style={{ fontFamily: 'var(--font-inter)' }}>
            Discover insider tips, destination guides, and inspiring stories from around the globe
          </p>
        </div>

        <div className="relative">
          <Carousel
            items={blogs}
            renderItem={(blog) => (
              <BlogCard {...blog} />
            )}
            autoplay={true}
            autoplayInterval={6000}
            itemsPerView={{ mobile: 1, tablet: 2, desktop: 3 }}
          />
        </div>

        <div className="text-center mt-16">
          <button 
            className="px-8 py-4 border-2 border-[var(--burgundy)] text-[var(--burgundy)] rounded-md hover:bg-[var(--burgundy)] hover:text-[var(--cream)] transition-all duration-300 font-medium tracking-wide uppercase text-sm" 
            style={{ fontFamily: 'var(--font-inter)' }}
            onClick={() => scrollToSection('blog')}
          >
            View All Articles
          </button>
        </div>
      </div>
    </section>
  )
}
