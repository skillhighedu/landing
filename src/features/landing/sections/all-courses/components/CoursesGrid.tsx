import CourseCard from "./CourseCard";
import { useFilteredCourses } from "../hooks/useFilteredCourses";
import { motion, AnimatePresence } from "framer-motion";
import { sortCoursesByRibbon } from "@/utils/sortCoursesByRibbon";
import CourseCardSkeleton from "../components/CourseCardSkeleton";

const SKELETON_COUNT = 6;

interface Props {
  search: string;
}

export default function CoursesGrid({ search }: Props) {
  const filteredCourses = useFilteredCourses(search);

  const isLoading = filteredCourses === undefined;

  const sortedCourses = !isLoading
    ? sortCoursesByRibbon(filteredCourses)
    : [];

  return (
    <motion.div
      layout
      transition={{ layout: { duration: 0.4, ease: "easeOut" } }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <AnimatePresence>
        {isLoading
          ? Array.from({ length: SKELETON_COUNT }).map((_, index) => (
              <motion.div
                key={`skeleton-${index}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <CourseCardSkeleton />
              </motion.div>
            ))
          : sortedCourses.map((course, index) => (
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
