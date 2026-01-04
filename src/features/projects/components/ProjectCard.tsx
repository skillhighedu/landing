import CustomButton from "@/components/common/Button";
import { motion } from "framer-motion";

interface ProjectCardProps {
  index: number;
  title: string;
  description: string;
  difficulty: string;
  time: string;
  onOpen: () => void;
}

export default function ProjectCard({
  index,
  title,
  description,
  difficulty,
  time,
  onOpen,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="
        rounded-xl bg-neutral-900 border border-neutral-800
        hover:border-neutral-700 hover:shadow-md
        transition p-5 flex flex-col
      "
    >
      {/* Top */}
      <div className="flex items-center justify-between text-xs text-neutral-500">
        <span>Project {index + 1}</span>
        <span>{time}</span>
      </div>

      {/* Title */}
      <h3 className="mt-3 text-base font-semibold text-white leading-snug">
        {title}
      </h3>

      {/* Description */}
      <p className="mt-2 text-sm text-neutral-400 line-clamp-3">
        {description}
      </p>

      {/* Footer */}
      <div className="mt-4 pt-4 flex items-center justify-between border-t border-neutral-800">
        <span
          className={`text-xs font-medium ${
            difficulty === "Easy"
              ? "text-green-400"
              : difficulty === "Medium"
              ? "text-yellow-400"
              : "text-red-400"
          }`}
        >
          {difficulty}
        </span>

        <CustomButton
          title="Open"
          onClick={onOpen}
          className="px-4 py-2 text-xs"
        />
      </div>
    </motion.div>
  );
}
