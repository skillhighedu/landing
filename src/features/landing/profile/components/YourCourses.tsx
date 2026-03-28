import type { Course } from "../types";
import CourseCard from "./CourseCard";
import { CourseCardSkeleton } from "./skeletons/CourseCardSkeleton";

interface Props {
  courses: Course[];
  loading: boolean;
}

export default function YourCourses({ courses = [], loading }: Props) {
  return (
    <section className="space-y-5">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">
            Your Courses
          </h3>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Review your enrolled courses and continue from where you left off.
          </p>
        </div>

        {!loading && courses.length > 0 && (
          <div className="rounded-2xl border border-neutral-200 bg-white px-4 py-2 text-sm text-neutral-600 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300">
            {courses.length} enrolled course{courses.length > 1 ? "s" : ""}
          </div>
        )}
      </div>

      {loading && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <CourseCardSkeleton key={index} />
          ))}
        </div>
      )}

      {!loading && courses.length === 0 && (
        <div className="rounded-[28px] border border-neutral-200 bg-neutral-50 p-10 text-center dark:border-neutral-800 dark:bg-neutral-900">
          <h4 className="mb-2 text-lg font-semibold text-neutral-900 dark:text-white">
            No courses yet
          </h4>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            You haven&apos;t enrolled in any courses yet.
          </p>
        </div>
      )}

      {!loading && courses.length > 0 && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
          {courses.map((course) => (
            <CourseCard key={course.courseId} course={course} />
          ))}
        </div>
      )}
    </section>
  );
}
