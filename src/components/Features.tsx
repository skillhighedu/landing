import { motion, useReducedMotion } from 'framer-motion'
import React from 'react'

interface Feature {
  icon: React.ReactNode
  title: string
  description: string
  link?: string // Optional link for "Learn More"
}

const features: Feature[] = [
  {
    icon: (
      <svg className="w-6 h-6 sm:w-8 sm:h-8 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
      </svg>
    ),
    title: 'Fast Integration',
    description: 'Easily integrate with your existing workflow and tools in minutes.',
    link: '/features/integration',
  },
  {
    icon: (
      <svg className="w-6 h-6 sm:w-8 sm:h-8 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12l2 2 4-4" />
      </svg>
    ),
    title: 'Reliable Performance',
    description: 'Experience blazing fast speeds and 99.9% uptime for your business.',
    link: '/features/performance',
  },
  {
    icon: (
      <svg className="w-6 h-6 sm:w-8 sm:h-8 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <rect width="20" height="14" x="2" y="5" rx="2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 21h8" />
      </svg>
    ),
    title: 'Modern Design',
    description: 'Delight your users with a beautiful, responsive, and accessible interface.',
    link: '/features/design',
  },
]

export default function Features() {
  const shouldReduceMotion = useReducedMotion()

  // Card animation variants
  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
        ease: 'easeOut' as const,
      },
    }),
    hover: shouldReduceMotion
      ? {}
      : {
          scale: 1.05,
          boxShadow: '0 8px 16px rgba(0, 255, 0, 0.2)',
          transition: { duration: 0.3 },
        },
  }

  return (
    <section className="py-12 sm:py-16  bg-white rounded-2xl m-3 relative overflow-hidden">
      {/* CRT scanline overlay */}
      <motion.div
        className="absolute inset-0 bg-repeating-linear-gradient bg-[length:2px_4px] bg-[rgba(0,0,0,0.1)] pointer-events-none z-0"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.2) 2px, rgba(0,0,0,0.2) 4px)',
        }}
        initial={{ opacity: 0.1 }}
        animate={{ opacity: shouldReduceMotion ? 0.1 : [0.08, 0.12, 0.08] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'linear' as const }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-10 text-center text-primary drop-shadow-[0_2px_2px_rgba(0,255,0,0.3)]"
          style={{ fontFamily: 'PixelDigivolve, sans-serif' }}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          Features
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              className="bg-gradient-to-b from-[#0f2e1f] to-[#072213] rounded-lg shadow p-5 sm:p-6 flex flex-col items-center text-center hover:bg-gray-100 dark:hover:bg-card/80 transition-colors"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              custom={idx}
              role="article"
              aria-label={`Feature: ${feature.title}`}
            >
              <motion.div
                className="mb-4"
                whileHover={{ scale: 1.2, rotate: 5, transition: { duration: 0.2 } }}
              >
                {feature.icon}
              </motion.div>
              <h3
                className="text-lg text-white sm:text-xl font-semibold mb-2 "
                style={{ fontFamily: 'PixelDigivolve, sans-serif' }}
              >
                {feature.title}
              </h3>
              <p className="text-sm sm:text-base lowercase text-gray-200 dark:text-gray-100 mb-4">
                {feature.description}
              </p>
              {feature.link && (
                <a
                  href={feature.link}
                  className="text-yellow-400 text-sm font-medium hover:underline focus:underline focus:outline-none focus:ring-2 focus:ring-primary"
                  aria-label={`Learn more about ${feature.title}`}
                >
                  Learn More
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}