import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import CourseShare from "./CourseShare";
import type { Course } from "../types";

type Props = {
  course: Course;
};

export default function CourseCard({ course }: Props) {
  const navigate = useNavigate();

  return (
    <Card
      className="
        group relative h-[420px]
        overflow-hidden rounded-2xl
        border border-neutral-800
        bg-neutral-900
        pixel-border
        shadow-[4px_4px_0_#000]
        hover:shadow-[6px_6px_0_#000]
        transition-shadow
      "
    >
      {/* Share */}
      <CourseShare
        url={`${window.location.origin}/course/${course.slug}`}
        title={course.courseName}
      />

      {/* Thumbnail */}
      <img
        src={course.courseThumbnail}
        alt={course.courseName}
        className="
          absolute inset-0 h-full w-full object-cover
          transition-transform duration-700
          group-hover:scale-[1.04]
        "
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/70 to-transparent" />

      {/* Content */}
      <CardContent className="relative z-10 flex h-full flex-col justify-end p-5 text-white">
        <h3 className="text-lg font-semibold leading-tight mb-1">
          {course.courseName}
        </h3>

        <p className="text-sm text-neutral-300 font-bricolage line-clamp-2 mb-4">
          {course.courseDescription}
        </p>

        <button
          onClick={() => navigate(`/course/${course.slug}`)}
          className="
            w-fit rounded-md
            bg-white px-4 py-2
            text-sm font-medium text-black
            hover:bg-neutral-200
            transition-colors
          "
        >
          View program
        </button>
      </CardContent>
    </Card>
  );
}
