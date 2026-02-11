import Sidebar from "@/features/dashboard/components/LessonsList";
import type { LessonTopic } from "@/types/course";

interface Props {
  open: boolean;
  onClose: () => void;
  lessons: LessonTopic[];
  activeLessonId?: string;
  completedLessonIds: string[];
  onSelect: (lesson: LessonTopic) => void;
  onToggleComplete: (lessonId: string) => void;
}

export default function PlayGroundMobileSidebar({
  open,
  onClose,
  lessons,
  activeLessonId,
  completedLessonIds,
  onSelect,
  onToggleComplete,
}: Props) {
  return (
    <>
      {/* Sidebar */}
      <div
        className={`
          fixed inset-y-0 right-0 z-50
          w-[85vw] max-w-sm
          bg-neutral-900/95 backdrop-blur-xl
          shadow-2xl
          transition-transform duration-300 ease-out
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-4 border-b border-white/10 bg-neutral-900/90">
          <h3 className="text-base font-semibold">Lessons</h3>

          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white/10 transition"
          >
            ✕
          </button>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto h-[calc(100vh-64px)]">
          <Sidebar
            lessonsList={lessons}
            activeLessonId={activeLessonId}
            completedLessonIds={completedLessonIds}
            onLessonSelect={onSelect}
            onToggleComplete={onToggleComplete}
          />
        </div>
      </div>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-[2px] z-40"
          onClick={onClose}
        />
      )}
    </>
  );
}
