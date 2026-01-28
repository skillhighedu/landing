import CourseCard from "./CourseCard";
import { useFilteredCourses } from "../hooks/useFilteredCourses";
import { useState } from "react";

export default function CoursesGrid() {
  const [query] = useState(""); // later connect to search
  const courses = useFilteredCourses(query);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course, index) => (
        <CourseCard key={course.id} course={course} index={index} />
      ))}
    </div>
  );
}
