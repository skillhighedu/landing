import { motion } from "framer-motion";
import { Icon, HelpCircle } from "@/components/icons";

export default function FAQDecorations() {
  return (
    <>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-linear-to-b from-primary/5 to-transparent" />

      <motion.div
        className="absolute right-4 top-10 sm:right-12"
        animate={{ rotate: [0, 10, -10, 0], y: [0, -5, 5, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
      >
        <Icon
          icon={HelpCircle}
          size={56}
          className="text-neutral-300/70 dark:text-neutral-700"
        />
      </motion.div>

      <motion.div
        className="absolute bottom-12 left-4 sm:left-12"
        animate={{ rotate: [0, -10, 10, 0], y: [0, 5, -5, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
      >
        <Icon
          icon={HelpCircle}
          size={56}
          className="text-neutral-300/70 dark:text-neutral-700"
        />
      </motion.div>
    </>
  );
}
