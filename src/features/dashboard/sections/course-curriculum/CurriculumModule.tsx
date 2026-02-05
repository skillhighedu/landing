import { motion } from "framer-motion";
import CurriculumLessonItem from "./CurriculumLesson";
import type { CurriculumModule } from "./types";

interface Props {
  module: CurriculumModule;
  index: number;
}

export default function CurriculumModuleCard({
  module,
  index,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: index * 0.05 }}
      className="
        rounded-xl p-5
        bg-white dark:bg-neutral-900
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
      {module.contents?.length ? (
        <ul className="mt-4 space-y-2 pl-12 font-sans">
          {module.contents.map((lesson) => (
            <CurriculumLessonItem
              key={lesson.id}
              lesson={lesson}
            />
          ))}
        </ul>
      ) : null}
    </motion.div>
  );
}
