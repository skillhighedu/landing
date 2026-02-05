import { useDemoLessons } from "@/features/dashboard/hooks/useDemoCourse";
import {
  useLessons,
  useLessonsCheckboxStatus,
  useToggleLessonCompletion,
} from "@/hooks/tanstack/useCourses";

export function usePlayGroundData(
  slug: string,
  mode: "demo" | "real"
) {
  const isDemo = mode === "demo";

  const lessonQuery = isDemo
    ? useDemoLessons(slug)
    : useLessons(slug);

  const completedQuery = !isDemo
    ? useLessonsCheckboxStatus(slug)
    : null;

  const toggleMutation = !isDemo
    ? useToggleLessonCompletion()
    : null;

  const completedLessonIds =
    completedQuery?.data?.completedLessonIds ?? [];

  return {
    isDemo,
    lessonQuery,
    completedLessonIds: Array.from(new Set(completedLessonIds)),
    toggleMutation,
  };
}
