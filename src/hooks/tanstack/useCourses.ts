import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchDashboardCourse, fetchCourseLessons,lessonsStatus, clickLessonToggle } from "@/services/course-service";
import type {  LessonsResponse } from "@/types/course";
import type { CourseDashboardResponse } from "@/features/dashboard/types";

export const coursesKeys = {
  all: ["courses"] as const,
  byCourseSlug: (slug: string) => ["courses", "slug", slug] as const,
  byCourseLessons: (slug: string) => ["lessons", slug] as const,
  byCourseLessonsStatus: (slug: string) => ["lessons", slug, "status"] as const,

};

export const useCourse = (slug: string) =>
  useQuery<CourseDashboardResponse>({
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



export const useLessonsCheckboxStatus = (slug: string) =>
  useQuery({
    queryKey: coursesKeys.byCourseLessonsStatus(slug),
    queryFn: () => lessonsStatus(slug),
    enabled: !!slug,
  });
export const useToggleLessonCompletion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      slug,
      lessonId,
      completed,
    }: {
      slug: string;
      lessonId: string;
      completed: boolean;
    }) => clickLessonToggle(slug, lessonId, completed),

    onMutate: async ({ slug, lessonId, completed }) => {
      const queryKey = coursesKeys.byCourseLessonsStatus(slug);

      await queryClient.cancelQueries({ queryKey });

      const previous = queryClient.getQueryData<{ completedLessonIds: string[] }>(queryKey);

      queryClient.setQueryData(queryKey, (old: { completedLessonIds: string[] } | undefined) => {
        if (!old) return { completedLessonIds: [] };

        const set = new Set(old.completedLessonIds);

        if (completed) {
          set.add(lessonId);
        } else {
          set.delete(lessonId);
        }

        return {
          completedLessonIds: Array.from(set),
        };
      });

      return { previous, queryKey };
    },

    onError: (_, __, context) => {
      if (context?.previous) {
        queryClient.setQueryData(context.queryKey, context.previous);
      }
    },

    onSettled: (_, __, { slug }) => {
      queryClient.invalidateQueries({
        queryKey: coursesKeys.byCourseLessonsStatus(slug),
      });
    },
  });
};
