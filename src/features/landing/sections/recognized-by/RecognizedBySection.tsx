
import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {  ShieldCheck } from "lucide-react";

import Header from "@/components/common/Header";
import Container from "@/layouts/Container";
import { recognizedPartners } from "@/data/recognized";

import RecognizedLogo from "./components/RecognizedLogo";
import { containerVariants } from "./animations";

export default function RecognizedBySection() {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });


  useEffect(() => {
    if (inView) controls.start("visible");
  }, [controls, inView]);

  return (
    <section className="overflow-hidden bg-white py-20 dark:bg-neutral-950">
      <Container size="xl">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mb-14 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-4 py-2 text-sm font-medium text-primary">
            <ShieldCheck className="h-4 w-4" />
            Recognition and trust
          </div>

          <Header
            title="Recognized By Institutions That Build Trust"
            subline="These recognitions help reinforce SkillHigh as a credible learning platform with stronger external validation."
          />

 
        </motion.div>

        <motion.div
          ref={ref}
          className="
            mx-auto grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4
          "
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {recognizedPartners.map((partner) => (
            <RecognizedLogo
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
