import { ChevronDown } from "lucide-react";
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
  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger */}
      <button
        onClick={() => setCoursesOpen((v: any) => !v)}
        className="
          flex items-center gap-1 text-sm font-medium
          text-neutral-700 dark:text-neutral-300
          hover:text-black dark:hover:text-white
          transition-colors
        "
      >
        Programs
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${
            coursesOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown */}
      {coursesOpen && (
        <div
          className="
            absolute left-0 top-full mt-4 w-[720px]
            rounded-2xl
            bg-white dark:bg-neutral-900
            backdrop-blur-xl
            border border-black/10 dark:border-white/10
            shadow-2xl
            p-6
          "
        >
          <div className="flex gap-6">
            <DepartmentsSidebar
              departments={departments}
              selectedIndex={selectedDept}
              onSelect={setSelectedDept}
            />

            <CoursesGrid
              deptName={departments[selectedDept]?.departmentName ?? ""}
              courses={departments[selectedDept]?.courses ?? []}
              onSelectCourse={onSelectCourse}
            />
          </div>
        </div>
      )}
    </div>
  );
}
