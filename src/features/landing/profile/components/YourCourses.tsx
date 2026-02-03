import CourseCard from "./CourseCard";
import { CourseCardSkeleton } from "./skeletons/CourseCardSkeleton";
import type { StudentProfile } from "../types";

interface Props {
  courses: StudentProfile;
  loading: boolean;
}

export default function YourCourses({ courses, loading }: Props) {
  if (loading) {
    return (
      <section>
        <h3 className="text-lg font-medium mb-4 text-neutral-900 dark:text-white">
          Your courses
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <CourseCardSkeleton key={i} />
          ))}
        </div>
      </section>
    );
  }

  if (!courses.courses.length) {
    return (
      <section
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
      </section>
    );
  }

  return (
    <section>
      <h3 className="text-lg font-medium mb-4 text-neutral-900 dark:text-white">
        Your courses
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {courses.courses.map((course) => (
          <CourseCard key={course.courseId} course={course} />
        ))}
      </div>
    </section>
  );
}
