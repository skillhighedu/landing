import { motion } from "framer-motion";
import CustomButton from "@/components/common/Button";
import type { QuizCardProps } from "../types";
import { Lock } from "lucide-react";

export default function QuizCard({
  index,
  title,
  description,
  questions,
  onStart,
  locked = false,
}: QuizCardProps & { locked?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: index * 0.04 }}
      className="
        rounded-xl border border-border bg-background
        p-5 sm:p-6
        flex flex-col gap-4
      "
    >
      {/* Header */}
      <div className="flex items-start gap-3">
        <div
          className="
            h-9 w-9 rounded-md
            border border-border
            bg-muted
            flex items-center justify-center
            text-sm font-semibold text-foreground
            shrink-0
          "
        >
          {index + 1}
        </div>

        <div className="min-w-0">
          <h3 className="text-base sm:text-lg text-foreground leading-snug">
            {title}
          </h3>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm font-sans text-muted-foreground leading-relaxed line-clamp-3">
        {description}
      </p>

      {/* Footer */}
      <div className="pt-4 border-t border-border flex items-center font-sans justify-between">
        <span className="text-xs sm:text-sm text-muted-foreground">
          {questions} questions
        </span>

        <CustomButton
          title={locked ? "Locked" : "Start"}
          onClick={!locked ? onStart : undefined}
          disabled={locked}
          icon={locked ? <Lock size={14} /> : undefined}
          className="px-4 py-2 text-sm"
        />
      </div>
    </motion.div>
  );
}
