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
    <div className="w-48 flex flex-col gap-1">
      {departments.map((dept, index) => {
        const isActive = selectedIndex === index;

        return (
          <button
            key={dept.uuid}
            onClick={() => onSelect(index)}
            className={`
              text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors
              ${
                isActive
                  ? `
                    bg-black/10 text-black
                    dark:bg-white/10 dark:text-white
                  `
                  : `
                    text-neutral-600 hover:bg-black/5 hover:text-black
                    dark:text-neutral-400 dark:hover:bg-white/5 dark:hover:text-white
                  `
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
