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
  variant?: "desktop" | "mobile";
}

export default function Sidebar({
  lessonsList,
  activeLessonId,
  completedLessonIds = [],
  pendingLessonIds = [],
  onLessonSelect,
  onToggleComplete,
  onLockedLessonClick,
  variant = "desktop",
}: SidebarProps) {
  const isMobile = variant === "mobile";

  if (!lessonsList.length) {
    return (
      <div className="px-5 py-4 text-sm text-neutral-500">
        No lessons available.
      </div>
    );
  }

  return (
    <div
      className={clsx(
        "overflow-y-auto overscroll-y-contain pr-1",
        isMobile ? "h-full pb-6" : "max-h-[calc(100vh-260px)]"
      )}
    >
      <ul className={clsx("flex flex-col", isMobile ? "gap-2.5" : "gap-3")}>
        {lessonsList.map((item, index) => {
          const isActive = item.id === activeLessonId;
          const isCompleted = completedLessonIds.includes(item.id);
          const isLocked = item.locked === true;
          const isPending = pendingLessonIds.includes(item.id);

          return (
            <li key={item.id}>
              <div
                className={clsx(
                  "group flex items-start gap-3 rounded-2xl border transition-all",
                  isMobile ? "px-4 py-4 shadow-sm" : "px-3 py-3.5",
                  isLocked
                    ? "cursor-pointer border-border/70 bg-muted/40 opacity-75"
                    : "cursor-pointer border-border bg-background hover:border-primary/20 hover:bg-muted/50 hover:text-primary",
                  isActive &&
                    !isLocked &&
                    "border-primary/30 bg-primary/10 text-primary shadow-sm"
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
                  className={clsx("mt-1", isMobile && "h-5 w-5 rounded-md")}
                />

                <div
                  className={clsx(
                    "mt-0.5 flex justify-center",
                    isMobile ? "w-8" : "w-7"
                  )}
                >
                  {isLocked ? (
                    <Lock className="h-4 w-4 opacity-60" />
                  ) : isActive ? (
                    <Play className="h-4 w-4" />
                  ) : (
                    <span
                      className={clsx(
                        "font-mono uppercase tracking-[0.16em] opacity-60",
                        isMobile ? "text-xs" : "text-[11px]"
                      )}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p
                    className={clsx(
                      "font-medium leading-snug text-foreground",
                      isMobile ? "text-[15px]" : "text-sm"
                    )}
                  >
                    {item.title}
                  </p>

                  {!isLocked && isMobile && (
                    <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                      Lesson {String(index + 1).padStart(2, "0")}
                    </p>
                  )}

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
