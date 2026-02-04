
import { motion, useReducedMotion } from 'framer-motion';
import Trees from '@/assets/images/forest.jpg';

import HeroHeadline from './components/HeroHeadline';
import HeroActions from './components/HeroActions';
import HeroPartners from './components/HeroPartners';

export default function HeroSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="
        relative
        min-h-screen
        bg-black
        overflow-hidden
        flex items-center
        pt-[100px]   
      "
    >
      {/* Background */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center opacity-60"
        style={{ backgroundImage: `url(${Trees})` }}
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
      />

      {/* CRT Scanlines */}
      {!reduceMotion && (
        <div className="absolute inset-0 pointer-events-none opacity-10 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,black_2px,black_4px)]" />
      )}

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <HeroHeadline />
        <HeroActions />

        <p className="mt-6 text-sm text-neutral-300">
          Join 10,000+ learners leveling up with SkillHigh.
        </p>

        <HeroPartners />
      </div>
    </section>
  );
}
