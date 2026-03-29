import { motion } from "framer-motion";
import { BookOpenCheck, Layers3, PlayCircle } from "lucide-react";
import CourseHeaderActions from "./CourseHeaderActions";
import type { CourseHeaderProps } from "./types";

export default function CourseHeader({
  courseName,
  courseThumbnail,
  slug,
  mode,
}: CourseHeaderProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="mx-auto mb-8 mt-2 max-w-7xl px-0 sm:mb-10"
    >
      <div
        className="
          relative flex min-h-[280px] flex-col justify-end overflow-hidden rounded-[1.75rem]
          border border-black/5 sm:min-h-[340px] lg:min-h-[420px]
        "
      >
        <img
          src={courseThumbnail}
          alt={courseName}
          className="absolute inset-0 h-full w-full scale-[1.03] object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/55 to-black/35" />
        <div className="absolute -right-12 top-8 h-36 w-36 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-black/45 to-transparent" />

        <div
          className="
            relative z-10
            w-full
            p-4 text-white sm:p-6 lg:p-8
          "
        >
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(280px,0.8fr)] lg:items-end">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-white/85">
                <BookOpenCheck className="h-4 w-4" />
                Course Dashboard
              </div>

              <h1 className="mt-4  text-2xl t sm:text-3xl lg:text-5xl">
                {courseName}
              </h1>

              <p className="mt-3 max-w-2xl font-mono text-sm leading-7 text-white/80 sm:text-base">
                Start from the essentials, track your progress, and move through the curriculum with a clearer learning flow.
              </p>
            </div>

          </div>

          <CourseHeaderActions slug={slug} mode={mode} />
        </div>
      </div>
    </motion.section>
  );
}
