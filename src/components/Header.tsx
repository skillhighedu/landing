import { type ReactNode } from "react";
import { motion, type Variants } from "framer-motion";

interface HeaderProps {
  title: string;
  icon?: ReactNode;
}

const letterVariants: Variants = {
  hidden: { y: 50, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: i * 0.05,
      type: "spring" as const,
      stiffness: 500,
      damping: 30,
    },
  }),
};

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.03,
    },
  },
};

export default function Header({ title, icon }: HeaderProps) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center text-center gap-4 mb-5"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      <motion.h2
        className="text-primary text-xl sm:text-3xl pixel-shadow drop-shadow-lg leading-tight"
        aria-label={title}
      >
        {title.split("").map((char, i) => (
          <motion.span
            key={i}
            custom={i}
            variants={letterVariants}
            className={char === " " ? "w-2 inline-block" : "inline-block"}
          >
            {char}
          </motion.span>
        ))}
      </motion.h2>

      {icon && (
        <motion.div
          initial={{ scale: 0.6, rotate: -15, opacity: 0 }}
          whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.5 }}
          viewport={{ once: true }}
        >
          {icon}
        </motion.div>
      )}
    </motion.div>
  );
}
