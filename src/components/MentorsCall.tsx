"use client";

import { easeInOut, motion } from "framer-motion";
import Balancer from "react-wrap-balancer";
import { UserPlus } from "lucide-react";
import CustomButton from "@/components/common/Button";;

// Animation Variants for clean reusability
const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easeInOut, when: "beforeChildren", staggerChildren: 0.15 },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function MentorsCall() {
  return (
    <motion.section
      className="relative m-4 rounded-3xl py-16 px-6 sm:px-12 shadow-xl text-center max-w-full flex flex-col items-center gap-8 overflow-hidden
                 bg-gradient-to-br from-primary/40 via-primary/60 to-primary"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Floating Decorative Background Blob */}
      <motion.div
        className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      {/* Title */}
      <motion.h2
        variants={childVariants}
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl  text-white leading-tight tracking-tight drop-shadow-md"
      >
        <Balancer>Become a Mentor</Balancer>
      </motion.h2>

      {/* Description */}
      <motion.p
        variants={childVariants}
        className="text-gray-200 font-bricolage text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
      >
        <Balancer>
          Share your expertise and guide aspiring learners. Join our mentor community today!
        </Balancer>
      </motion.p>

      {/* Call-to-Action Button */}
      <motion.div variants={childVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <CustomButton
          title="Join as Mentor"
          icon={<UserPlus aria-hidden="true" />}
          onClick={() => window.open("https://forms.gle/fSaB1JkXp1TaYz1z9", "_blank")}
          aria-label="Join as Mentor"
          className="transition-transform duration-300 ease-out text-base hover:bg-neutral-900 "
        />
      </motion.div>
    </motion.section>
  );
}
