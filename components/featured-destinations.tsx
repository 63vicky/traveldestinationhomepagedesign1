"use client";

import { motion } from "framer-motion";
import { DestinationCard } from "./destination-card";
import Link from "next/link";

const destinations = [
  {
    id: "1",
    title: "Delhi",
    tagline: "Ancient temples & Mughal grandeur",
    price: "$1,299",
    image:
      "https://images.unsplash.com/photo-1597040663342-45b6af3d91a5?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "2",
    title: "Agra & Taj Mahal",
    tagline: "Monument to eternal love",
    price: "$1,599",
    image:
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
  },
  {
    id: "3",
    title: "Jaipur",
    tagline: "The Pink City's royal palaces",
    price: "$1,399",
    image:
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

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
  return (
    <section
      id="destinations"
      className="py-16 sm:py-20 md:py-24 bg-[var(--burgundy)]"
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
            className="mb-4 sm:mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-[var(--cream)]"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Journeys Through Time
          </h2>
          <p
            className="text-[var(--text-light)] max-w-2xl mx-auto text-base sm:text-lg md:text-xl leading-relaxed font-light px-4 sm:px-0"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Wander through Delhi's living history, behold the eternal romance of
            the Taj Mahal, and lose yourself in Jaipur's royal mystique
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {destinations.map((dest, index) => (
            <motion.div key={dest.id} variants={itemVariants}>
              <Link href={`/destinations/${dest.id}`}>
                <DestinationCard {...dest} />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
