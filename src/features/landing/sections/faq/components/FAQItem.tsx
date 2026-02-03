import { motion } from "framer-motion";
import type { FAQ } from "../types";
import { Plus } from "lucide-react";

type Props = {
  item: FAQ;
  index: number;
  activeIndex: number | null;
  onToggle: (index: number) => void;
};

export default function FAQItem({
  item,
  index,
  activeIndex,
  onToggle,
}: Props) {
  const isOpen = activeIndex === index;

  return (
    <div
      className="
        rounded-xl
        border border-neutral-200 dark:border-neutral-800
        bg-white dark:bg-neutral-900
        transition-colors
      "
    >
      {/* Question */}
      <button
        onClick={() => onToggle(index)}
        aria-expanded={isOpen}
        className="
          w-full flex items-center justify-between gap-4
          px-5 sm:px-6 py-4
          text-left
          hover:bg-neutral-50 dark:hover:bg-neutral-800/60
          transition
        "
      >
        <span className="text-base sm:text-lg font-medium text-neutral-900 dark:text-white">
          {item.question}
        </span>

        {/* Icon */}
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="
            flex h-8 w-8 items-center justify-center
            rounded-md
            border border-neutral-300 dark:border-neutral-700
            text-neutral-700 dark:text-neutral-300
          "
        >
          <Plus className="h-4 w-4" />
        </motion.span>
      </button>

      {/* Answer */}
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="overflow-hidden"
      >
        <div className="px-5 sm:px-6 pb-4 text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
          {item.answer}
        </div>
      </motion.div>
    </div>
  );
}
