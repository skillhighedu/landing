import CourseCard from "./CourseCard";
import type { StudentProfile } from "../types";

interface Props {
  courses: StudentProfile;
  loading: boolean;
}

export default function CoursesSection({ courses, loading }: Props) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="h-60 bg-neutral-800 animate-pulse rounded-xl"
          />
        ))}
      </div>
    );
  }

  if (!courses.courses.length) {
    return (
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8 text-center">
        <p className="text-neutral-400">
          You haven’t enrolled in any courses yet.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.courses.map((course) => (
        <CourseCard key={course.courseId} course={course} />
      ))}
    </div>
  );
}
