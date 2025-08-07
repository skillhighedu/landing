import { useState } from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { faqList } from '@/data/faq';
import Header from './Header';
import QuestinIcon from './icons/QuestionIcon';
import { QuestinIcon2 } from './icons/QuestionIcon';

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ() {
  const shouldReduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const toggle = (index: number) => setActiveIndex(index === activeIndex ? null : index);

  const faqVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: shouldReduceMotion ? 0 : i * 0.1,
        duration: 0.4,
        ease: 'easeOut',
      },
    }),
  };

  const answerVariants: Variants = {
    hidden: { opacity: 0, height: 0, scaleY: 0.95 },
    visible: {
      opacity: 1,
      height: 'auto',
      scaleY: 1,
      transition: { duration: 0.3, ease: 'easeOut', when: 'beforeChildren' },
    },
    exit: {
      opacity: 0,
      height: 0,
      scaleY: 0.95,
      transition: { duration: 0.25, ease: 'easeInOut' },
    },
  };

  return (
    <section className="relative bg-neutral-950 bg-pixel-crt py-16 px-4 sm:px-6 lg:px-8">
      {/* Floating icons */}
      <motion.div
        className="absolute top-10 right-10"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0, rotate: 15 }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        viewport={{ once: true }}
      >
        <QuestinIcon className="w-12 h-12 opacity-70" />
      </motion.div>

      <motion.div
        className="absolute bottom-10 left-10"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0, rotate: -10 }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        viewport={{ once: true }}
      >
        <QuestinIcon2 className="w-12 h-12 opacity-70" />
      </motion.div>

      <div className="max-w-5xl mx-auto">
        <Header title="Frequently Asked Questions" />
        <motion.p
          className=" text-center  text-sm md:text-lg md:text-left font-mono text-gray-300 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          Answers to common questions about SkillHigh programs. Still need help?{' '}
          <a
            href="https://skillhigh.com/support"
            className="text-primary underline hover:text-teal-300"
          >
            Contact us
          </a>
        </motion.p>

        <div className="space-y-4">
          {(faqList as FAQItem[]).map((faq, index) => (
            <motion.div
              key={index}
              className=" rounded-xl bg-neutral-800 pixel-border shadow-[4px_4px_0_#000] hover:shadow-[6px_6px_0_#000]-800 "
              custom={index}
              variants={faqVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center px-6 py-4 text-left text-sm md:text-lg text-white "
                aria-expanded={activeIndex === index}
              >
                <span>{faq.question}</span>
                <motion.span
                  className="text-xl"
                  animate={{ rotate: activeIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {activeIndex === index ? '−' : '+'}
                </motion.span>
              </button>

              <motion.div
                variants={answerVariants}
                initial="hidden"
                animate={activeIndex === index ? 'visible' : 'hidden'}
                exit="exit"
                className="px-6 pb-4 text-gray-300 text-base font-mono"
              >
                {faq.answer}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
