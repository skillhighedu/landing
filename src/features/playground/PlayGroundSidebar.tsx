import type { LessonTopic } from "@/types/course";
import Sidebar from "@/features/dashboard/components/LessonsList";
import { useDashboardRouteStore } from "@/store/dashboardRoute.store";

interface Props {
  lessons: LessonTopic[];
  currentLesson: LessonTopic | null;
  completedLessonIds: string[];
  onSelectLesson: (lesson: LessonTopic) => void;
  onLockedLessonClick?: (lesson: LessonTopic) => void;
  onToggleComplete: (lessonId: string) => void;
}

export default function PlayGroundSidebar({
  lessons,
  currentLesson,
  completedLessonIds,
  onSelectLesson,
  onLockedLessonClick,
  onToggleComplete,
}: Props) {

  const {mode} = useDashboardRouteStore()
  return (
    <aside className="hidden lg:block w-[340px] ">
      <Sidebar
        lessonsList={lessons}
        activeLessonId={currentLesson?.id}
        completedLessonIds={completedLessonIds}
        onLessonSelect={onSelectLesson}
        onToggleComplete={onToggleComplete}

        /* locked click */
        onLockedLessonClick={onLockedLessonClick}
      />

  { mode === "demo" && (
  <div className="mt-6">
    <div className="rounded-2xl border border-border bg-linear-to-br from-primary/5 to-primary/10 p-5 shadow-sm">
      
      <h3 className="text-base  leading-snug">
        Unlock Full Course
      </h3>

      <p className="text-sm text-muted-foreground mt-2 font-sans">
        Purchase the course to access all locked lessons, projects, videos,
        and live classes.
      </p>

      <button
        className="
          mt-4 w-full
          px-4 py-2.5
          rounded-xl
          bg-primary text-white
          text-sm font-medium
          hover:opacity-90
          transition
        "
      >
        Buy Course
      </button>

    </div>
  </div>
)}


    </aside>
  );
}
