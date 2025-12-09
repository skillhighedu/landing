import { type ReactNode } from "react";
import { motion } from "framer-motion";

interface HeaderProps {
  title: string;
  subline: string;
  icon?: ReactNode;
}

export default function Header({ title, subline, icon }: HeaderProps) {
  return (
    <motion.div
      className="relative z-10 text-center space-y-3 mb-8 sm:mb-10"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Title */}
      <h2 className="text-[#16C47F] text-2xl sm:text-3xl md:text-4xl  leading-tight tracking-tight drop-shadow-lg">
        {title}
      </h2>

      {/* Optional icon */}
      {icon && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          {icon}
        </motion.div>
      )}

      {/* Subtitle */}
      <motion.p
        className="text-neutral-400 max-w-2xl mx-auto text-sm sm:text-base"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
      >
        {subline}
      </motion.p>
    </motion.div>
  );
}
