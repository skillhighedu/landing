"use client";

import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

import Header from "@/components/common/Header";
import Container from "@/layouts/Container";
import { certificatePartners } from "@/data/certificatePartners";

import PartnerLogo from "./components/PartnerLogo";
import { containerVariants } from "./animations";

export default function CertificatePartnersSection() {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [controls, inView]);

  return (
    <section className="bg-background text-foreground py-20 overflow-hidden">
      <Container size="xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-14"
        >
          <Header
            title="Our Certificate Partners"
            subline="Trusted certifications that validate real-world skills."
          />
        </motion.div>

        {/* Logos */}
        <motion.div
          ref={ref}
          className="flex flex-wrap items-center justify-center gap-8 sm:gap-10"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {certificatePartners.map((partner) => (
            <PartnerLogo
              key={partner.id}
              logo={partner.logo}
              alt={partner.alt}
            />
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
