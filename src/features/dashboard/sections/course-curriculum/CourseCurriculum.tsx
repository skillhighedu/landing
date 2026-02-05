import { motion } from "framer-motion";
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
      <h3 className="text-lg sm:text-xl font-semibold">
        Course curriculum
      </h3>

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
