import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { Rocket, GraduationCap, BookOpen, MousePointerClick, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  // Icon animation variants with refined timing
  const iconVariants = (delay: number): Variants => ({
    initial: { y: -20, opacity: 0 },
    animate: {
      y: shouldReduceMotion ? 0 : [20, -20],
      opacity: 1,
      transition: {
        opacity: { duration: 0.6, delay },
        y: {
          repeat: Infinity,
          repeatType: 'mirror' as const,
          duration: 2,
          ease: 'easeInOut' as const,
          delay,
        },
      },
    },
    hover: { scale: 1.3, rotate: 8, transition: { duration: 0.3 } },
  });

  // Scanline flicker animation
  const scanlineVariants: Variants = {
    animate: {
      opacity: shouldReduceMotion ? 0.1 : [0.05, 0.15, 0.05],
      transition: {
        repeat: Infinity,
        duration: 3,
        ease: 'linear' as const,
      },
    },
  };

  return (
    <section className="relative min-h-screen  flex items-center justify-center bg-gradient-to-br from-[#0f2e1f] via-[#072213] to-[#051a0f] font-pixel text-center overflow-hidden py-16 sm:py-20">
      {/* Parallax Background Layer */}
      <motion.div
        className="absolute inset-0 bg-[url('/path/to/subtle-texture.png')] bg-cover bg-center opacity-10 z-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: 'easeOut', repeat: Infinity, repeatType: 'reverse' }}
      />

      {/* CRT Scanline Overlay */}
      <motion.div
        className="absolute inset-0 bg-repeating-linear-gradient bg-[length:2px_4px] bg-[rgba(0,0,0,0.15)] pointer-events-none z-0"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.25) 2px, rgba(0,0,0,0.25) 4px)',
        }}
        variants={scanlineVariants}
        animate="animate"
      />

      {/* Animated Icons with Responsive Positioning */}
      <motion.div
        className="absolute left-8 top-20 sm:left-16 sm:top-24 text-emerald-500 cursor-pointer"
        variants={iconVariants(0.2)}
        initial="initial"
        animate="animate"
        whileHover="hover"
        aria-hidden="true"
      >
        <Rocket size={48} strokeWidth={2.5} className="sm:w-16 sm:h-16" />
      </motion.div>

      <motion.div
        className="absolute right-8 top-20 sm:right-16 sm:top-24 text-teal-400 cursor-pointer"
        variants={iconVariants(0.3)}
        initial="initial"
        animate="animate"
        whileHover="hover"
        aria-hidden="true"
      >
        <GraduationCap size={48} strokeWidth={2.5} className="sm:w-16 sm:h-16" />
      </motion.div>

      <motion.div
        className="absolute left-8 bottom-20 sm:left-16 sm:bottom-24 text-lime-400 cursor-pointer"
        variants={iconVariants(0.4)}
        initial="initial"
        animate="animate"
        whileHover="hover"
        aria-hidden="true"
      >
        <BookOpen size={40} strokeWidth={2.5} className="sm:w-14 sm:h-14" />
      </motion.div>

      <motion.div
        className="absolute right-8 bottom-20 sm:right-16 sm:bottom-24 text-green-400 cursor-pointer"
        variants={iconVariants(0.5)}
        initial="initial"
        animate="animate"
        whileHover="hover"
        aria-hidden="true"
      >
        <MousePointerClick size={40} strokeWidth={2.5} className="sm:w-14 sm:h-14" />
      </motion.div>

      {/* Hero Content with Enhanced Grid Layout */}
      <div className="relative z-10 px-4 sm:px-6 md:px-8 max-w-5xl mx-auto grid grid-cols-1 gap-6 sm:gap-8">
        <motion.h1
          className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-medium text-green-300 tracking-tight pixel-shadow drop-shadow-lg leading-tight"
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          Skills Build Futures.
          <br />
          We Help You Build Them.
        </motion.h1>

        <motion.p
          className="text-base sm:text-lg md:text-xl text-teal-200 leading-relaxed max-w-md sm:max-w-lg md:max-w-4xl mx-auto"
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        >
          Skillhigh helps you grow what matters — real skills. Not theory. Not fluff. Just outcomes.
        </motion.p>

        <motion.div
          className="flex justify-center gap-4 sm:gap-6"
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
        >
          <Button
            className="bg-lime-500 text-neutral-900 text-base sm:text-md font-semibold py-3 px-6 sm:py-4 sm:px-8 hover:bg-lime-400 pixel-border shadow-[4px_4px_0_#000] hover:shadow-[6px_6px_0_#000] transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-lime-300 flex items-center gap-2"
            aria-label="Start Building Skills"
          >
            Start Building Skills
            <ArrowRight size={20} />
          </Button>
     

        </motion.div>

        <motion.p
          className="text-sm sm:text-base md:text-lg text-teal-200 leading-relaxed max-w-md sm:max-w-lg md:max-w-2xl mx-auto mt-4 sm:mt-6"
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
        >
          Join 10,000+ learners leveling up with Skillhigh.
        </motion.p>
      </div>
    </section>
  );
}