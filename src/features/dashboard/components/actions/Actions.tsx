import { useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CustomButton from "@/components/common/Button";
import type { ActionsProps } from "./types";

export default function Actions({
  lessons,
  currentLesson,
  onChangeLesson,
}: ActionsProps) {
  if (!currentLesson || lessons.length === 0) return null;

  const currentIndex = lessons.findIndex((l) => l.id === currentLesson.id);
  if (currentIndex === -1) return null;

  const isFirst = currentIndex === 0;
  const isLast = currentIndex === lessons.length - 1;

  const goPrev = useCallback(() => {
    if (!isFirst) onChangeLesson(lessons[currentIndex - 1]);
  }, [isFirst, currentIndex, lessons, onChangeLesson]);

  const goNext = useCallback(() => {
    if (!isLast) onChangeLesson(lessons[currentIndex + 1]);
  }, [isLast, currentIndex, lessons, onChangeLesson]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [goPrev, goNext]);

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="rounded-2xl border border-border bg-muted/25 px-4 py-3">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-primary/70">
          Lesson Progress
        </p>
        <p className="mt-2 text-sm font-semibold text-foreground sm:text-base">
          Lesson {currentIndex + 1} of {lessons.length}
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <CustomButton
          title="Previous"
          isBack
          icon={<ChevronLeft className="h-4 w-4" />}
          disabled={isFirst}
          onClick={goPrev}
          className="font-mono"
        />

        <CustomButton
          title="Next"
          icon={<ChevronRight className="h-4 w-4" />}
          variant="primary"
          disabled={isLast}
          onClick={goNext}
          className="font-mono"
        />
      </div>
    </div>
  );
}
