import type { Department } from "./types";

export default function CoursesGrid({
  courses,
  deptName,
  onSelectCourse,
}: {
  courses: Department["courses"];
  deptName: string;
  onSelectCourse: (slug: string) => void;
}) {
  return (
    <div className="flex-1">
      {/* Section title */}
      <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
        {deptName}
      </h3>

      {/* Courses */}
      <div className="grid grid-cols-2 gap-4">
        {courses.map((course) => (
          <button
            key={course.slug}
            onClick={() => onSelectCourse(course.slug)}
            className="
              group relative h-32 rounded-2xl overflow-hidden text-left cursor-pointer
              bg-neutral-100 dark:bg-neutral-800
              hover:scale-[1.02] transition-transform duration-200
              focus:outline-none focus:ring-2 focus:ring-primary/40
            "
          >
            {/* Image */}
            <img
              src={course.courseThumbnail}
              alt={course.courseName}
              className="
                absolute inset-0 h-full w-full object-cover
                transition-transform duration-300
                group-hover:scale-110
              "
              loading="lazy"
            />

            {/* Gradient overlay */}
            <div
              className="
                absolute inset-0
                bg-gradient-to-t
                from-black/80 via-black/40 to-transparent
                group-hover:from-black/90 transition-colors
              "
            />

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <p className="text-xs  text-white  line-clamp-2">
                {course.courseName}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
