import { motion } from "framer-motion";
import { BookMarked, Layers2 } from "lucide-react";
import CurriculumModuleCard from "./CurriculumModule";
import type { CourseCurriculumProps } from "./types";

export default function CourseCurriculum({
  modules,
}: CourseCurriculumProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="space-y-6"
    >
      <div className="rounded-[1.75rem] border border-border bg-card px-4 py-5 shadow-sm sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              <BookMarked className="h-4 w-4" />
              Curriculum
            </div>
            <h3 className="mt-3 font-mono text-xl font-semibold sm:text-2xl">
              Course curriculum
            </h3>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-muted-foreground">
              Move module by module through the course content with a clearer overview of what comes next.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-background px-4 py-3">
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
              <Layers2 className="h-4 w-4" />
              Modules
            </div>
            <div className="mt-2 font-mono text-2xl font-semibold">{modules.length}</div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {modules.map((module, index) => (
          <CurriculumModuleCard
            key={module.id}
            module={module}
            index={index}
          />
        ))}
      </div>
    </motion.section>
  );
}
