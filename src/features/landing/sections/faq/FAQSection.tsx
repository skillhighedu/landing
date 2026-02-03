'use client';

import Header from "@/components/common/Header";
import FAQDecorations from "./components/FAQDecorations";
import FAQList from "./components/FAQList";
import { useFAQ } from "./hooks/useFAQ";
import { useFAQAccordion } from "./hooks/useFAQAccordion";
import Container from "@/layouts/Container";

export default function FAQSection() {
  const faq = useFAQ();
  const { activeIndex, toggle } = useFAQAccordion();

  return (
    <section className="relative bg-white dark:bg-neutral-950 py-20 overflow-hidden">
      {/* Full-width decorations */}
      <FAQDecorations />

      {/* Content container */}
      <Container size="xl">
        <Header
          title="Frequently Asked Questions"
          subline="Answers to common questions about SkillHigh programs."
        />

        <FAQList
          items={faq}
          activeIndex={activeIndex}
          toggle={toggle}
        />
      </Container>
    </section>
  );
}
