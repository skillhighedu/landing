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
    : realData ?? { topics: 0, quizzes: 0, projects: 0, mentorPercentage: null };

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-3xl bg-white p-6 sm:p-8 dark:bg-neutral-900"
    >
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Your progress</h2>

        {isDemo && (
          <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs text-yellow-900 dark:bg-yellow-400/10 dark:text-yellow-300">
            Demo preview
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <ProgressCard title="Topics" value={data.topics} color="lime" locked={isDemo} />
        <ProgressCard title="Quizzes" value={data.quizzes} color="blue" locked={isDemo} />
        <ProgressCard title="Projects" value={data.projects} color="purple" locked={isDemo} />

        <MentorPercentageCard
          locked={isDemo}
          mentorPercentage={data.mentorPercentage ?? null}
        />
      </div>

      {isDemo && (
        <div className="mt-8 rounded-2xl border border-dashed border-neutral-300 p-5 text-center dark:border-neutral-700">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Enroll to unlock quizzes, projects, mentor feedback, and real progress tracking.
          </p>
        </div>
      )}
    </motion.section>
  );
}

function MentorPercentageCard({
  mentorPercentage,
  locked,
}: {
  mentorPercentage: number | null;
  locked: boolean;
}) {
  if (locked) {
    return (
      <div className="relative rounded-2xl bg-neutral-50 p-6 text-center transition-all duration-300 dark:bg-neutral-800">
        <div className="flex h-full min-h-[248px] flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-300 px-5 dark:border-neutral-700">
          <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-200">
            Mentor Score
          </p>
          <p className="mt-3 text-xs font-mono leading-6 text-neutral-500 dark:text-neutral-400">
            Mentor review percentage is available after you start submitting real projects.
          </p>
        </div>
      </div>
    );
  }

  const hasPercentage = typeof mentorPercentage === "number";

  return (
    <div className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-white p-6 text-left shadow-sm dark:border-emerald-900 dark:from-emerald-950/20 dark:via-neutral-900 dark:to-neutral-900">
      <div className="flex items-center justify-between">
        <p className="text-sm text-neutral-500 dark:text-neutral-400">Mentor Score</p>
        <span className="rounded-full border border-emerald-200 bg-white/80 px-2.5 py-1 text-[11px]  text-emerald-700 dark:border-emerald-800 dark:bg-neutral-900/60 dark:text-emerald-400">
          Review
        </span>
      </div>

      {hasPercentage ? (
        <>
          <div className="mt-6">
            <p className="text-4xl font-bold text-neutral-900 dark:text-white">
              {mentorPercentage}%
            </p>
            <p className="mt-2 text-sm font-mono text-neutral-600 dark:text-neutral-300">
              This percentage was shared by your mentor based on your project review.
            </p>
          </div>

          <div className="mt-6 h-2.5 overflow-hidden rounded-full bg-emerald-100 dark:bg-emerald-950/30">
            <div
              className="h-full rounded-full bg-emerald-500 transition-all duration-500"
              style={{ width: `${mentorPercentage}%` }}
            />
          </div>
        </>
      ) : (
        <div className="mt-6 flex min-h-[168px] items-center rounded-2xl border border-dashed border-neutral-200 bg-white/70 px-5 py-6 dark:border-neutral-700 dark:bg-neutral-900/50">
          <p className="text-sm leading-6 text-neutral-600 dark:text-neutral-300">
            Your percentage will be sent by your mentor after reviewing your project.
          </p>
        </div>
      )}
    </div>
  );
}
