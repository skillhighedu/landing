import { motion, useReducedMotion } from 'framer-motion';
import React from 'react';
import Image from '@/assets/uiux.png'; // Assuming this is a valid image import

// Define the Course interface
interface Course {
  icon: React.ReactNode;
  title: string;
  description: string;
  src: string; // Image source for course thumbnail
  link?: string; // Optional link for "Learn More"
}

const courses: Course[] = [
  {
    icon: (
      <svg className="w-6 h-6 sm:w-8 sm:h-8 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
      </svg>
    ),
    title: 'UI/UX Design',
    description: 'Learn to create user-friendly interfaces with modern design principles.',
    src: Image,
    link: '/courses/uiux',
  },
  {
    icon: (
      <svg className="w-6 h-6 sm:w-8 sm:h-8 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12l2 2 4-4" />
      </svg>
    ),
    title: 'Web Development',
    description: 'Master full-stack development with hands-on projects.',
    src: Image, // Reuse the same image for consistency, or import a different one
    link: '/courses/webdev',
  },
  {
    icon: (
      <svg className="w-6 h-6 sm:w-8 sm:h-8 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <rect width="20" height="14" x="2" y="5" rx="2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 21h8" />
      </svg>
    ),
    title: 'Data Science',
    description: 'Dive into data analysis and machine learning with real-world applications.',
    src: Image, // Reuse the same image for consistency
    link: '/courses/datascience',
  },
];

export default function Courses() {
  const shouldReduceMotion = useReducedMotion();

  // Card animation variants
 
  return (
    <section className="py-12 sm:py-16 bg-white relative overflow-hidden">
      {/* CRT scanline overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.2) 2px, rgba(0,0,0,0.2) 4px)',
        }}
        initial={{ opacity: 0.1 }}
        animate={{ opacity: shouldReduceMotion ? 0.1 : [0.08, 0.12, 0.08] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-10 text-center text-primary drop-shadow-[0_2px_2px_rgba(0,255,0,0.3)]"
          style={{ fontFamily: 'PixelDigivolve, sans-serif' }}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          Our Courses
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {courses.map((course, idx) => (
            <motion.div
              key={idx}
              className="bg-gradient-to-b from-[#0f2e1f] to-[#072213] rounded-lg shadow p-5 sm:p-6 flex flex-col items-center text-center hover:bg-gray-100 dark:hover:bg-card/80 transition-colors"
         
              initial="hidden"
              animate="visible"
              whileHover="hover"
              custom={idx}
              role="article"
              aria-label={`Course: ${course.title}`}
            >
              <img
                src={course.src}
                alt={`${course.title} thumbnail`}
                className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-md mb-4"
              />
              <motion.div
                className="mb-4"
                whileHover={{ scale: 1.2, rotate: 5, transition: { duration: 0.2 } }}
              >
                {course.icon}
              </motion.div>
              <h3
                className="text-lg text-white sm:text-xl font-semibold mb-2"
                style={{ fontFamily: 'PixelDigivolve, sans-serif' }}
              >
                {course.title}
              </h3>
              <p className="text-sm sm:text-base lowercase text-gray-200 dark:text-gray-100 mb-4">
                {course.description}
              </p>
              {course.link && (
                <a
                  href={course.link}
                  className="text-yellow-400 text-sm font-medium hover:underline focus:underline focus:outline-none focus:ring-2 focus:ring-primary"
                  aria-label={`Learn more about ${course.title}`}
                >
                  Learn More
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}