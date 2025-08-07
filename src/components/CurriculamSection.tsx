import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  sectionTitle: string;
  topics: string[];
}

export default function CurriculumSection({ sectionTitle, topics }: Props) {
  const [open, setOpen] = useState(true);

  return (
    <div className="w-full max-w-4xl mx-auto mb-6 rounded-xl pixel-border shadow-[4px_4px_0_#000] hover:shadow-[6px_6px_0_#000] bg-gradient-to-br from-[#0f0f0f] via-[#1f1f1f] to-[#0f0f0f] p-[2px] ">
      <div className="rounded-xl bg-neutral-900 backdrop-blur bg-opacity-80">
        <button
          className="w-full flex items-center justify-between px-6 py-5 text-white text-lg  transition hover:bg-neutral-800/50"
          onClick={() => setOpen((prev) => !prev)}
        >
          <span className="flex items-center gap-2">
            {open ? (
              <ChevronUp className="h-5 w-5 text-green-400 animate-pulse" />
            ) : (
              <ChevronDown className="h-5 w-5 text-pink-400 animate-pulse" />
            )}
            {sectionTitle}
          </span>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden divide-y divide-neutral-800"
            >
              {topics.map((topic, idx) => (
                <div
                  key={idx}
                  className="flex gap-3 items-start px-6 py-4 text-sm text-gray-300 hover:bg-neutral-800/40 transition"
                >
                  <span className="mt-1 w-2 h-2 rounded-full bg-gradient-to-tr from-pink-500 to-violet-400 animate-ping-slow"></span>
                  <p className="leading-relaxed font-mono">{topic}</p>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
