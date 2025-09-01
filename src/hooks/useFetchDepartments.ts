
import { useEffect } from "react";
import { usePublicCoursesStore } from "@/store/publicCoursesStore";
import { fetchCourses } from "@/services/course-service";

export const useFetchDepartments = () => {
  const setDepartments = usePublicCoursesStore((state) => state.setDepartments);

  useEffect(() => {
    const fetchDepartments = async () => {
     const departments = await fetchCourses();
     setDepartments(departments);
   
    };

    fetchDepartments();
  }, [setDepartments]);
};


//zustand
