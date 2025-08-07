import { useEffect, useRef, useState } from "react";
import { Courses } from "@/data/course";
import { motion} from "framer-motion";
import CustomButton from "./Button";
import { DotPatternLinearGradient } from './ui/DotBg'

interface AboutCourseProps {
  courseId?: string;
  scrollToPricing: () => void
}

export default function AboutCourse({ courseId,scrollToPricing }: AboutCourseProps) {
  const [course, setCourse] = useState<(typeof Courses)[0] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setIsLoading(true);
    const selectedCourse = courseId
      ? Courses.find((c) => c.id === courseId)
      : Courses[0];
    setCourse(selectedCourse || null);
    setIsLoading(false);
  }, [courseId]);

  
  if (isLoading) {
    return (
      <section className="min-h-[60vh] bg-neutral-900 flex items-center justify-center">
        <div className="animate-pulse text-white text-xl font-medium">
          Loading course...
        </div>
      </section>
    );
  }

  if (!course) {
    return (
      <section className="min-h-[60vh] bg-neutral-900 flex items-center justify-center">
        <div className="text-red-400 text-xl font-medium">
          Course not found
        </div>
      </section>
    );
  }

  

  return (
   
   <section className="relative bg-neutral-950 py-20 px-4 sm:px-8 lg:px-16 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900">
        <DotPatternLinearGradient />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-7xl mx-auto "
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 p-8 lg:p-14">
          {/* Course Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative group"
          >
            <img
              src={course.logo}
              alt={course.name}
              className="rounded-2xl w-full h-[320px] sm:h-[400px] lg:h-[480px] object-cover shadow-xl group-hover:scale-[1.02] transition-transform duration-500"
              loading="lazy"
              onError={(e) => (e.currentTarget.src = "/fallback-image.jpg")}
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/50 to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-500" />
            <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
              Featured
            </div>
          </motion.div>

          {/* Course Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col justify-center space-y-6 relative"
          >
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight">
              {course.name}
            </h1>
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-prose">
              {course.description}
            </p>
     

            <div className="pt-2 relative" ref={dropdownRef}>
              <CustomButton
                title="Enroll now"
                icon=""
                 onClick={scrollToPricing}
              />

           
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
