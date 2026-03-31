import { useEffect } from "react";
import Sidebar from "@/features/dashboard/components/LessonsList";
import type { CourseLesson } from "../dashboard/types";

interface Props {
  open: boolean;
  onClose: () => void;
  lessons: CourseLesson[];
  activeLessonId?: string;
  completedLessonIds: string[];
  pendingLessonIds: string[];
  onSelect: (lesson: CourseLesson) => void;
  onToggleComplete: (lessonId: string, completed: boolean) => void;
}

export default function PlayGroundMobileSidebar({
  open,
  onClose,
  lessons,
  activeLessonId,
  completedLessonIds,
  pendingLessonIds,
  onSelect,
  onToggleComplete,
}: Props) {
  const completedCount = lessons.filter((lesson) =>
    completedLessonIds.includes(lesson.id)
  ).length;

  useEffect(() => {
    if (!open) {
      document.body.style.overflow = "";
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <>
      <div
        className={`
          fixed inset-y-0 right-0 z-50
          flex h-dvh w-full max-w-md flex-col
          border-l border-border bg-background/95 shadow-2xl backdrop-blur-xl
          transition-transform duration-300 ease-out
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="sticky top-0 z-10 border-b border-border bg-background/95 px-4 pb-4 pt-3 backdrop-blur">
          <div className="mb-3 flex justify-center">
            <span className="h-1.5 w-14 rounded-full bg-muted-foreground/20" />
          </div>

          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-primary/70">
                Lesson Library
              </p>
              <h3 className="mt-1 text-base font-semibold text-foreground">
                Browse lessons
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {completedCount}/{lessons.length} completed
              </p>
            </div>

            <button
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-2xl border border-border bg-muted/50 font-mono text-sm text-muted-foreground transition hover:bg-muted"
              aria-label="Close lessons panel"
            >
              X
            </button>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-hidden px-4 pb-4">
          <Sidebar
            lessonsList={lessons}
            activeLessonId={activeLessonId}
            completedLessonIds={completedLessonIds}
            pendingLessonIds={pendingLessonIds}
            onLessonSelect={onSelect}
            onToggleComplete={onToggleComplete}
            variant="mobile"
          />
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/55 backdrop-blur-[2px]"
          onClick={onClose}
        />
      )}
    </>
  );
}
