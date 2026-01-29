import CourseCard from "./CourseCard";
import { CourseCardSkeleton } from "./skeletons/CourseCardSkeleton";
import type { StudentProfile } from "../types";

interface Props {
  courses: StudentProfile;
  loading: boolean;
  onPayment: (orderId: string) => void;
}

export default function YourCourses({ courses, loading }: Props) {
  /* ---------- Loading ---------- */
  if (loading) {
    return (
      <section>
        <h3 className="text-lg font-medium mb-4">Your courses</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <CourseCardSkeleton key={i} />
          ))}
        </div>
      </section>
    );
  }

  /* ---------- Empty ---------- */
  if (!courses.courses.length) {
    return (
      <section className="bg-neutral-900 border border-neutral-800 rounded-xl p-8 text-center">
        <h4 className="font-medium mb-2">No courses yet</h4>
        <p className="text-neutral-400 text-sm">
          You haven’t enrolled in any courses yet.
        </p>
      </section>
    );
  }

  /* ---------- Content ---------- */
  return (
    <section>
      <h3 className="text-lg font-medium mb-4">Your courses</h3>

      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
          gap-6
        "
      >
        {courses.courses.map((course) => (
          <CourseCard key={course.courseId} course={course} />
        ))}
      </div>
    </section>
  );
}
