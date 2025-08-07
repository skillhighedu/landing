"use client";

import { easeOut, motion, useReducedMotion } from "framer-motion";
import React from "react";
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
    name: "Twitter",
    href: "https://twitter.com/skillhigh",
    icon: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M22.46 6c-.77.35-1.6.59-2.47.7a4.3 4.3 0 0 0 1.88-2.37 8.59 8.59 0 0 1-2.72 1.04A4.28 4.28 0 0 0 16.11 4c-2.37 0-4.29 1.92-4.29 4.29 0 .34.04.67.11.99C7.69 9.13 4.07 7.38 1.64 4.7c-.37.64-.58 1.39-.58 2.19 0 1.51.77 2.84 1.94 3.62-.72-.02-1.4-.22-1.99-.55v.06c0 2.11 1.5 3.87 3.5 4.27-.36.1-.74.16-1.13.16-.28 0-.54-.03-.8-.08.54 1.7 2.11 2.94 3.97 2.97A8.6 8.6 0 0 1 2 19.54c-.29 0-.57-.02-.85-.05A12.13 12.13 0 0 0 8.29 21.5c7.55 0 11.68-6.26 11.68-11.68 0-.18-.01-.36-.02-.54A8.18 8.18 0 0 0 22.46 6z" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    href: "https://github.com/skillhigh",
    icon: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.66-.22.66-.48 0-.24-.01-.87-.01-1.7-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.1-1.46-1.1-1.46-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.8c.85.004 1.71.115 2.51.337 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85 0 1.33-.01 2.4-.01 2.73 0 .27.16.58.67.48A10.01 10.01 0 0 0 22 12c0-5.52-4.48-10-10-10z" />
      </svg>
    ),
  },
];

const quickLinks: QuickLink[] = [
  { name: "Programs", href: "/programs" },
  { name: "Success Stories", href: "/success" },
  { name: "Workshops", href: "/workshops" },
  { name: "Help Center", href: "/support" },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: easeOut,
    },
  }),
};

export default function Footer() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <footer className="bg-neutral-900 py-12 sm:py-6 relative overflow-hidden" role="contentinfo" aria-label="Footer">
      {/* Grid Pattern */}
      <motion.div
        className="absolute inset-0 bg-[url('/assets/grid-pattern.png')] bg-repeat bg-[length:40px_40px] opacity-5 pointer-events-none z-0"
        initial={{ opacity: 0 }}
        animate={{
          opacity: shouldReduceMotion ? 0.05 : 0.1,
          backgroundPositionY: [0, 10, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-10 lg:gap-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          {/* Logo + Tagline */}
          <motion.div className="flex flex-col space-y-4" custom={0} variants={fadeInUp}>
            <a href="/" className="flex items-center space-x-3" aria-label="Skill High homepage">
              <img src={Logo} alt="Skill High Logo" className="h-20 w-auto" loading="lazy" />
            </a>
            <p className="text-sm text-gray-300 max-w-xs font-mono">
              Learn by building. Grow by doing. We're empowering the next generation of developers and tech leaders through practical, high-impact education.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div custom={1} variants={fadeInUp}>
            <h3 className="text-lg text-primary mb-4">Explore</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, i) => (
                <motion.li key={link.name} custom={i} variants={fadeInUp} whileHover={{ scale: 1.05 }}>
                  <a href={link.href} className="text-gray-400 transition-colors duration-200">{link.name}</a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div custom={2} variants={fadeInUp}>
            <h3 className="text-lg text-primary mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              {socialLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  custom={i}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.2 }}
                  className="text-gray-300 transition-colors duration-200"
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div custom={3} variants={fadeInUp}>
            <h3 className="text-lg text-primary mb-4">Contact</h3>
            <ul className="space-y-2 text-sm font-mono text-gray-300">
              <li>
                <span className="font-medium">Email:</span>{" "}
                <a href="mailto:support@skillhigh.in" className="transition-colors">support@skillhigh.in</a>
              </li>
              <li>
                <span className="font-medium">Phone:</span>{" "}
                <a href="tel:+917207371204" className="transition-colors">+91 72073 71204</a>
              </li>
              <li className="max-w-xs">
                <span className="font-medium">Campus HQ:</span> Woods Enclave, Suchitra Junction, Hyderabad – 500067
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom Footer */}
        <motion.div
          className="mt-12 pt-8 border-t border-gray-700 flex flex-col md:flex-row items-center justify-between gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <div className="flex space-x-4 text-sm text-gray-300">
            <a href="/privacy" className="hover:text-yellow-400 transition-colors">Privacy Policy</a>
            <span className="text-gray-500">|</span>
            <a href="/terms" className="hover:text-yellow-400 transition-colors">Terms of Use</a>
          </div>
          <span className="text-sm text-gray-300">
            © {new Date().getFullYear()} Skill High. Empowering Next-Gen Talent.
          </span>
        </motion.div>
      </div>
    </footer>
  );
}
