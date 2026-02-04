'use client';

import { motion } from "framer-motion";
import Header from "@/components/common/Header";
import Container from "@/layouts/Container";
import { DotPatternLinearGradient } from "@/components/ui/DotBg";
import BenefitCard from "./components/BenefitCard";
import { benefits } from "./data";
import { containerVariants } from "./animations";

export default function BenefitsSection() {
  return (
    <section
      className="
        relative py-20 overflow-hidden
        bg-neutral-50 text-neutral-900
        dark:bg-neutral-950 dark:text-white
      "
    >
      <DotPatternLinearGradient />

      <Container size="full">
        <div className="text-center mb-14">
          <Header
            title="What You Gain from SkillHigh"
            subline="More than just videos — a complete learning experience."
          />
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {benefits.map((benefit) => (
            <BenefitCard key={benefit.title} benefit={benefit} />
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
