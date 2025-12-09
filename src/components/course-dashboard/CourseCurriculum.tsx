import { motion } from "framer-motion";
import { type CourseCurriculumProps } from "@/types/dashboard/CourseCurriculum";

export default function CourseCurriculum({ modules }: CourseCurriculumProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4, ease: "easeInOut" }}
    >
      <h3 className="text-xl md:text-2xl font-semibold text-white mb-6">
        Course Curriculum
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module, index) => (
          <motion.div
            key={module.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="relative bg-neutral-800 rounded-xl p-5 shadow-md border border-neutral-700 hover:shadow-lg hover:border-lime-400 transition-all duration-300"
          >
            <span className="absolute top-2 right-2 bg-lime-400 text-neutral-900 text-xs font-medium px-2 py-1 rounded-full">
              {index + 1}
            </span>
            <h4 className="text-lg font-semibold text-white mb-3">
              {module.moduleName}
            </h4>
            <ul className="space-y-2">
              {module.contents?.map((content) => (
                <li
                  key={content.id}
                  className="flex items-center gap-2 text-sm text-gray-300"
                >
                  <span className="w-1.5 h-1.5 bg-lime-400 rounded-full"></span>
                  {content.contentName}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
