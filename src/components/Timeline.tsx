import { motion, useReducedMotion, useScroll, useTransform, type Variants } from 'framer-motion';
import React, { useRef } from 'react';

// Define timeline data structure
interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  date?: string;
}

const timelineEvents: TimelineEvent[] = [
  {
    id: '1',
    title: 'Enroll in Program',
    description: 'Kickstart your journey with our industry-approved curriculum tailored to your goals.',
    icon: (
      <svg
        className="w-6 h-6 text-teal-500"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15l-5-5 1.41-1.41L11 14.17l6.59-6.59L19 9l-8 8z" />
      </svg>
    ),
    date: 'Day 1',
  },
  {
    id: '2',
    title: 'Live Learning Sessions',
    description: 'Engage in live, interactive classes with expert instructors and peers.',
    icon: (
      <svg
        className="w-6 h-6 text-teal-500"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
      </svg>
    ),
    date: 'Weeks 1-4',
  },
  {
    id: '3',
    title: 'Real-World Projects',
    description: 'Apply your skills to hands-on projects, earning co-branded certifications.',
    icon: (
      <svg
        className="w-6 h-6 text-teal-500"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M7 2v11h3v9l7-12h-4l4-8H7z" />
      </svg>
    ),
    date: 'Weeks 5-8',
  },
  {
    id: '4',
    title: 'Career Support',
    description: 'Get personalized mentorship, mock interviews, and job placement assistance.',
    icon: (
      <svg
        className="w-6 h-6 text-teal-500"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M20 6h-3V4c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM9 4h6v2H9V4zm11 15H4V8h16v11z" />
      </svg>
    ),
    date: 'Week 9+',
  },
];

export default function Timeline() {
  const shouldReduceMotion = useReducedMotion();
  const timelineRef = useRef<HTMLDivElement>(null);

  // Track vertical scroll progress of the timeline
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start end', 'end start'],
  });

  // Map scroll progress to the character's Y position along the timeline
  const characterY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  // Animation variants for timeline items
  const eventVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: shouldReduceMotion ? 0 : i * 0.2,
        duration: 0.5,
        ease: "easeOut" as const,
      },
    }),
  };

  // Character animation variants
  const characterVariants: Variants = {
    initial: { scale: 0, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <section
      className="bg-neutral-900 py-16"
      aria-label="Learning Journey Timeline"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-12">
          Your Learning Journey
        </h2>
        <div className="relative" ref={timelineRef}>
          {/* Vertical timeline line */}
          <div
            className="absolute left-1/2 transform -translate-x-1/2 top-0 h-full w-1 bg-teal-500/30"
            aria-hidden="true"
          ></div>

          {/* Animated character */}
          {!shouldReduceMotion && (
            <motion.div
              className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8"
              style={{ y: characterY }}
              variants={characterVariants}
              initial="initial"
              animate="animate"
              aria-hidden="true"
            >
              <svg
                className="w-8 h-8 text-teal-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2a5 5 0 0 1 5 5c0 1.57-.72 2.97-1.85 3.9A5.99 5.99 0 0 1 18 16v2h2v2H4v-2h2v-2a5.99 5.99 0 0 1 2.85-5.1A5 5 0 0 1 7 7a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
              </svg>
            </motion.div>
          )}

          {timelineEvents.map((event, index) => (
            <motion.div
              key={event.id}
              className="mb-16 flex items-center w-full"
              custom={index}
              initial="hidden"
              whileInView="visible"
              variants={eventVariants}
              viewport={{ once: true }}
            >
              {/* Timeline content */}
              <div className="w-full flex justify-center">
                <div className="relative bg-neutral-800 rounded-lg p-6 shadow-lg border border-teal-500/20 hover:border-teal-500 transition-colors duration-300 max-w-md text-center">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="flex-shrink-0 bg-teal-500/10 p-3 rounded-full">
                      {event.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">
                        {event.title}
                      </h3>
                      <p className="text-sm text-gray-300 mt-1">
                        {event.description}
                      </p>
                      {event.date && (
                        <p className="text-xs text-teal-400 mt-2 font-medium">
                          {event.date}
                        </p>
                      )}
                    </div>
                  </div>
                  {/* Timeline connector */}
                  <div
                    className="absolute top-1/2 w-4 h-4 bg-teal-500 rounded-full transform -translate-y-1/2 left-[-2rem]"
                    aria-hidden="true"
                  ></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}