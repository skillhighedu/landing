import { motion } from "framer-motion";
import { answerVariants } from "../animations";
import type { FAQ } from "../types";
import { Button } from "@/pages/dashboard/LearnInPublicPage";
import { Icon, Plus } from "@/components/icons";

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
      className={`
        relative rounded-xl border border-neutral-700
        bg-neutral-900 transition-colors
        ${isOpen ? "bg-neutral-800" : "hover:bg-neutral-800/70"}
        pixel-border shadow-[4px_4px_0_#000]
      `}
    >
      {/* Question */}
      <Button
        onClick={() => onToggle(index)}
        aria-expanded={isOpen}
        className="
          bg-neutral-950
          cursor-pointer
          w-full flex items-center justify-between gap-4
          px-6 py-5 text-left
          hover:bg-neutral-900
          focus:outline-none focus-visible:ring-2
          focus-visible:ring-primary/60
        "
      >
        <span className="text-base md:text-lg font-medium text-white">
          {item.question}
        </span>

        {/* Icon */}
        <motion.span
          className="flex items-center justify-center w-8 h-8 rounded-md border border-neutral-700 text-white"
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
        >
            <Icon icon={Plus} className="w-4 h-4" />
        </motion.span>
      </Button>

      {/* Answer */}
      <motion.div
        variants={answerVariants}
        initial="hidden"
        animate={isOpen ? "visible" : "hidden"}
        className="overflow-hidden"
      >
        <div className="px-6 pb-5 text-sm md:text-base text-neutral-300 leading-relaxed font-sans">
          {item.answer}
        </div>
      </motion.div>
    </div>
  );
}
