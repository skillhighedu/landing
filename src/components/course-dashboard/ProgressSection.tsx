import { motion } from "framer-motion";
import type { CourseProgress } from "@/data/courseProgress";
import CircularProgress from "./CircularProgress";

interface ProgressSectionProps {
  progress: CourseProgress;
}

export default function ProgressSection({ progress }: ProgressSectionProps) {
  const topicsPercentage = Math.round((progress.topicsCompleted / progress.totalTopics) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      <div className="bg-neutral-900 p-6 rounded-2xl shadow-xl border border-neutral-700">
        <h2 className="text-2xl font-semibold mb-6 text-primary">Your Progress</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Topics Progress */}
          <div className="bg-neutral-800 p-6 rounded-xl border border-neutral-700 text-center">
            <CircularProgress value={topicsPercentage} color="lime" />
            <h3 className="text-sm text-gray-400 mb-1">Topics Completed</h3>
            <p className="text-lg font-semibold">{progress.topicsCompleted}/{progress.totalTopics}</p>
          </div>

          {/* Quiz Progress */}
          <div className="bg-neutral-800 p-6 rounded-xl border border-neutral-700 text-center">
            <CircularProgress value={progress.quizProgress} color="blue" />
            <h3 className="text-sm text-gray-400 mb-1">Quiz Progress</h3>
            <p className="text-lg font-semibold">Completed</p>
          </div>

          {/* Project Progress */}
          <div className="bg-neutral-800 p-6 rounded-xl border border-neutral-700 text-center">
            <CircularProgress value={progress.projectProgress} color="purple" />
            <h3 className="text-sm text-gray-400 mb-1">Project Progress</h3>
            <p className="text-lg font-semibold">{progress.projectProgress === 100 ? "Completed" : "In Progress"}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
