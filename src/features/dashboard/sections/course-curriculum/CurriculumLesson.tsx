import type { CurriculumLesson } from "./types";

export default function CurriculumLessonItem({
  lesson,
}: {
  lesson: CurriculumLesson;
}) {
  return (
    <li
      className="
        text-sm
        text-neutral-600 dark:text-neutral-400
        flex items-start gap-2
      "
    >
      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-neutral-400 dark:bg-neutral-600" />
      <span>{lesson.contentName}</span>
    </li>
  );
}
