import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import type { Course } from "../types";
import { ArrowRight, ArrowUpRight } from "lucide-react";

interface Props {
  course: Course;
  index: number;
  
}

export default function CourseCard({ course, index }: Props) {
  const navigate = useNavigate();

  return (
    <motion.div
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
      {/* ================= SHARP IMAGE ================= */}
      <img
        src={course.courseThumbnail}
        alt={course.courseName}
        className="
          absolute inset-0
          h-full w-full
          object-cover
        "
      />

      {/* ================= BLURRED IMAGE (BOTTOM) ================= */}
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

      {/* ================= DARK OVERLAY ================= */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

      {/* ================= TOP BADGE ================= */}
      {course.isTopSelling && (
        <div className="absolute left-4 top-4 z-20">
          <div
            className="
              relative overflow-hidden
              rounded-full
              bg-amber-400
              px-3 py-1
              text-[11px] font-semibold
              text-black
              shadow
            "
          >
            <span className="relative z-10">Top Seller</span>

            {/* Auto shine */}
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

      {/* ================= CONTENT ================= */}
      <div className="absolute bottom-0 z-10 w-full p-5">
        <h3 className="text-lg  text-white leading-loose mb-2">
          {course.courseName}
        </h3>

        <p className="text-sm text-neutral-300  font-serif line-clamp-2 mb-4">
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
