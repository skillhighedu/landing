'use client';

import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import CourseShare from "./CourseShare";
import type { Course } from "../types";
import { ArrowUpRight } from "lucide-react";
import CustomButton from "@/components/common/Button";

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

      {/* ================= TOP SELLING RIBBON ================= */}
      {course.isTopSelling && (
        <div className="absolute -left-9 top-4 z-20 pointer-events-none">
          <div
            className="
              relative overflow-hidden
              bg-amber-400 text-black
              text-xs uppercase tracking-wider
              px-8 py-2
              -rotate-45
              shadow-lg
              whitespace-nowrap
            "
          >
            <span className="relative z-10">Top Selling</span>

            <span
              className="
                absolute inset-0
                bg-gradient-to-r
                from-transparent via-white/70 to-transparent
                skew-x-[-20deg]
                animate-[shine-sweep_4s_ease-in-out_infinite]
              "
            />
          </div>
        </div>
      )}

      {/* ================= SHARP IMAGE ================= */}
      <img
        src={course.courseThumbnail || "/placeholder.svg"}
        alt={course.courseName}
        className="
          absolute inset-0
          h-full w-full
          object-cover
        "
      />

      {/* ================= BLURRED IMAGE (BOTTOM ONLY) ================= */}
      <img
        src={course.courseThumbnail || "/placeholder.svg"}
        aria-hidden
        className="
          absolute inset-0
          h-full w-full
          object-cover
          blur-xl scale-110
          progressive-blur
        "
      />

      {/* ================= DARK OVERLAY ================= */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/60 to-transparent" />

      {/* ================= CONTENT ================= */}
      <CardContent className="relative z-10 flex h-full flex-col justify-end p-5 text-white">
        <h3 className="text-lg leading-tight mb-1">
          {course.courseName}
        </h3>

        <p className="text-sm text-neutral-300 font-bricolage line-clamp-2 mb-3">
          {course.courseDescription}
        </p>

        <CustomButton
          title="View program"
          onClick={() => navigate(`/course/${course.slug}`)}
          icon={<ArrowUpRight />}
          className="
            w-fit rounded-md
            bg-white px-4 py-2
            text-sm text-black
            hover:bg-neutral-200
            transition-colors
          "
        />
      </CardContent>
    </Card>
  );
}
