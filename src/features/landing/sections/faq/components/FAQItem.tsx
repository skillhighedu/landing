import { motion } from "framer-motion";
import type { FAQ } from "../types";
import { Minus, Plus } from "lucide-react";

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
        overflow-hidden rounded-[24px]
        border border-neutral-200 bg-white shadow-sm transition-all duration-200
        dark:border-neutral-800 dark:bg-neutral-900
        data-[open=true]:border-primary/30 data-[open=true]:shadow-md
      "
      data-open={isOpen}
    >
      {/* Question */}
      <button
        onClick={() => onToggle(index)}
        aria-expanded={isOpen}
        className="
          w-full flex items-center justify-between gap-4
          px-4 py-4 sm:px-6 sm:py-5
          text-left
          transition
          hover:bg-neutral-50 dark:hover:bg-neutral-800/60
        "
      >
        <div className="min-w-0 flex-1">
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/80">
            FAQ {String(index + 1).padStart(2, "0")}
          </p>
          <span className="min-w-0 flex-1 pr-2 text-sm font-medium leading-6 text-neutral-900 dark:text-white sm:text-lg">
            {item.question}
          </span>
        </div>

        {/* Icon */}
        <motion.span
          animate={{ scale: isOpen ? 1.04 : 1, rotate: isOpen ? 0 : 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="
            flex h-10 w-10 shrink-0 items-center justify-center
            rounded-xl
            border border-neutral-300 bg-neutral-50 text-neutral-700
            dark:border-neutral-700 dark:bg-neutral-800/80 dark:text-neutral-300
          "
        >
          {isOpen ? (
            <Minus className="h-4 w-4 sm:h-5 sm:w-5" />
          ) : (
            <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
          )}
        </motion.span>
      </button>

      {/* Answer */}
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="overflow-hidden"
      >
        <div className="border-t border-neutral-100 px-4 pb-5 pt-1 font-mono text-sm leading-7 text-neutral-600 dark:border-neutral-800 dark:text-neutral-400 sm:px-6 sm:text-base">
          {item.answer}
        </div>
      </motion.div>
    </div>
  );
}
