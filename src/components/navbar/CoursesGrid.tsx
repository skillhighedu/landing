import type { Department } from "./types";

const VISIBLE_LIMIT = 6;

export default function CoursesGrid({
  courses,
  deptName,
  onSelectCourse,
}: {
  courses: Department["courses"];
  deptName: string;
  onSelectCourse: (slug: string) => void;
}) {
  const hasMore = courses.length > VISIBLE_LIMIT;

  return (
    <div className="flex-1 p-4 min-w-0">
      {/* Section title */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
          {deptName}
        </h3>
        {hasMore && (
          <span className="text-[10px] text-neutral-400 dark:text-neutral-500">
            {courses.length} courses
          </span>
        )}
      </div>

      {/* Grid — scrollable when > 6 */}
      <div
        className={`
          grid grid-cols-3 gap-2.5
          ${hasMore ? "max-h-[320px] overflow-y-auto overscroll-contain pr-1 scrollbar-thin scrollbar-thumb-black/10 dark:scrollbar-thumb-white/10 scrollbar-track-transparent" : ""}
        `}
      >
        {courses.map((course) => (
          <CourseCard
            key={course.slug}
            course={course}
            onSelect={onSelectCourse}
          />
        ))}
      </div>
    </div>
  );
}

function CourseCard({
  course,
  onSelect,
}: {
  course: Department["courses"][number];
  onSelect: (slug: string) => void;
}) {
  return (
    <button
      onClick={() => onSelect(course.slug)}
      className="
        group relative rounded-xl overflow-hidden text-left cursor-pointer
        aspect-square w-full
        bg-neutral-100 dark:bg-neutral-800
        hover:scale-[1.03] active:scale-[0.98]
        transition-transform duration-200
        focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20
      "
    >
      {/* Thumbnail */}
      <img
        src={course.courseThumbnail}
        alt={course.courseName}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        loading="lazy"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:from-black/90 transition-colors duration-200" />

      {/* Course name */}
      <div className="absolute bottom-0 left-0 right-0 p-2">
        <p className="text-[11px] font-medium text-white leading-snug line-clamp-2">
          {course.courseName}
        </p>
      </div>
    </button>
  );
}
