import { motion, useReducedMotion,type Variants } from 'framer-motion'
import {
  Rocket,
  GraduationCap,
  BookOpen,
  MousePointerClick,
 
} from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Hero() {
  const shouldReduceMotion = useReducedMotion()

  // Icon animation variants
  const iconVariants = (delay: number): Variants => ({
    initial: { y: -10, opacity: 0 },
    animate: {
      y: shouldReduceMotion ? 0 : [15, -15],
      opacity: 1,
      transition: {
        opacity: { duration: 0.5, delay },
        y: {
          repeat: Infinity,
          repeatType: 'mirror' as const,
          duration: 1.5,
          ease: 'easeInOut' as const,
          delay,
        },
      },
    },
    hover: { scale: 1.2, rotate: 5, transition: { duration: 0.2 } },
  })

  // Scanline flicker animation
  const scanlineVariants: Variants = {
    animate: {
      opacity: shouldReduceMotion ? 0.15 : [0.1, 0.15, 0.1],
      transition: {
        repeat: Infinity,
        duration: 2,
        ease: 'linear' as const,
      },
    },
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0f2e1f] to-[#072213] font-pixel text-center relative overflow-hidden pt-16 md:pt-0">
      {/* CRT scanline overlay with CSS pattern */}
      <motion.div
        className="absolute inset-0 bg-repeating-linear-gradient bg-[length:2px_4px] bg-[rgba(0,0,0,0.1)] pointer-events-none z-0"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.2) 2px, rgba(0,0,0,0.2) 4px)',
        }}
        variants={scanlineVariants}
        animate="animate"
      />

      {/* Animated Icons */}
      <motion.div
        className="absolute left-4 top-12 sm:left-10 sm:top-16 text-emerald-500 cursor-pointer"
        variants={iconVariants(0.2)}
        initial="initial"
        animate="animate"
        whileHover="hover"
        aria-hidden="true"
      >
        <Rocket size={32} strokeWidth={2.5} className="sm:w-12 sm:h-12" />
      </motion.div>

      <motion.div
        className="absolute right-4 top-16 sm:right-12 sm:top-24 text-teal-400 cursor-pointer"
        variants={iconVariants(0.3)}
        initial="initial"
        animate="animate"
        whileHover="hover"
        aria-hidden="true"
      >
        <GraduationCap size={32} strokeWidth={2.5} className="sm:w-12 sm:h-12" />
      </motion.div>

      <motion.div
        className="absolute left-4 bottom-12 sm:left-8 sm:bottom-30 text-lime-400 cursor-pointer"
        variants={iconVariants(0.4)}
        initial="initial"
        animate="animate"
        whileHover="hover"
        aria-hidden="true"
      >
        <BookOpen size={28} strokeWidth={2.5} className="sm:w-11 sm:h-11" />
      </motion.div>

      <motion.div
        className="absolute right-4 bottom-40 sm:right-10 sm:bottom-30 text-green-400 cursor-pointer"
        variants={iconVariants(0.5)}
        initial="initial"
        animate="animate"
        whileHover="hover"
        aria-hidden="true"
      >
        <MousePointerClick size={28} strokeWidth={2.5} className="sm:w-11 sm:h-11" />
      </motion.div>


      {/* Hero Content */}
      <div className="relative z-10 px-4 max-w-md sm:max-w-lg md:max-w-2xl">
        <motion.h1
          className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-green-300 mb-6 tracking-wide pixel-shadow "
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          GAIN SKILLS
          <br />
          GET CERTIFIED.
          <br />
          REACH HIGHER
        </motion.h1>

        <motion.p
          className="text-base sm:text-lg md:text-xl text-teal-200 mb-8 leading-relaxed max-w-xs sm:max-w-sm md:max-w-lg mx-auto "
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        >
          Your journey to mastering in-demand skills starts here. Learn fast.
          Build faster. Launch confidently.
        </motion.p>

        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
        >
        <Button className="bg-lime-500 cursor-pointer text-black text-lg sm:text-xl font-bold py-3 px-6 sm:px-8 hover:bg-lime-400 pixel-border shadow-[4px_4px_0_#000] hover:shadow-[6px_6px_0_#000] transition-all duration-200 transform hover:-translate-y-1">
            GET STARTED
          </Button>
        </motion.div>
      </div>
    </section>
  )
}