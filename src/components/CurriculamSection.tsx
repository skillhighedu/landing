import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { CourseContent } from "@/types/course";

interface Props {
  sectionTitle: string;
  topics: CourseContent[];
  defaultOpen?: boolean;
}

export default function CurriculumSection({ sectionTitle, topics, defaultOpen = false }: Props) {
  const [open, setOpen] = useState(defaultOpen);

  const topicVariants = {
    hidden: { opacity: 0, y: 5 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-4 sm:mb-6 rounded-xl pixel-border shadow-[4px_4px_0_#000] hover:shadow-[6px_6px_0_#000] bg-gradient-to-br from-[#0f0f0f] via-[#1f1f1f] to-[#0f0f0f] p-[2px]">
      <div className="rounded-xl bg-neutral-900 backdrop-blur bg-opacity-80">
        <button
          className="w-full flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 text-white text-base sm:text-lg transition hover:bg-neutral-800/50"
          onClick={() => setOpen((prev) => !prev)}
        >
          <span className="flex items-center gap-2">
            <motion.span
              animate={{ rotate: open ? 180 : 0, scale: open ? 1.2 : 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="inline-block"
            >
              <ChevronDown className="h-5 w-5 sm:h-6 sm:w-6 text-green-400" />
            </motion.span>
            {sectionTitle}
          </span>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="overflow-hidden divide-y divide-neutral-800"
            >
              {topics.map((topic, idx) => (
                <motion.div
                  key={idx}
                  variants={topicVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: idx * 0.05 }}
                  className="flex gap-3 items-start px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base text-gray-300 hover:bg-neutral-800/40 transition-all rounded-md"
                >
                  <span className="mt-1 w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-gradient-to-tr from-pink-500 to-violet-400 animate-ping-slow"></span>
                  <p className="leading-relaxed font-bricolage break-words">{topic.contentName}</p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
