import { motion } from "framer-motion";
import CustomButton from "@/components/common/Button";

interface BountyCardProps {
  index: number;
  title: string;
  description: string;
  reward: string;
  difficulty: "Easy" | "Medium" | "Hard";
  onOpen: () => void;
}

export default function BountyCard({
  index,
  title,
  description,
  reward,
  difficulty,
  onOpen,
}: BountyCardProps) {
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
      <div className="flex items-center justify-between text-xs text-neutral-500">
        <span>Bounty {index + 1}</span>
        <span className="text-green-400 font-medium">{reward}</span>
      </div>

      <h3 className="mt-3 text-base font-semibold text-white leading-snug">
        {title}
      </h3>

      <p className="mt-2 text-sm text-neutral-400 line-clamp-3">
        {description}
      </p>

      <div className="mt-auto pt-4 flex items-center justify-between border-t border-neutral-800">
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
          title="View"
          onClick={onOpen}
          className="px-4 py-2 text-xs"
        />
      </div>
    </motion.div>
  );
}
