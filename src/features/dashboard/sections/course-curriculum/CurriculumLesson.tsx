import type { CurriculumLesson } from "./types";

export default function CurriculumLessonItem({
  lesson,
}: {
  lesson: CurriculumLesson;
}) {
  return (
    <li
      className="
        flex items-start gap-3 rounded-2xl border border-border/70 bg-background/80 px-3 py-3 text-sm text-neutral-600 dark:text-neutral-400
      "
    >
      <span className="mt-1.5 inline-flex h-2.5 w-2.5 shrink-0 rounded-full bg-primary/70" />
      <span className="leading-6">{lesson.contentName}</span>
    </li>
  );
}
