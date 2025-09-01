
import { useEffect } from "react";
import { usePublicCoursesStore } from "@/store/publicCoursesStore";
import { fetchFormattedCourses } from "@/services/course-service";

export const useFetchFormattedCourses = () => {
  const setFormatedCourses = usePublicCoursesStore((state) => state.setFormatedCourses);

  useEffect(() => {
    const fetchDepartments = async () => {
     const formatedCourses = await fetchFormattedCourses();
     setFormatedCourses(formatedCourses);

    };

    fetchDepartments();
  }, [setFormatedCourses]);
};
