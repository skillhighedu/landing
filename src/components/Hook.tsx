
import { motion, useReducedMotion, type Variants } from 'framer-motion';


export default function Hook() {
  const shouldReduceMotion = useReducedMotion();

  // Animation variants for the heading
  const headingVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' as const },
    },
  };

  // Animation variants for the description
  const descriptionVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' as const, delay: 0.2 },
    },
  };

  // Animation variants for the CTA button
  const buttonVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: 'easeOut' as const, delay: 0.4 },
    },
    hover: {
      scale: 1.05,
      boxShadow: '0px 4px 15px rgba(45, 212, 191, 0.3)',
      transition: { duration: 0.3 },
    },
  };

 

  return (
    <section
      className="relative bg-gradient-to-br from-[#0f2e1f] via-[#072213] to-[#051a0f] bg-pr py-20 overflow-hidden"
      aria-label="SkillHigh Hero Section"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main Heading */}
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight"
          variants={headingVariants}
          initial="hidden"
          animate="visible"
        >
          Elevate Your Skills with Leading SkillHigh!
        </motion.h1>

        {/* Description */}
        <motion.p
          className="text-lg sm:text-xl text-gray-200 mb-8 max-w-2xl mx-auto"
          variants={descriptionVariants}
          initial="hidden"
          animate="visible"
        >
          Join SkillHigh today and start your journey to becoming industry-ready with hands-on projects and expert-led courses. We provide practical skills that will make you stand out in the job market.
        </motion.p>

        {/* Call-to-Action Button */}
        <motion.a
          href="https://skillhigh.com/enroll" // Replace with actual enrollment link
          className="inline-block bg-teal-500 text-white font-semibold py-3 px-8 rounded-full hover:bg-teal-600 transition-colors duration-300"
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          whileHover={shouldReduceMotion ? undefined : "hover"}
          aria-label="Enroll in SkillHigh courses"
        >
          Enroll Now
        </motion.a>

      </div>
    </section>
  );
}
