import Sidebar from "@/features/dashboard/components/LessonsList";
import type { LessonTopic } from "@/types/course";

export default function PlayGroundMobileSidebar({
  open,
  onClose,
  lessons,
  activeLessonId,
  completedLessonIds,
  onSelect,
  onToggleComplete,
}: any) {
  return (
    <>
      <div
        className={`
          fixed inset-y-0 right-0 z-50 w-80
          bg-neutral-900/95 backdrop-blur
          transition-transform duration-300
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="p-4 border-b border-white/10 flex justify-between">
          <h3 className="text-sm font-semibold">Lessons</h3>
          <button onClick={onClose}>✕</button>
        </div>

        <Sidebar
          lessonsList={lessons}
          activeLessonId={activeLessonId}
          completedLessonIds={completedLessonIds}
          onLessonSelect={onSelect}
          onToggleComplete={onToggleComplete}
        />
      </div>

      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={onClose}
        />
      )}
    </>
  );
}
