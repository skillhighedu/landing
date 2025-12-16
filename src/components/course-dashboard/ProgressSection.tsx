import { motion } from "framer-motion";

import CircularProgress from "./CircularProgress";


export default function ProgressSection({topicProgress,projectProgress,quizProgress  }: {topicProgress: number;
  projectProgress: number;
  quizProgress: number}) {


  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      <div className="bg-neutral-900 p-6 rounded-2xl shadow-xl border border-neutral-700">
        <h2 className="text-2xl   mb-6 ">Your Progress</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Topics Progress */}
          <div className="bg-neutral-800 p-6 rounded-xl border border-neutral-700 text-center">
            <CircularProgress value={topicProgress} color="lime" />
            <h3 className="text-sm text-gray-400 mb-1">Topics Completed</h3>
            <p className="text-lg ">{topicProgress === 100 ? "Completed" : "In Progress"}</p>
          </div>

          {/* Quiz Progress */}
          <div className="bg-neutral-800 p-6 rounded-xl border border-neutral-700 text-center">
            <CircularProgress value={quizProgress} color="blue" />
            <h3 className="text-sm text-gray-400 mb-1">Quiz Progress</h3>
            <p className="text-lg ">Completed</p>
          </div>

          {/* Project Progress */}
          <div className="bg-neutral-800 p-6 rounded-xl border border-neutral-700 text-center">
            <CircularProgress value={projectProgress} color="purple" />
            <h3 className="text-sm text-gray-400 mb-1">Project Progress</h3>
            <p className="text-lg ">{projectProgress === 100 ? "Completed" : "In Progress"}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
