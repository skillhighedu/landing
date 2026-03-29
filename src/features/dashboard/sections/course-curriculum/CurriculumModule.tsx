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
        rounded-[1.5rem] border border-border bg-white p-4 shadow-sm sm:p-5 dark:bg-neutral-900
      "
    >
      <div className="flex items-start gap-4">
        <div
          className="
            flex h-9 w-9 items-center justify-center
            rounded-2xl font-mono text-sm font-medium
            bg-primary/10 text-primary
          "
        >
          {String(index + 1).padStart(2, "0")}
        </div>

        <div className="flex-1">
          <h4 className="font-mono text-base font-medium sm:text-lg">
            {module.moduleName}
          </h4>

          <p className="mt-1 font-mono text-xs uppercase tracking-[0.16em] text-neutral-500 dark:text-neutral-400">
            {module.contents?.length ?? 0} lessons
          </p>
        </div>
      </div>

      {module.contents?.length ? (
        <ul className="mt-4 space-y-2 pl-0 sm:pl-13">
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
