import { Play, Lock } from "lucide-react";
import clsx from "clsx";
import { Checkbox } from "@/components/ui/checkbox";
import type { CheckedState } from "@radix-ui/react-checkbox";
import type { CourseLesson } from "../types";

interface SidebarProps {
  lessonsList: CourseLesson[];
  activeLessonId?: string;
  completedLessonIds?: string[];
  pendingLessonIds?: string[];
  onLessonSelect: (lesson: CourseLesson) => void;
  onToggleComplete?: (lessonId: string, completed: boolean) => void;
  onLockedLessonClick?: (lesson: CourseLesson) => void;
}

export default function Sidebar({
  lessonsList,
  activeLessonId,
  completedLessonIds = [],
  pendingLessonIds = [],
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
    <div className="max-h-[calc(100vh-260px)] overflow-y-auto pr-1">
      <ul className="flex flex-col gap-3">
        {lessonsList.map((item, index) => {
          const isActive = item.id === activeLessonId;
          const isCompleted = completedLessonIds.includes(item.id);
          const isLocked = item.locked === true;
          const isPending = pendingLessonIds.includes(item.id);

          return (
            <li key={item.id}>
              <div
                className={clsx(
                  "group flex items-start gap-3 rounded-2xl border px-3 py-3.5 transition-all",
                  isLocked
                    ? "cursor-pointer border-border/70 bg-muted/40 opacity-75"
                    : "cursor-pointer border-border bg-background hover:border-primary/20 hover:bg-muted/50 hover:text-primary",
                  isActive &&
                    !isLocked &&
                    "border-primary/20 bg-primary/10 text-primary shadow-sm"
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
                  disabled={isLocked || isPending}
                  onCheckedChange={(checked: CheckedState) => {
                    if (isLocked || isPending) return;
                    onToggleComplete?.(item.id, checked === true);
                  }}
                  onClick={(e) => e.stopPropagation()}
                  className="mt-1"
                />

                <div className="mt-0.5 flex w-7 justify-center">
                  {isLocked ? (
                    <Lock className="h-4 w-4 opacity-60" />
                  ) : isActive ? (
                    <Play className="h-4 w-4" />
                  ) : (
                    <span className="font-mono text-[11px] uppercase tracking-[0.16em] opacity-60">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium leading-snug text-foreground">
                    {item.title}
                  </p>

                  {isLocked && (
                    <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.12em] opacity-60">
                      Locked - Buy course to unlock
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
