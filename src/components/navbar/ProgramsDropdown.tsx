import { ChevronDown, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import DepartmentsSidebar from "./DepartmentsSidebar";
import CoursesGrid from "./CoursesGrid";
import type { Department } from "./types";

export default function ProgramsDropdown({
  departments,
  selectedDept,
  setSelectedDept,
  coursesOpen,
  setCoursesOpen,
  onSelectCourse,
  dropdownRef,
}: {
  departments: Department[];
  selectedDept: number;
  setSelectedDept: (i: number) => void;
  coursesOpen: boolean;
  setCoursesOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSelectCourse: (slug: string) => void;
  dropdownRef: React.RefObject<HTMLDivElement | null>;
}) {
  const handleSelectCourse = (slug: string) => {
    onSelectCourse(slug);
    setCoursesOpen(false);
  };

  useEffect(() => {
    if (!coursesOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [coursesOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger */}
      <button
        onClick={() => setCoursesOpen((v) => !v)}
        className={`
          flex items-center gap-1 text-sm font-medium transition-colors duration-200
          ${
            coursesOpen
              ? "text-black dark:text-white"
              : "text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white"
          }
        `}
      >
        Programs
        <motion.span
          animate={{ rotate: coursesOpen ? 180 : 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="inline-flex"
        >
          <ChevronDown size={14} />
        </motion.span>
      </button>

      {/* Backdrop — mobile only */}
      <AnimatePresence>
        {coursesOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-30 bg-black/40 lg:hidden"
            onClick={() => setCoursesOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Dropdown panel */}
      <AnimatePresence>
        {coursesOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="
              fixed inset-x-3 bottom-3 z-40 rounded-2xl
              sm:absolute sm:inset-x-auto sm:bottom-auto
              sm:left-0 sm:top-full sm:mt-3
              sm:w-[580px] md:w-[660px]
              bg-white dark:bg-neutral-900
              border border-black/8 dark:border-white/8
              shadow-2xl shadow-black/15 dark:shadow-black/50
              overflow-hidden
            "
            onWheelCapture={(event) => {
              event.stopPropagation();
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-black/6 dark:border-white/6">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
                  Browse
                </p>
                <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-100 mt-0.5">
                  {departments[selectedDept]?.departmentName ?? "Programs"}
                </p>
              </div>
              <button
                onClick={() => setCoursesOpen(false)}
                className="
                  flex items-center justify-center h-7 w-7 rounded-full
                  bg-neutral-100 dark:bg-neutral-800
                  text-neutral-500 dark:text-neutral-400
                  hover:bg-neutral-200 dark:hover:bg-neutral-700
                  hover:text-neutral-800 dark:hover:text-neutral-100
                  transition-colors duration-150
                "
                aria-label="Close programs menu"
              >
                <X size={13} />
              </button>
            </div>

            {/* Body */}
            <div className="flex max-h-[min(75vh,420px)] flex-col overflow-hidden sm:flex-row">
              <DepartmentsSidebar
                departments={departments}
                selectedIndex={selectedDept}
                onSelect={setSelectedDept}
              />

              {/* Divider */}
              <div className="h-px w-full sm:h-auto sm:w-px bg-black/6 dark:bg-white/6 sm:self-stretch" />

              <CoursesGrid
                deptName={departments[selectedDept]?.departmentName ?? ""}
                courses={departments[selectedDept]?.courses ?? []}
                onSelectCourse={handleSelectCourse}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
