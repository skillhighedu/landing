import type { LessonTopic } from "@/types/course";
import Sidebar from "@/features/dashboard/components/LessonsList";

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
  return (
    <aside className="hidden lg:block w-[340px]">
      <Sidebar
        lessonsList={lessons}
        activeLessonId={currentLesson?.id}
        completedLessonIds={completedLessonIds}
        onLessonSelect={onSelectLesson}
        onToggleComplete={onToggleComplete}

        /* locked click */
        onLockedLessonClick={onLockedLessonClick}
      />
    </aside>
  );
}
