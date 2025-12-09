'use client'

import { useState } from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import Header from "./common/Header";

import QuestinIcon from './icons/QuestionIcon'; import { QuestinIcon2 } from './icons/QuestionIcon';
import { useFaqStore } from '@/store/useFaqs';
import type { FAQ } from '@/types/faq';

export default function FAQ() {
  const faq = useFaqStore((state) => state.faq);
  const shouldReduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const toggle = (index: number) => setActiveIndex(index === activeIndex ? null : index);

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const faqVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: shouldReduceMotion ? 0 : i * 0.08,
        duration: 0.5,
        ease: [0.42, 0, 0.58, 1], // smooth easeInOut
      },
    }),
  };

  const answerVariants: Variants = {
    hidden: { opacity: 0, height: 0, marginTop: 0 },
    visible: {
      opacity: 1,
      height: 'auto',
      marginTop: 8,
      transition: { duration: 0.35, ease: 'easeOut' },
    },
  };

  return (
    <section className="relative bg-neutral-950 bg-pixel-crt py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Floating Icons */}
      <motion.div
        className="absolute top-12 right-12"
        animate={{ rotate: [0, 10, -10, 0], y: [0, -5, 5, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
      >
        <QuestinIcon className="w-14 h-14 opacity-70" />
      </motion.div>
      <motion.div
        className="absolute bottom-12 left-12"
        animate={{ rotate: [0, -10, 10, 0], y: [0, 5, -5, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
      >
        <QuestinIcon2 className="w-14 h-14 opacity-70" />
      </motion.div>

      <div className="max-w-5xl mx-auto">
        <Header
          title="Frequently Asked Questions"
          subline="Answers to common questions about SkillHigh programs."
        />

        <motion.div
          className="space-y-4"
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          viewport={{ once: true }}
        >
          {(faq as FAQ[]).map((item, index) => (
            <motion.div
              key={index}
              className="rounded-xl bg-neutral-800 pixel-border shadow-[4px_4px_0_#000] hover:shadow-[6px_6px_0_#000] transition-all"
              custom={index}
              variants={faqVariants}
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center px-6 py-4 text-left text-sm md:text-lg text-white cursor-pointer hover:bg-neutral-700 transition-colors rounded-t-xl"
                aria-expanded={activeIndex === index}
              >
                <span>{item.question}</span>
                <motion.span
                  className="text-xl"
                  animate={{ rotate: activeIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  {activeIndex === index ? '−' : '+'}
                </motion.span>
              </button>

              <motion.div
                variants={answerVariants}
                initial="hidden"
                animate={activeIndex === index ? 'visible' : 'hidden'}
                className="px-6 pb-4 text-gray-300 text-base font-bricolage overflow-hidden"
              >
                {item.answer}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
