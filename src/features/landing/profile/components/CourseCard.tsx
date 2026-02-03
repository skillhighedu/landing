import CustomButton from "@/components/common/Button";
import type { Course } from "../types";
import { Link } from "react-router-dom";

interface Props {
  course: Course;
}

export default function CourseCard({ course }: Props) {
  return (
    <div
      className="
        group
        rounded-xl overflow-hidden
        transition-all duration-300
        border
        bg-white dark:bg-neutral-900
        border-neutral-200 dark:border-neutral-800
        hover:shadow-lg hover:-translate-y-0.5
        hover:border-neutral-300 dark:hover:border-neutral-700
      "
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={course.courseThumbnail}
          alt={course.courseName}
          className="
            h-full w-full object-cover
            transition-transform duration-500
            group-hover:scale-[1.05]
          "
          loading="lazy"
        />

        {/* Overlay for depth */}
        <div
          className="
            absolute inset-0
            bg-gradient-to-t
            from-black/30 via-black/10 to-transparent
            opacity-70
          "
        />
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 flex flex-col gap-3">
        <h4
          className="
            text-sm sm:text-base
            font-medium
            leading-snug
            line-clamp-2
            text-neutral-900 dark:text-white
          "
        >
          {course.courseName}
        </h4>

        {/* Action */}
        <Link to={`/course-dashboard/${course.slug}`} className="pt-2">
          <CustomButton
            title="Continue learning"
            className="
              w-full
              text-sm
              bg-neutral-900 hover:bg-neutral-800
              dark:bg-neutral-800 dark:hover:bg-neutral-700
            "
          />
        </Link>
      </div>
    </div>
  );
}
