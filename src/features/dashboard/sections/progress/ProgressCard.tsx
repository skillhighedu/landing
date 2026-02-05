import { Lock } from "lucide-react";
import CircularProgress from "./CircularProgress";

interface Props {
  title: string;
  value: number;
  color: "lime" | "blue" | "purple";
  locked?: boolean;
}

export default function ProgressCard({
  title,
  value,
  color,
  locked = false,
}: Props) {
  return (
    <div
      className={`
        relative rounded-2xl p-6 text-center
        bg-neutral-50 dark:bg-neutral-800
        transition-all duration-300
        ${locked ? "opacity-70" : "hover:-translate-y-1 hover:shadow-lg"}
      `}
    >
      <CircularProgress value={value} color={color} />

      <div className="mt-5 space-y-1">
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          {title}
        </p>

        {!locked && (
          <p className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
            {value === 100 ? "Completed" : "In progress"}
          </p>
        )}
      </div>

      {/* Lock Overlay */}
      {locked && (
        <div className="absolute inset-0 rounded-2xl bg-white/60 dark:bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center gap-2">
          <Lock size={18} className="text-neutral-600 dark:text-neutral-300" />
          <span className="text-xs font-medium">Locked</span>
        </div>
      )}
    </div>
  );
}
