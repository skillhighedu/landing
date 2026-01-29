import { usePublicCoursesStore } from "@/store/publicCoursesStore";
import { useMemo } from "react";

export function useFilteredCourses(query: string) {
  const { formatedCourses } = usePublicCoursesStore();


  return useMemo(() => {
    if (!query) return formatedCourses;

    return formatedCourses.filter(
      (course) =>
        course.courseName.toLowerCase().includes(query.toLowerCase()) ||
        course.courseDescription.toLowerCase().includes(query.toLowerCase())
    );
  }, [formatedCourses, query]);
}
