
import { motion, useReducedMotion,type Variants } from 'framer-motion';
import { faqList } from '@/data/faq';
import { useState } from 'react';
import Header from './Header';

// Define FAQ item interface for type safety
interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ() {
  const shouldReduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Animation variants for FAQ items
  const faqVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut' as const,
        delay: shouldReduceMotion ? 0 : i * 0.2,
      },
    }),
  };

  // Animation variants for FAQ answer
  const answerVariants: Variants = {
    hidden: { opacity: 0, height: 0, marginTop: 0 },
    visible: {
      opacity: 1,
      height: 'auto',
      marginTop: 16,
      transition: {
        duration: 0.3,
        ease: 'easeOut' as const,
        when: 'beforeChildren',
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      marginTop: 0,
      transition: {
        duration: 0.3,
        ease: 'easeOut' as const,
      },
    },
  };

  return (
    <section
      className="bg-neutral-950 py-16 px-4 sm:px-6 lg:px-8 rounded-t-4xl"
      aria-label="Frequently Asked Questions"
    >
      <div className="max-w-6xl mx-auto">
      
       <Header title=' Frequently Asked Questions'/>
        <motion.p
          className="text-lg text-gray-300 mb-8 font-mono"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' as const, delay: 0.2 }}
          
        >
          Find answers to common questions about SkillHigh’s industry-ready training programs. Can’t find what you’re looking for?{' '}
          <a
            href="https://skillhigh.com/support"
            className="text-primary hover:text-teal-300 underline transition-colors duration-200"
            aria-label="Contact SkillHigh support team"
          >
            Contact our support team
          </a>
        </motion.p>
        <div className="space-y-4">
          {(faqList as FAQItem[]).map((faq, index) => (
            <motion.div
              key={index}
              className=" rounded-lg bg-neutral-800/50 shadow-lg  transition-colors duration-300"
              variants={faqVariants}
              custom={index}
              initial="hidden"
              animate="visible"
            >
              <button
                className="w-full flex justify-between items-center px-6 py-4 text-left text-lg font-medium text-white cursor-pointer transition-colors duration-200 focus:outline-none "
                onClick={() => toggle(index)}
                aria-expanded={activeIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span>{faq.question}</span>
                <motion.span
                  className="text-xl"
                  animate={{ rotate: activeIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' as const }}
                >
                  {activeIndex === index ? '−' : '+'}
                </motion.span>
              </button>
              <motion.div
                id={`faq-answer-${index}`}
                variants={answerVariants}
                initial="hidden"
                animate={activeIndex === index ? 'visible' : 'hidden'}
                exit="exit"
                className="px-6 pb-4 text-gray-300 font-sans"
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
