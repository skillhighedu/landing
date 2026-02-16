import type { Course } from "../types";
import CourseCard from "./CourseCard";
import { CourseCardSkeleton } from "./skeletons/CourseCardSkeleton";

interface Props {
  courses: Course[];
  loading: boolean;
}

export default function YourCourses({ courses = [], loading }: Props) {
  return (
    <section className="space-y-4">
      <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
        Your Courses
      </h3>

      {/* Loading */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <CourseCardSkeleton key={i} />
          ))}
        </div>
      )}

      {/* Empty */}
      {!loading && courses.length === 0 && (
        <div
          className="
            rounded-xl p-8 text-center
            bg-neutral-50 dark:bg-neutral-900
            border border-neutral-200 dark:border-neutral-800
          "
        >
          <h4 className="font-medium mb-2 text-neutral-900 dark:text-white">
            No courses yet
          </h4>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            You haven’t enrolled in any courses yet.
          </p>
        </div>
      )}

      {/* Courses */}
      {!loading && courses.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {courses.map((course) => (
            <CourseCard key={course.courseId} course={course} />
          ))}
        </div>
      )}
    </section>
  );
}
