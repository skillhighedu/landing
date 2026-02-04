import type { LessonTopic } from "@/types/course";
import { Play } from "lucide-react";
import clsx from "clsx";
import { Checkbox } from "@/components/ui/checkbox";

interface SidebarProps {
  lessonsList: LessonTopic[];
  activeLessonId?: string;
  completedLessonIds?: string[];
  onLessonSelect: (lesson: LessonTopic) => void;
  onToggleComplete?: (lessonId: string) => void;
}

export default function Sidebar({
  lessonsList,
  activeLessonId,
  completedLessonIds,
  onLessonSelect,
  onToggleComplete,
}: SidebarProps) {
  if (!lessonsList || lessonsList.length === 0) {
    return (
      <div className="px-5 py-4 text-sm text-white/50">
        No lessons available.
      </div>
    );
  }

  return (
    <div className="w-full h-full max-h-[calc(100vh-2rem)] overflow-y-auto pr-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/15 hover:scrollbar-thumb-white/25">
      <ul className="flex flex-col gap-2 px-1">
        {lessonsList.map((item, index) => {
          const isActive = item.id === activeLessonId;
          const isCompleted = completedLessonIds?.includes(item.id) ?? false;

          return (
            <li key={item.id}>
              <div
                className={clsx(
                  "group flex items-start gap-3 rounded-xl p-3 transition-all cursor-pointer",
                  "border border-white/5",
                  "hover:bg-white/5 hover:border-white/10",
                  isActive
                    ? "bg-white/10 border-white/20"
                    : "bg-white/2"
                )}
              >
                {/* ShadCN Checkbox */}
                <Checkbox
                  checked={isCompleted}
                  onCheckedChange={() => onToggleComplete?.(item.id)}
                  onClick={(e) => e.stopPropagation()}
                  className="mt-1 data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
                />

                {/* Main clickable area */}
                <button
                  onClick={() => onLessonSelect(item)}
                  className="flex flex-1 items-start gap-3 text-left"
                >
                  {/* Icon / Index */}
                  <div className="mt-0.5">
                    {isActive ? (
                      <Play className="h-4 w-4 text-white" />
                    ) : (
                      <span className="text-xs text-white/30">
                        {index + 1}
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <p
                      className={clsx(
                        "text-sm font-medium leading-snug transition-colors",
                        isCompleted
                          ? "text-white/40 line-through"
                          : isActive
                          ? "text-white"
                          : "text-white/80",
                        "group-hover:text-white"
                      )}
                    >
                      {item.title}
                    </p>
                  </div>
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="h-6" />
    </div>
  );
}
