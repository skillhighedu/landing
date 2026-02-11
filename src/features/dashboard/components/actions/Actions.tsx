import { useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CustomButton from "@/components/common/Button";
import type { ActionsProps } from "./types";

export default function Actions({
  lessons,
  currentLesson,
  onChangeLesson,
  onOpenDiscussion,
}: ActionsProps) {
  if (!currentLesson || lessons.length === 0) return null;

  const currentIndex = lessons.findIndex(
    (l) => l.id === currentLesson.id
  );
  if (currentIndex === -1) return null;

  const isFirst = currentIndex === 0;
  const isLast = currentIndex === lessons.length - 1;

  const goPrev = useCallback(() => {
    if (!isFirst) onChangeLesson(lessons[currentIndex - 1]);
  }, [isFirst, currentIndex, lessons, onChangeLesson]);

  const goNext = useCallback(() => {
    if (!isLast) onChangeLesson(lessons[currentIndex + 1]);
  }, [isLast, currentIndex, lessons, onChangeLesson]);

  /* Keyboard navigation */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [goPrev, goNext]);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      
      {/* Lesson position */}
      <div className="text-sm text-white/60">
        Lesson {currentIndex + 1} of {lessons.length}
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-3">
        <CustomButton
          title="Previous"
          isBack
          icon={<ChevronLeft className="h-4 w-4" />}
          disabled={isFirst}
          onClick={goPrev}
        />

        <CustomButton
          title="Next"
          icon={<ChevronRight className="h-4 w-4" />}
          variant="primary"
          disabled={isLast}
          onClick={goNext}
        />
      </div>
    </div>
  );
}
