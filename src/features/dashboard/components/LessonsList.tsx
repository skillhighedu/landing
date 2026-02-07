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
  onLockedLessonClick?: (lesson: LessonTopic) => void;
}

export default function Sidebar({
  lessonsList,
  activeLessonId,
  completedLessonIds = [],
  onLessonSelect,
  onToggleComplete,
  onLockedLessonClick,
}: SidebarProps) {
  if (!lessonsList.length) {
    return (
      <div className="px-5 py-4 text-sm text-neutral-500">
        No lessons available.
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto pr-2">
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
                  isLocked
                    ? "opacity-60 cursor-pointer"
                    : "cursor-pointer hover:bg-neutral-100 dark:hover:bg-white/5",
                  isActive &&
                    !isLocked &&
                    "bg-neutral-900 text-white border-transparent"
                )}
                onClick={() => {
                  if (isLocked) {
                    onLockedLessonClick?.(item);
                  } else {
                    onLessonSelect(item);
                  }
                }}
              >
                <Checkbox
                  checked={isCompleted}
                  disabled={isLocked}
                  onCheckedChange={() =>
                    !isLocked && onToggleComplete?.(item.id)
                  }
                  onClick={(e) => e.stopPropagation()}
                  className="mt-1"
                />

                <div className="mt-0.5 w-4 flex justify-center">
                  {isLocked ? (
                    <Lock className="h-4 w-4 opacity-60" />
                  ) : isActive ? (
                    <Play className="h-4 w-4" />
                  ) : (
                    <span className="text-xs opacity-60">{index + 1}</span>
                  )}
                </div>

                <div className="flex-1">
                  <p className="text-sm font-medium leading-snug">
                    {item.title}
                  </p>

                  {isLocked && (
                    <p className="mt-0.5 text-xs opacity-60">
                      Locked · Buy course to unlock
                    </p>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
