import { motion } from "framer-motion";
import CustomButton from "@/components/common/Button";
import { Swords } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Course } from "../types";

export default function CourseCard({ course, index }: { course: Course; index: number }) {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: index * 0.06 }}
      className="bg-neutral-800/50 rounded-2xl shadow-[4px_4px_0_#000] hover:scale-105 transition"
    >
      <img
        src={course.courseThumbnail}
        alt={course.courseName}
        className="w-full h-64 object-cover"
      />

      <div className="p-6 flex flex-col gap-4">
        <h3 className="text-xl text-white">{course.courseName}</h3>
        <p className="text-gray-300 line-clamp-3">
          {course.courseDescription}
        </p>

        <CustomButton
          title="Enroll now"
          icon={<Swords />}
          onClick={() => navigate(`/course/${course.slug}`)}
        />
      </div>
    </motion.div>
  );
}
