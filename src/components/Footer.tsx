import { motion, useReducedMotion } from 'framer-motion';
import React from 'react';
import Logo from "@/assets/logo.png";

interface SocialLink {
  name: string;
  href: string;
  icon: React.ReactNode;
}

interface QuickLink {
  name: string;
  href: string;
}

const socialLinks: SocialLink[] = [
  {
    name: 'Twitter',
    href: 'https://twitter.com/skillhigh',
    icon: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M22.46 6c-.77.35-1.6.59-2.47.7a4.3 4.3 0 0 0 1.88-2.37 8.59 8.59 0 0 1-2.72 1.04A4.28 4.28 0 0 0 16.11 4c-2.37 0-4.29 1.92-4.29 4.29 0 .34.04.67.11.99C7.69 9.13 4.07 7.38 1.64 4.7c-.37.64-.58 1.39-.58 2.19 0 1.51.77 2.84 1.94 3.62-.72-.02-1.4-.22-1.99-.55v.06c0 2.11 1.5 3.87 3.5 4.27-.36.1-.74.16-1.13.16-.28 0-.54-.03-.8-.08.54 1.7 2.11 2.94 3.97 2.97A8.6 8.6 0 0 1 2 19.54c-.29 0-.57-.02-.85-.05A12.13 12.13 0 0 0 8.29 21.5c7.55 0 11.68-6.26 11.68-11.68 0-.18-.01-.36-.02-.54A8.18 8.18 0 0 0 22.46 6z" />
      </svg>
    ),
  },
  {
    name: 'GitHub',
    href: 'https://github.com/skillhigh',
    icon: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.66-.22.66-.48 0-.24-.01-.87-.01-1.7-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.1-1.46-1.1-1.46-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.8c.85.004 1.71.115 2.51.337 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85 0 1.33-.01 2.4-.01 2.73 0 .27.16.58.67.48A10.01 10.01 0 0 0 22 12c0-5.52-4.48-10-10-10z" />
      </svg>
    ),
  },
];

const quickLinks: QuickLink[] = [
  { name: 'About', href: '/about' },
  { name: 'Careers', href: '/careers' },
  { name: 'Courses', href: '/courses' },
  { name: 'Contact', href: '/contact' },
];

export default function Footer() {
  const shouldReduceMotion = useReducedMotion();

  

  const iconVariants = {
    hover: shouldReduceMotion
      ? {}
      : {
          scale: 1.15,
          transition: { duration: 0.2 },
        },
  };

  return (
    <footer
      className="bg-gradient-to-t from-neutral-900/90 to-neutral-800/90 py-12 sm:py-16 relative overflow-hidden"
      role="contentinfo"
      aria-label="Footer"
    >
      {/* Subtle background pattern */}
      <motion.div
        className="absolute inset-0 bg-[url('/assets/grid-pattern.png')] bg-repeat bg-[length:40px_40px] opacity-5 pointer-events-none z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: shouldReduceMotion ? 0.05 : 0.1 }}
        transition={{ duration: 1 }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12"
         
          initial="hidden"
          animate="visible"
        >
          {/* Logo and Tagline */}
          <div className="flex flex-col items-start space-y-4">
            <motion.a
              href="/"
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
              aria-label="Skill High homepage"
            >
              {/* Placeholder for Skill High logo */}
              <img
                src={Logo}
                alt="Skill High Logo"
                className="h-12 w-auto"
                loading="lazy"
              />
            </motion.a>
            <p className="text-lg font-semibold text-green-400">Grow and Learn</p>
            <p className="text-sm text-gray-300 max-w-xs">
              We are dedicated to providing high-quality content and services. Join us to enhance your skills and explore new opportunities.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <motion.li
                  key={link.name}
                  variants={iconVariants}
                  whileHover="hover"
                >
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-green-400 focus:text-green-400 focus:outline-none focus:ring-2 focus:ring-green-400 transition-colors duration-200"
                    aria-label={link.name}
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className="text-gray-300 hover:text-green-400 focus:text-green-400 focus:outline-none focus:ring-2 focus:ring-green-400 transition-colors duration-200"
                  aria-label={`Visit our ${link.name} page`}
                  variants={iconVariants}
                  whileHover="hover"
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>
                <span className="font-medium">Email: </span>
                <a
                  href="mailto:admin@skillhigh.in"
                  className="hover:text-green-400 focus:text-green-400 focus:outline-none focus:ring-2 focus:ring-green-400 transition-colors duration-200"
                  aria-label="Email admin@skillhigh.in"
                >
                  admin@skillhigh.in
                </a>
              </li>
              <li>
                <span className="font-medium">Phone: </span>
                <a
                  href="tel:+917207371204"
                  className="hover:text-green-400 focus:text-green-400 focus:outline-none focus:ring-2 focus:ring-green-400 transition-colors duration-200"
                  aria-label="Call 7207371204"
                >
                  7207371204
                </a>
              </li>
              <li className="max-w-xs">
                <span className="font-medium">Address: </span>
                P.No: 169, First Floor, Woods Enclave, Woods Central Park, Suchitra Sub Post, Pet Basheerabad, Suchitra Junction, Quthbullapur, Medchal-Malkajgiri Dist., Telangana, India 500067
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Footer Bottom */}
        <motion.div
          className="mt-12 pt-8 border-t border-gray-700 flex flex-col md:flex-row items-center justify-between gap-4"
       
          initial="hidden"
          animate="visible"
        >
          <div className="flex space-x-4 text-sm text-gray-300">
            <a
              href="/privacy"
              className="hover:text-green-400 focus:text-green-400 focus:outline-none focus:ring-2 focus:ring-green-400 transition-colors duration-200"
              aria-label="Privacy Policy"
            >
              Privacy Policy
            </a>
            <span className="text-gray-500">|</span>
            <a
              href="/terms"
              className="hover:text-green-400 focus:text-green-400 focus:outline-none focus:ring-2 focus:ring-green-400 transition-colors duration-200"
              aria-label="Terms & Conditions"
            >
              Terms & Conditions
            </a>
          </div>
          <span className="text-sm text-gray-300">
            © {new Date().getFullYear()} Skill High. All rights reserved.
          </span>
        </motion.div>
      </div>
    </footer>
  );
}
