import { motion } from "framer-motion";
import ProgressCard from "./ProgressCard";
import { DEMO_PROGRESS } from "./demoData";
import type { DashboardMode, ProgressData } from "./types";

interface Props {
  mode: DashboardMode;
  realData?: ProgressData;
}

export default function ProgressSection({ mode, realData }: Props) {
  const isDemo = mode === "demo";

  const data: ProgressData = isDemo
    ? DEMO_PROGRESS
    : realData ?? { topics: 0, quizzes: 0, projects: 0 };

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-3xl p-6 sm:p-8 bg-white dark:bg-neutral-900"
    >
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Your progress</h2>

        {isDemo && (
          <span className="text-xs px-3 py-1 rounded-full bg-yellow-100 text-yellow-900 dark:bg-yellow-400/10 dark:text-yellow-300">
            Demo preview
          </span>
        )}
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <ProgressCard title="Topics" value={data.topics} color="lime" locked={isDemo} />
        <ProgressCard
          title="Quizzes"
          value={data.quizzes}
          color="blue"
          locked={isDemo}
        />
        <ProgressCard
          title="Projects"
          value={data.projects}
          color="purple"
          locked={isDemo}
        />
      </div>

      {/* Demo CTA */}
      {isDemo && (
        <div className="mt-8 rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-700 p-5 text-center">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Enroll to unlock quizzes, projects, and real progress tracking.
          </p>
        </div>
      )}
    </motion.section>
  );
}
