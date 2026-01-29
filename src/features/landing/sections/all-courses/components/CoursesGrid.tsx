import CourseCard from "./CourseCard";
import { useFilteredCourses } from "../hooks/useFilteredCourses";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CoursesGrid() {
  const [query] = useState("");
  const courses = useFilteredCourses(query);

  return (
    <motion.div
      layout
      transition={{ layout: { duration: 0.4, ease: "easeOut" } }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <AnimatePresence>
        {courses.map((course,index) => (
          <motion.div
            key={course.id}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 0.25 } }}
          >
            <CourseCard course={course} index={index} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
