import { motion } from "framer-motion";

interface Props {
  value: number;
  color: "lime" | "blue" | "purple";
}

const COLORS = {
  lime: "stroke-lime-500",
  blue: "stroke-blue-500",
  purple: "stroke-purple-500",
};

export default function CircularProgress({ value, color }: Props) {
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(value, 100);

  return (
    <div className="relative h-24 w-24 mx-auto">
      <svg className="h-full w-full -rotate-90">
        <circle
          cx="48"
          cy="48"
          r={radius}
          strokeWidth="6"
          className="stroke-neutral-200 dark:stroke-neutral-700"
          fill="none"
        />

        <motion.circle
          cx="48"
          cy="48"
          r={radius}
          strokeWidth="6"
          strokeLinecap="round"
          className={COLORS[color]}
          fill="none"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{
            strokeDashoffset:
              circumference - (progress / 100) * circumference,
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </svg>

      <span className="absolute inset-0 flex items-center justify-center text-lg font-semibold">
        {progress}%
      </span>
    </div>
  );
}
