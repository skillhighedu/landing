import { motion } from "framer-motion";
import type { CourseCurriculumProps } from "@/types/dashboard/CourseCurriculum";

export default function CourseCurriculum({ modules }: CourseCurriculumProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="space-y-6"
    >
      <h3 className="text-lg sm:text-xl font-semibold">
        Course curriculum
      </h3>

      <div className="space-y-4">
        {modules.map((module, index) => (
          <motion.div
            key={module.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.05 }}
            className="
              rounded-xl p-5

              /* Light */
              bg-white

              /* Dark */
              dark:bg-neutral-900
            "
          >
            {/* Module header */}
            <div className="flex items-start gap-4">
              <div
                className="
                  flex h-8 w-8 items-center justify-center
                  rounded-full text-sm font-medium

                  bg-primary/10 text-primary
                "
              >
                {index + 1}
              </div>

              <div className="flex-1">
                <h4 className="font-medium">
                  {module.moduleName}
                </h4>

                <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                  {module.contents?.length ?? 0} lessons
                </p>
              </div>
            </div>

            {/* Lessons */}
            {module.contents?.length > 0 && (
              <ul className="mt-4 space-y-2 pl-12 font-sans">
                {module.contents.map((content) => (
                  <li
                    key={content.id}
                    className="
                      text-sm
                      text-neutral-600 dark:text-neutral-400
                      flex items-start gap-2
                    "
                  >
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-neutral-400 dark:bg-neutral-600" />
                    <span>{content.contentName}</span>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
