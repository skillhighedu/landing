import { useQuery } from "@tanstack/react-query";
import { fetchDemoCourse, fetchDemoCourseLessons } from "../services/course.service";

export const useDemoCourse = (slug: string) =>
  useQuery({
    queryKey: ["demo-course", slug],
    queryFn: () => fetchDemoCourse(slug),
    staleTime: 5 * 60 * 1000,
  });


  export const useDemoLessons = (slug: string) =>
  useQuery({
    queryKey: ["demo-course-lessons", slug],
    queryFn: () => fetchDemoCourseLessons(slug),
    staleTime: 5 * 60 * 1000,
  });
