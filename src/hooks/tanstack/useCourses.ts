import { useQuery } from "@tanstack/react-query";
import { fetchDashboardCourse, fetchCourseLessons } from "@/services/course-service";
import type { SelectedCourse, LessonsResponse } from "@/types/course";

export const coursesKeys = {
  all: ["courses"] as const,
  byCourseSlug: (slug: string) => ["courses", "slug", slug] as const,
  byCourseLessons: (slug: string) => ["lessons", slug] as const,
};

export const useCourse = (slug: string) =>
  useQuery<SelectedCourse>({
    queryKey: coursesKeys.byCourseSlug(slug),
    queryFn: () => fetchDashboardCourse(slug),
    enabled: !!slug,
  });

export const useLessons = (slug: string) =>
  useQuery<LessonsResponse>({
    queryKey: coursesKeys.byCourseLessons(slug),
    queryFn: () => fetchCourseLessons(slug),
    enabled: !!slug,
  });



export const useLessonsCheckbox = (slug: string) =>
  useQuery<LessonsResponse>({
    queryKey: coursesKeys.byCourseLessons(slug),
    queryFn: () => fetchCourseLessons(slug),
    enabled: !!slug,
});
