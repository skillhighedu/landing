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
    <section className="relative overflow-hidden bg-white py-20 dark:bg-neutral-950 sm:py-24">
      {/* Full-width decorations */}
      <FAQDecorations />

      {/* Content container */}
      <Container size="xl">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start lg:gap-14">
          <div className="lg:sticky lg:top-28">
            <Header
              title="Frequently Asked Questions"
              subline="Answers to common questions about SkillHigh programs."
            />

            <div className="mt-8 rounded-[28px] border border-neutral-200 bg-neutral-50 p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900/70">
              <p className="text-xs  uppercase tracking-[0.22em] text-primary">
                Quick Help
              </p>
              <h3 className="mt-3 text-xl font-semibold text-neutral-900 dark:text-white">
                Still unsure where to start?
              </h3>
              <p className="mt-3 text-sm font-mono leading-6 text-neutral-600 dark:text-neutral-400">
                Browse the common questions first. If you still need help, our team can guide you based on your goals, course fit, and current learning stage.
              </p>
            </div>
          </div>

          <FAQList
            items={faq}
            activeIndex={activeIndex}
            toggle={toggle}
          />
        </div>
      </Container>
    </section>
  );
}
