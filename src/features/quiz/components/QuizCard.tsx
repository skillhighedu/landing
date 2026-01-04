import { motion } from "framer-motion";
import CustomButton from "@/components/common/Button";

interface QuizCardProps {
  index: number;
  title: string;
  description: string;
  questions: number;
  onStart: () => void;
}

export default function QuizCard({
  index,
  title,
  description,
  questions,
  onStart,
}: QuizCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="
        group relative
        rounded-2xl bg-neutral-900
        border border-neutral-800
        hover:border-green-500/40
        hover:shadow-[0_0_40px_-10px_rgba(34,197,94,0.3)]
        transition-all duration-300
        p-6 sm:p-7 flex flex-col
      "
    >
      {/* Glow Layer */}
      <div className="absolute inset-0 rounded-2xl bg-green-500/5 opacity-0 group-hover:opacity-100 transition pointer-events-none" />

      {/* Header */}
      <div className="relative flex items-center gap-4">
        {/* Number */}
        <div
          className="
            w-12 h-12 sm:w-14 sm:h-14
            rounded-xl
            bg-linear-to-br from-green-500/25 to-green-500/5
            border border-green-500/40
            flex items-center justify-center
            text-green-400 font-bold text-base sm:text-lg
            shrink-0
          "
        >
          {index + 1}
        </div>

        {/* Title */}
        <div className="min-w-0">
          <p className="text-[10px] sm:text-xs uppercase tracking-wider text-neutral-500">
            Quiz {index + 1}
          </p>
          <h3 className="text-base sm:text-lg text-white leading-snug line-clamp-2">
            {title}
          </h3>
        </div>
      </div>

      {/* Description */}
      <p className="relative text-sm text-neutral-400 leading-relaxed mt-4 line-clamp-3">
        {description}
      </p>

      {/* Footer */}
      <div className="relative mt-4 pt-5 flex items-center justify-between border-t  border-neutral-800">
        <span className="text-xs sm:text-sm text-neutral-500">
          {questions} questions
        </span>

        <CustomButton
          title="Start"
          onClick={onStart}
          className="
            px-4 py-2 sm:px-5 sm:py-2.5
            text-xs sm:text-sm
        
          "
          
        />
      </div>
    </motion.div>
  );
}
