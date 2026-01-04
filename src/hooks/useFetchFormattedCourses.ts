
import { useEffect } from "react";
import { usePublicCoursesStore } from "@/store/publicCoursesStore";
import { fetchFormattedCourses } from "@/services/course-service";

export const useFetchFormattedCourses = () => {
  const setFormatedCourses = usePublicCoursesStore((state) => state.setFormatedCourses);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const formatedCourses = await fetchFormattedCourses();
        setFormatedCourses(formatedCourses);
      } catch (error) {
        console.error("Error fetching formatted courses:", error);
      }
    };

    fetchDepartments();
  }, [setFormatedCourses]);
};
