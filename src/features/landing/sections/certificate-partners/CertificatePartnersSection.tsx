'use client';

import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ShieldCheck } from "lucide-react";

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
    <section className="overflow-hidden bg-white py-20 dark:bg-neutral-950">
      <Container size="xl">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-14 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-4 py-2 text-sm font-medium text-primary">
            <ShieldCheck className="h-4 w-4" />
            Trusted certificate ecosystem
          </div>

          <Header
            title="Backed By Trusted Certificate Partners"
            subline="The certification path is designed to feel credible, career-relevant, and easier to showcase beyond the course itself."
          />

        </motion.div>

        <motion.div
          ref={ref}
          className="
            mx-auto grid max-w-4xl gap-5 sm:grid-cols-2
          "
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
