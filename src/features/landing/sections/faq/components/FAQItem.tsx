import { motion } from "framer-motion";
import { answerVariants } from "../animations";
import type { FAQ } from "../types";
import { Icon, Plus } from "@/components/icons";

type Props = {
  item: FAQ;
  index: number;
  activeIndex: number | null;
  onToggle: (index: number) => void;
};

export default function FAQItem({ item, index, activeIndex, onToggle }: Props) {
  const isOpen = activeIndex === index;

  return (
    <div
      className={`
        relative rounded-xl
        border border-border
        bg-card text-card-foreground
        transition-colors
        shadow-[4px_4px_0_#000] dark:shadow-[4px_4px_0_rgba(255,255,255,0.18)]
        hover:shadow-[6px_6px_0_#000] dark:hover:shadow-[6px_6px_0_rgba(255,255,255,0.22)]
        ${isOpen ? "bg-muted" : "hover:bg-muted/60"}
      `}
    >
      {/* Question */}
      <button
        type="button"
        onClick={() => onToggle(index)}
        aria-expanded={isOpen}
        className="
          w-full flex items-center justify-between gap-4
          px-6 py-5 text-left
          rounded-xl
          focus:outline-none focus-visible:ring-2
          focus-visible:ring-primary/60
        "
      >
        <span className="text-base md:text-lg font-medium text-card-foreground">
          {item.question}
        </span>

        {/* Icon */}
        <motion.span
          className="
            flex items-center justify-center w-8 h-8 rounded-md
            border border-border
            text-card-foreground
          "
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
        >
          <Icon icon={Plus} className="w-4 h-4" />
        </motion.span>
      </button>

      {/* Answer */}
      <motion.div
        variants={answerVariants}
        initial="hidden"
        animate={isOpen ? "visible" : "hidden"}
        className="overflow-hidden"
      >
        <div className="px-6 pb-5 text-sm md:text-base text-card-foreground/75 leading-relaxed font-sans">
          {item.answer}
        </div>
      </motion.div>
    </div>
  );
}
