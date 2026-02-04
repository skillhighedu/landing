import { motion } from "framer-motion";
import CircularProgress from "./CircularProgress";

type Props = {
  topicProgress: number;
  quizProgress: number;
  projectProgress: number;
};

export default function ProgressSection({
  topicProgress,
  quizProgress,
  projectProgress,
}: Props) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="
        rounded-2xl p-6 sm:p-8

        /* Light */
        bg-white text-neutral-900

        /* Dark */
        dark:bg-neutral-900 dark:text-white
      "
    >
      <h2 className="mb-6 text-lg font-semibold">
        Your progress
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <ProgressCard
          title="Topics"
          value={topicProgress}
          status={topicProgress === 100 ? "Completed" : "In progress"}
          color="lime"
        />

        <ProgressCard
          title="Quizzes"
          value={quizProgress}
          status={quizProgress === 100 ? "Completed" : "In progress"}
          color="blue"
        />

        <ProgressCard
          title="Projects"
          value={projectProgress}
          status={projectProgress === 100 ? "Completed" : "In progress"}
          color="purple"
        />
      </div>
    </motion.section>
  );
}

function ProgressCard({
  title,
  value,
  status,
  color,
}: {
  title: string;
  value: number;
  status: string;
  color: "lime" | "blue" | "purple";
}) {
  return (
    <div
      className="
        flex flex-col items-center gap-3
        rounded-xl p-4

        /* Light */
        bg-neutral-50 text-neutral-900

        /* Dark */
        dark:bg-neutral-800 dark:text-white
      "
    >
      <CircularProgress value={value} color={color} />

      <div className="text-center">
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          {title}
        </p>
        <p className="text-sm font-medium">
          {status}
        </p>
      </div>
    </div>
  );
}
