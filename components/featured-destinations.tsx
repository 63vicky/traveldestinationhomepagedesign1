"use client";

import { motion } from "framer-motion";
import { DestinationCard } from "./destination-card";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Carousel } from "./carousel";

interface Destination {
  _id: string;
  title: string;
  tagline: string;
  price: string;
  image: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

export function FeaturedDestinations() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await fetch("/api/destinations");
        const data = await response.json();
        // Take only first 3 for featured
        setDestinations(data.slice(0, 3));
      } catch (error) {
        console.error("Failed to fetch destinations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  if (loading) {
    return (
      <section className="py-24 bg-[var(--cream)]">
        <div className="container-custom text-center">
          <p className="text-[var(--burgundy)]">Loading exclusive journeys...</p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="destinations"
      className="py-16 sm:py-20 md:py-24 bg-[var(--cream)]"
    >
      <div className="container-custom">
        <motion.div
          className="text-center mb-12 sm:mb-16 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2
            className="mb-4 sm:mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-[var(--burgundy)]"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Journeys Through Time
          </h2>
          <p
            className="text-[var(--charcoal-light)] max-w-2xl mx-auto text-base sm:text-lg md:text-xl leading-relaxed font-light px-4 sm:px-0"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Wander through Delhi's living history, behold the eternal romance of
            the Taj Mahal, and lose yourself in Jaipur's royal mystique
          </p>
        </motion.div>

        <div className="relative">
          <Carousel
            items={destinations}
            renderItem={(dest: Destination) => (
              <Link href={`/destinations/${dest._id}`}>
                <DestinationCard {...dest} />
              </Link>
            )}
            autoplay={true}
            autoplayInterval={5000}
            itemsPerView={{ mobile: 1, tablet: 2, desktop: 3 }}
          />
        </div>
      </div>
    </section>
  );
}
