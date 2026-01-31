import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import type { Course } from "../types";
import { ArrowUpRight } from "lucide-react";
import DiagonalRibbon from "@/components/common/DiagonalRibbon";

interface Props {
  course: Course;
  index: number;
}

export default function CourseCard({ course, index }: Props) {
  const navigate = useNavigate();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      onClick={() => navigate(`/course/${course.slug}`)}
      className="
        group relative h-[420px]
        cursor-pointer overflow-hidden
        rounded-2xl
        bg-neutral-900
        shadow-[6px_6px_0_#000]
      "
    >
      {/* Ribbon */}
      {course.ribbon && <DiagonalRibbon label={course.ribbon} />}

      {/* Image */}
      <img
        src={course.courseThumbnail}
        alt={course.courseName}
        className="absolute inset-0 h-full w-full object-cover"
      />

      <img
        src={course.courseThumbnail}
        aria-hidden
        className="
          absolute inset-0
          h-full w-full
          object-cover
          blur-xl scale-110
          progressive-blur
        "
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

      {/* Content */}
      <div className="absolute bottom-0 z-10 w-full p-5">
        <h3 className="mb-2 text-lg text-white leading-tight">
          {course.courseName}
        </h3>

        <p className="mb-4 line-clamp-2 text-sm text-neutral-300">
          {course.courseDescription}
        </p>

        <div className="flex items-center gap-2 text-sm font-medium text-white">
          <span>View course</span>
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </motion.div>
  );
}
