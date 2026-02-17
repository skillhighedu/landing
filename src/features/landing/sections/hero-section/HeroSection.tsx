import { motion, useReducedMotion } from "framer-motion";
import Trees from "@/assets/images/forest.jpg";

import HeroHeadline from "./components/HeroHeadline";
import HeroActions from "./components/HeroActions";
import HeroPartners from "./components/HeroPartners";

export default function HeroSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="
        relative
        min-h-screen lg:min-h-screen
        bg-black
        overflow-hidden
        flex items-center
        pt-28 sm:pt-32 lg:pt-36
        pb-16
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
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-white/10 dark:bg-black/40" />

      {/* CRT Scanlines */}
      {!reduceMotion && (
        <div className="absolute inset-0 pointer-events-none opacity-10 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,black_2px,black_4px)]" />
      )}

      {/* Content */}
      <div
        className="
          relative z-10
          w-full
          max-w-6xl
          mx-auto
          px-5 sm:px-8 lg:px-12
          text-center
        "
      >
        <HeroHeadline />

        <div className="mt-6 sm:mt-8">
          <HeroActions />
        </div>

        <p className="mt-6 text-sm sm:text-base text-neutral-300">
          Join 10,000+ learners leveling up with SkillHigh.
        </p>

        <div className="mt-10">
          <HeroPartners />
        </div>
      </div>
    </section>
  );
}
