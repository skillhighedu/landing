import { motion, useReducedMotion } from 'framer-motion'
import React from 'react'

interface SocialLink {
  name: string
  href: string
  icon: React.ReactNode
}

const socialLinks: SocialLink[] = [
  {
    name: 'Twitter',
    href: 'https://twitter.com/skillhigh',
    icon: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M22.46 6c-.77.35-1.6.59-2.47.7a4.3 4.3 0 0 0 1.88-2.37 8.59 8.59 0 0 1-2.72 1.04A4.28 4.28 0 0 0 16.11 4c-2.37 0-4.29 1.92-4.29 4.29 0 .34.04.67.11.99C7.69 9.13 4.07 7.38 1.64 4.7c-.37.64-.58 1.39-.58 2.19 0 1.51.77 2.84 1.94 3.62-.72-.02-1.4-.22-1.99-.55v.06c0 2.11 1.5 3.87 3.5 4.27-.36.1-.74.16-1.13.16-.28 0-.54-.03-.8-.08.54 1.7 2.11 2.94 3.97 2.97A8.6 8.6 0 0 1 2 19.54c-.29 0-.57-.02-.85-.05A12.13 12.13 0 0 0 8.29 21.5c7.55 0 11.68-6.26 11.68-11.68 0-.18-.01-.36-.02-.54A8.18 8.18 0 0 0 22.46 6z" />
      </svg>
    ),
  },
  {
    name: 'GitHub',
    href: 'https://github.com/skillhigh',
    icon: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.66-.22.66-.48 0-.24-.01-.87-.01-1.7-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.1-1.46-1.1-1.46-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.8c.85.004 1.71.115 2.51.337 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85 0 1.33-.01 2.4-.01 2.73 0 .27.16.58.67.48A10.01 10.01 0 0 0 22 12c0-5.52-4.48-10-10-10z" />
      </svg>
    ),
  },
]

export default function Footer() {
  const shouldReduceMotion = useReducedMotion()

  // Animation variants
  const contentVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: 'easeOut' as const },
    },
  }

  const iconVariants = {
    hover: shouldReduceMotion
      ? {}
      : {
          scale: 1.2,
          rotate: 5,
          transition: { duration: 0.2 },
        },
  }

  return (
    <footer
      className="bg-gradient-to-t from-[#0f2e1f]/10 to-[#072213]/10 dark:bg-card/90 py-8 sm:py-12 mt-16 relative overflow-hidden"
      role="contentinfo"
      aria-label="Footer"
    >
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
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between gap-4"
          variants={contentVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.span
            className="text-lg sm:text-xl font-bold text-green-300 drop-shadow-[0_2px_2px_rgba(0,255,0,0.3)]"
            style={{ fontFamily: 'PixelDigivolve, sans-serif' }}
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
          >
            <a href="/" aria-label="Skillhigh homepage">
              Skillhigh
            </a>
          </motion.span>

          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className="text-gray-500 hover:text-primary focus:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                  aria-label={`Visit our ${link.name} page`}
                  variants={iconVariants}
                  whileHover="hover"
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
            <div className="flex space-x-4 text-sm text-gray-500 dark:text-gray-300">
              <a
                href="/privacy"
                className="hover:text-primary focus:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="Privacy Policy"
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                className="hover:text-primary focus:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="Terms of Service"
              >
                Terms of Service
              </a>
            </div>
          </div>

          <span className="text-sm text-gray-500 dark:text-gray-300 mt-4 md:mt-0">
            © {new Date().getFullYear()} Skillhigh. All rights reserved.
          </span>
        </motion.div>
      </div>
    </footer>
  )
}