import Sidebar from "@/features/dashboard/components/LessonsList";

export default function PlayGroundSidebar({
  lessons,
  currentLesson,
  completedLessonIds,
  onSelectLesson,
  onToggleComplete,
}: any) {
  return (
    <aside className="hidden lg:flex w-80 shrink-0 flex-col gap-6">
      <div className="sticky top-20 rounded-2xl border border-white/10 bg-white dark:bg-neutral-900/70 p-3">
        <Sidebar
          lessonsList={lessons}
          activeLessonId={currentLesson?.id}
          completedLessonIds={completedLessonIds}
          onLessonSelect={onSelectLesson}
          onToggleComplete={onToggleComplete}
        />
      </div>
    </aside>
  );
}
