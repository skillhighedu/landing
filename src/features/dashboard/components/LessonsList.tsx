import type { LessonTopic } from "@/types/course";
import { Play, Lock } from "lucide-react";
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
  completedLessonIds = [],
  onLessonSelect,
  onToggleComplete,
}: SidebarProps) {
  if (!lessonsList.length) {
    return (
      <div className="px-5 py-4 text-sm text-neutral-500 dark:text-white/50">
        No lessons available.
      </div>
    );
  }

  return (
    <div
      className="
        h-full max-h-[calc(100vh-2rem)]
        overflow-y-auto pr-2
        scrollbar-thin scrollbar-track-transparent
        scrollbar-thumb-neutral-300 dark:scrollbar-thumb-white/20
      "
    >
      <ul className="flex flex-col gap-2 px-2 py-1">
        {lessonsList.map((item, index) => {
          const isActive = item.id === activeLessonId;
          const isCompleted = completedLessonIds.includes(item.id);
          const isLocked = item.locked === true;

          return (
            <li key={item.id}>
              <div
                className={clsx(
                  "group flex items-start gap-3 rounded-xl p-3 border transition-all",
                  "bg-white dark:bg-neutral-900",
                  isLocked
                    ? "opacity-50 cursor-not-allowed border-neutral-200 dark:border-white/5"
                    : "cursor-pointer hover:bg-neutral-100 dark:hover:bg-white/5 border-neutral-200 dark:border-white/10",
                  isActive &&
                    !isLocked &&
                    "bg-neutral-900 text-white dark:bg-neutral-950 dark:text-neutral-900 border-transparent"
                )}
                onClick={() => !isLocked && onLessonSelect(item)}
              >
                {/* Checkbox */}
                <Checkbox
                  checked={isCompleted}
                  disabled={isLocked}
                  onCheckedChange={() =>
                    !isLocked && onToggleComplete?.(item.id)
                  }
                  onClick={(e) => e.stopPropagation()}
                  className={clsx(
                    "mt-1",
                    !isLocked &&
                      "data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500 "
                  )}
                />

                {/* Icon */}
                <div className="mt-0.5 w-4 flex justify-center">
                  {isLocked ? (
                    <Lock className="h-4 w-4 opacity-60 " />
                  ) : isActive ? (
                    <Play className="h-4 w-4 text-primary dark:text-white" />
                  ) : (
                    <span className="text-xs opacity-60 text-primary dark:text-white">{index + 1}</span>
                  )}
                </div>

                {/* Text */}
                <div className="flex-1">
                  <p
                    className={clsx(
                      "text-sm font-medium text-primary dark:text-white leading-snug transition-colors",
                      isLocked
                        ? "opacity-60"
                        : isCompleted
                        ? "opacity-50 line-through"
                        : "opacity-90 group-hover:opacity-100"
                    )}
                  >
                    {item.title}
                  </p>

                  {isLocked && (
                    <p className="mt-0.5 text-xs opacity-50">
                      Locked · Buy course to unlock
                    </p>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="h-6" />
    </div>
  );
}
