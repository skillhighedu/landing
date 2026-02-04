import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { CourseContent } from "@/types/course";
import { topicVariants } from "../animations";

interface Props {
  sectionTitle: string;
  topics: CourseContent[];
  defaultOpen?: boolean;
}

export default function CurriculumSection({
  sectionTitle,
  topics,
  defaultOpen = false,
}: Props) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div
      className="
        w-full max-w-4xl mx-auto mb-4 sm:mb-6
        rounded-xl
        border border-neutral-200 dark:border-neutral-800
        bg-white dark:bg-neutral-900
        shadow-sm hover:shadow-md
        transition-shadow
      "
    >
      {/* Header */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="
          w-full flex items-center justify-between
          px-4 sm:px-6 py-4 sm:py-5
          text-left
          text-base sm:text-lg font-medium
          text-neutral-900 dark:text-white
          hover:bg-neutral-100 dark:hover:bg-neutral-800/60
          transition
          rounded-t-xl
        "
      >
        <span className="flex items-center gap-3">
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="
              flex items-center justify-center
              h-8 w-8 rounded-full
              bg-neutral-100 dark:bg-neutral-800
            "
          >
            <ChevronDown className="h-4 w-4 text-neutral-700 dark:text-neutral-300" />
          </motion.span>

          {sectionTitle}
        </span>
      </button>

      {/* Content */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="
              overflow-hidden
              divide-y divide-neutral-200 dark:divide-neutral-800
            "
          >
            {topics.map((topic, idx) => (
              <motion.div
                key={idx}
                variants={topicVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: idx * 0.04 }}
                className="
                  flex gap-3 items-start
                  px-4 sm:px-6 py-3 sm:py-4
                  text-sm sm:text-base
                  text-neutral-700 dark:text-neutral-300
                  hover:bg-neutral-50 dark:hover:bg-neutral-800/50
                  transition
                "
              >
                <span
                  className="
                    mt-2 h-2 w-2 rounded-full
                    bg-primary
                    flex-shrink-0
                  "
                />
                <p className="leading-relaxed">
                  {topic.contentName}
                </p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
