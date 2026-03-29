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
  return (
    <>
      <div
        className={`
          fixed inset-y-0 right-0 z-50
          w-[88vw] max-w-sm
          border-l border-border bg-background/95 shadow-2xl backdrop-blur-xl
          transition-transform duration-300 ease-out
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="sticky top-0 z-10 border-b border-border bg-background/95 px-4 py-4 backdrop-blur">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-primary/70">
                Lesson Library
              </p>
              <h3 className="mt-1 text-base font-semibold text-foreground">
                Browse lessons
              </h3>
            </div>

            <button
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-muted/50 font-mono text-sm text-muted-foreground transition hover:bg-muted"
              aria-label="Close lessons panel"
            >
              X
            </button>
          </div>
        </div>

        <div className="h-[calc(100vh-76px)] overflow-y-auto p-4">
          <Sidebar
            lessonsList={lessons}
            activeLessonId={activeLessonId}
            completedLessonIds={completedLessonIds}
            pendingLessonIds={pendingLessonIds}
            onLessonSelect={onSelect}
            onToggleComplete={onToggleComplete}
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
