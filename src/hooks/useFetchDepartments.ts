
import { useEffect } from "react";
import { usePublicCoursesStore } from "@/store/publicCoursesStore";
import { fetchCourses } from "@/services/course-service";

export const useFetchDepartments = () => {
  const setDepartments = usePublicCoursesStore((state) => state.setDepartments);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const departments = await fetchCourses();
        setDepartments(departments);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    fetchDepartments();
  }, [setDepartments]);
};



