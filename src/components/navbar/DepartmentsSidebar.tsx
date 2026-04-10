import type { Department } from "./types";

export default function DepartmentsSidebar({
  departments,
  selectedIndex,
  onSelect,
}: {
  departments: Department[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}) {
  return (
    <div
      className="
        flex flex-row gap-1 p-3 overflow-x-auto no-scrollbar
        sm:flex-col sm:overflow-x-visible
        sm:max-h-[320px] sm:w-44 sm:shrink-0 sm:overflow-y-auto sm:overscroll-contain sm:p-4
        border-b sm:border-b-0
        border-black/6 dark:border-white/6
      "
    >
      {departments.map((dept, index) => {
        const isActive = selectedIndex === index;
        return (
          <button
            key={dept.uuid}
            onClick={() => onSelect(index)}
            className={`
              shrink-0 text-left px-3 py-2 rounded-lg text-sm font-medium
              whitespace-nowrap sm:whitespace-normal
              transition-colors duration-150
              ${
                isActive
                  ? "bg-black/8 text-black dark:bg-white/10 dark:text-white"
                  : "text-neutral-500 hover:bg-black/5 hover:text-black dark:text-neutral-400 dark:hover:bg-white/5 dark:hover:text-white"
              }
            `}
          >
            {dept.departmentName}
          </button>
        );
      })}
    </div>
  );
}
