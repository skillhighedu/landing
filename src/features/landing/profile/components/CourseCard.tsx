import CustomButton from "@/components/common/Button";
import type { Course } from "../types";

interface Props {
  course: Course;
}

export default function CourseCard({ course }: Props) {
  return (
    <div
      className="
        group
        bg-neutral-900 border border-neutral-800
        rounded-xl overflow-hidden
        transition
        hover:border-neutral-700
      "
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={course.courseThumbnail}
          alt={course.courseName}
          className="
            h-full w-full object-cover
            transition-transform duration-300
            group-hover:scale-[1.03]
          "
        />

        {/* subtle overlay for depth */}
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 flex flex-col gap-3">
        <h4
          className="
            text-sm sm:text-base
            font-medium text-white
            leading-snug
            line-clamp-2
          "
        >
          {course.courseName}
        </h4>

        {/* Action */}
        <div className="pt-2">
          <CustomButton
            title="Continue learning"
            className="
              w-full
              bg-neutral-800
              hover:bg-neutral-700
              text-sm
            "
          />
        </div>
      </div>
    </div>
  );
}
