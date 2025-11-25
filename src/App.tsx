import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { DestinationCard } from "./components/DestinationCard";
import { FeatureBlock } from "./components/FeatureBlock";
import { TestimonialCard } from "./components/TestimonialCard";
import { BlogCard } from "./components/BlogCard";
import { Button } from "./components/ui/button";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import { Compass, Headphones, DollarSign, Users, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1660315247626-12267f8d68db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9waWNhbCUyMGJlYWNoJTIwcGFyYWRpc2V8ZW58MXx8fHwxNzYzMzM3MTM2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Hero destination"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-6 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-white mb-6 text-5xl md:text-7xl tracking-tight">
              Explore the World with Us
            </h1>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
              Premium travel experiences – curated tours & adventures that transform journeys into memories
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-[var(--gold-accent)] hover:bg-[var(--gold-accent)]/90 text-white px-8 py-6">
                Browse Trips
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-[var(--charcoal)] px-8 py-6"
              >
                Contact Us
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2"
          >
            <div className="w-1 h-2 bg-white/50 rounded-full" />
          </motion.div>
        </div>
      </section>

      {/* Featured Destinations Section */}
      <section id="destinations" className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="mb-4">Featured Destinations</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Discover handpicked destinations that offer extraordinary experiences and unforgettable moments
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <DestinationCard
              image="https://images.unsplash.com/photo-1568727174680-7ae330b15345?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxkaXZlcyUyMGx1eHVyeSUyMHJlc29ydHxlbnwxfHx8fDE3NjMzNTMyMjh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              title="Maldives Luxury Escape"
              tagline="Overwater villas & crystal waters"
              price="$3,999"
            />
            <DestinationCard
              image="https://images.unsplash.com/photo-1631684181713-e697596d2165?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGFkdmVudHVyZSUyMGxhbmRzY2FwZXxlbnwxfHx8fDE3NjMzMDY0MTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              title="Alpine Adventure"
              tagline="Mountain peaks & pristine nature"
              price="$2,499"
            />
            <DestinationCard
              image="https://images.unsplash.com/photo-1712244876693-a89f6172178e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbiUyMHRlbXBsZSUyMGNoZXJyeSUyMGJsb3Nzb218ZW58MXx8fHwxNzYzMjcxMzM5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              title="Japan Cultural Journey"
              tagline="Ancient temples & modern wonders"
              price="$4,299"
            />
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="mb-4">Why Choose Wanderlux</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              We're committed to delivering exceptional travel experiences with unmatched service and attention to detail
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureBlock
              icon={Compass}
              title="Expert Guides"
              description="Local expertise and insider knowledge to enhance every moment of your journey"
            />
            <FeatureBlock
              icon={Headphones}
              title="24/7 Support"
              description="Round-the-clock assistance ensuring peace of mind throughout your travels"
            />
            <FeatureBlock
              icon={DollarSign}
              title="Best Price Guaranteed"
              description="Competitive pricing with no hidden fees and transparent booking process"
            />
            <FeatureBlock
              icon={Users}
              title="Customized Itineraries"
              description="Tailored experiences designed to match your unique preferences and dreams"
            />
          </div>
        </div>
      </section>

      {/* Signature Tour Highlight */}
      <section id="tours" className="relative h-[600px] flex items-center justify-center">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1729359035276-189519a4b072?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWZhcmklMjB3aWxkbGlmZSUyMGFmcmljYXxlbnwxfHx8fDE3NjMyODgyMjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Signature tour"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        </div>

        <div className="relative z-10 text-white px-6 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block bg-[var(--gold-accent)] text-white px-4 py-2 mb-6">
              SIGNATURE EXPERIENCE
            </div>
            <h2 className="text-white mb-4 text-4xl md:text-5xl">African Safari Expedition</h2>
            <p className="text-white/90 mb-8 leading-relaxed text-lg">
              Witness the majesty of Africa's wildlife in their natural habitat. An unforgettable 10-day journey through the Serengeti with luxury lodging and expert guides.
            </p>
            <Button size="lg" className="bg-[var(--gold-accent)] hover:bg-[var(--gold-accent)]/90 text-white px-8">
              View Tour Details
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Additional Tours Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="mb-4">More Extraordinary Tours</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <DestinationCard
              image="https://images.unsplash.com/photo-1725806760874-96040618865c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxldXJvcGVhbiUyMGNpdHklMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzYzMjY3OTg1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              title="European Grand Tour"
              tagline="Historic cities & cultural treasures"
              price="$5,299"
            />
            <DestinationCard
              image="https://images.unsplash.com/photo-1667987566780-3b31fa5485c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB0cmF2ZWwlMjBkZXN0aW5hdGlvbnxlbnwxfHx8fDE3NjMzMjc0MTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              title="Santorini Sunset Escape"
              tagline="White-washed villages & Aegean views"
              price="$3,599"
            />
            <DestinationCard
              image="https://images.unsplash.com/photo-1594639440713-171c55701c62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBibG9nZ2VyJTIwYWR2ZW50dXJlfGVufDF8fHx8MTc2MzMzODA4MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              title="Patagonia Wilderness"
              tagline="Glaciers, mountains & untamed beauty"
              price="$4,799"
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="mb-4">What Our Travelers Say</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Real stories from real adventurers who've explored the world with Wanderlux
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard
              quote="The Maldives trip was absolutely incredible. Every detail was perfectly planned and the accommodations were beyond our expectations. We'll definitely be booking with Wanderlux again!"
              name="Sarah Johnson"
              location="Los Angeles, CA"
              image="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400"
            />
            <TestimonialCard
              quote="Our African safari was the adventure of a lifetime. The guides were knowledgeable and passionate, and we saw animals we'd only dreamed of seeing. Highly recommend!"
              name="Michael Chen"
              location="Singapore"
              image="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400"
            />
            <TestimonialCard
              quote="From start to finish, Wanderlux made our European tour seamless and unforgettable. The customized itinerary perfectly matched our interests. Five stars!"
              name="Emma Rodriguez"
              location="Madrid, Spain"
              image="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400"
            />
          </div>
        </div>
      </section>

      {/* Blog Preview Section */}
      <section id="blog" className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="mb-4">Travel Stories & Inspiration</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Discover insider tips, destination guides, and inspiring stories from around the globe
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <BlogCard
              image="https://images.unsplash.com/photo-1568727174680-7ae330b15345?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxkaXZlcyUyMGx1eHVyeSUyMHJlc29ydHxlbnwxfHx8fDE3NjMzNTMyMjh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              title="10 Hidden Gems in the Maldives You Must Visit"
              excerpt="Beyond the luxury resorts, discover the secret islands and local experiences that make the Maldives truly special."
              date="November 15, 2025"
              category="Destinations"
            />
            <BlogCard
              image="https://images.unsplash.com/photo-1631684181713-e697596d2165?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGFkdmVudHVyZSUyMGxhbmRzY2FwZXxlbnwxfHx8fDE3NjMzMDY0MTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              title="Essential Packing Guide for Mountain Adventures"
              excerpt="From base layers to summit gear, here's everything you need to pack for your next alpine expedition."
              date="November 10, 2025"
              category="Travel Tips"
            />
            <BlogCard
              image="https://images.unsplash.com/photo-1712244876693-a89f6172178e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbiUyMHRlbXBsZSUyMGNoZXJyeSUyMGJsb3Nzb218ZW58MXx8fHwxNzYzMjcxMzM5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              title="Cherry Blossom Season in Japan: A Complete Guide"
              excerpt="Plan your perfect sakura viewing experience with our comprehensive guide to Japan's most beautiful spring season."
              date="November 5, 2025"
              category="Culture"
            />
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="border-[var(--charcoal)] text-[var(--charcoal)] hover:bg-[var(--charcoal)] hover:text-white">
              View All Articles
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section id="contact" className="relative py-32 bg-[var(--charcoal)]">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-white mb-6 text-4xl md:text-5xl">Start Your Adventure Today</h2>
            <p className="text-white/80 mb-8 text-lg leading-relaxed">
              Let our travel advisors craft the perfect journey tailored to your dreams. Your next unforgettable experience is just a conversation away.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-[var(--gold-accent)] hover:bg-[var(--gold-accent)]/90 text-white px-8 py-6">
                Contact Our Travel Advisor
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-[var(--charcoal)] px-8 py-6"
              >
                Browse All Destinations
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
