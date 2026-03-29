
import Sidebar from "@/features/dashboard/components/LessonsList";
import { useDashboardRouteStore } from "@/store/dashboardRoute.store";
import type { CourseLesson } from "../dashboard/types";
import CustomButton from "@/components/common/Button";

interface Props {
  lessons: CourseLesson[];
  currentLesson: CourseLesson | null;
  completedLessonIds: string[];
  pendingLessonIds: string[];
  onSelectLesson: (lesson: CourseLesson) => void;
  onLockedLessonClick?: (lesson: CourseLesson) => void;
  onToggleComplete: (lessonId: string, completed: boolean) => void;
}

export default function PlayGroundSidebar({
  lessons,
  currentLesson,
  completedLessonIds,
  pendingLessonIds,
  onSelectLesson,
  onLockedLessonClick,
  onToggleComplete,
}: Props) {

  const { mode, slug } = useDashboardRouteStore();
  return (
    <aside className="hidden w-[340px] xl:block">
      <div className="rounded-[1.5rem] border border-border bg-card p-4 shadow-sm">
        <div className="mb-4 border-b border-border pb-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            Lesson Library
          </p>
          <h3 className="mt-2 font-mono text-lg">Course lessons</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Pick a lesson and keep moving through the course.
          </p>
        </div>

        <Sidebar
          lessonsList={lessons}
          activeLessonId={currentLesson?.id}
          completedLessonIds={completedLessonIds}
          pendingLessonIds={pendingLessonIds}
          onLessonSelect={onSelectLesson}
          onToggleComplete={onToggleComplete}
          onLockedLessonClick={onLockedLessonClick}
        />
      </div>

      {mode === "demo" && (
        <div className="mt-6 rounded-[1.5rem] border border-border bg-linear-to-br from-primary/5 to-primary/10 p-5 shadow-sm">
          <h3 className="font-mono text-base leading-snug">
            Unlock Full Course
          </h3>

          <p className="mt-2 text-sm text-muted-foreground">
            Purchase the course to access all locked lessons, projects, videos,
            and live classes.
          </p>

          <CustomButton
            title="Buy Course"
            onClick={() => {
              window.location.href = `/course/${slug}`;
            }}
            className="mt-4 w-full justify-center font-mono"
          />
        </div>
      )}
    </aside>
  );
}
