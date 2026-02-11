"use client";

import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

import Header from "@/components/common/Header";
import Container from "@/layouts/Container";
import { recognizedPartners } from "@/data/recognized";

import RecognizedLogo from "./components/RecognizedLogo";
import { containerVariants } from "./animations";

export default function RecognizedBySection() {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [controls, inView]);

  return (
    <section className="bg-white dark:bg-neutral-950 py-14 sm:py-16 lg:py-20 overflow-hidden">
      <Container size="xl">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: -12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="text-center mb-10 sm:mb-12 lg:mb-14"
        >
          <Header
            title="Recognized By"
            subline="Trusted and acknowledged by leading organizations."
          />
        </motion.div>

        {/* Logos */}
        <motion.div
          className="
            grid
            grid-cols-2
            sm:grid-cols-3
            md:grid-cols-4
            lg:grid-cols-5
            xl:grid-cols-6
            gap-x-10 gap-y-8
            auto-rows-fr           /* important: equal card height */
          "
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {recognizedPartners.map((partner) => (
            <div key={partner.id} className="h-full">
              <RecognizedLogo
                logo={partner.logo}
                alt={partner.alt}
              />
            </div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
