import  { useEffect, useState } from "react";
import { Courses } from "@/data/course";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface AboutCourseProps {
  courseId?: string;
}

export default function AboutCourse({ courseId }: AboutCourseProps) {
  const [course, setCourse] = useState<(typeof Courses)[0] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
      <section className="min-h-[60vh] bg-gradient-to-b from-neutral-900 to-neutral-800 flex items-center justify-center">
        <div className="animate-pulse text-white text-xl font-medium">Loading course...</div>
      </section>
    );
  }

  if (!course) {
    return (
      <section className="min-h-[60vh] bg-gradient-to-b from-neutral-900 to-neutral-800 flex items-center justify-center">
        <div className="text-red-400 text-xl font-medium">Course not found</div>
      </section>
    );
  }

  return (
    <section className="bg-neutral-900 py-16 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-6xl mx-auto bg-neutral-800/50 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 p-8 lg:p-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative group"
          >
            <img
              src={course.logo}
              alt={course.name}
              className="rounded-2xl w-full h-[350px] lg:h-[450px] object-cover shadow-lg transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
              onError={(e) => (e.currentTarget.src = "/fallback-image.jpg")}
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/40 to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-500" />
            <div className="absolute top-4 right-4 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full">
              Featured
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col justify-center space-y-6"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
              {course.name}
            </h1>
            <p className="text-gray-200 text-base sm:text-lg leading-relaxed max-w-prose">
              {course.description}
            </p>
            <div className="flex items-center gap-4">
              <p className="text-3xl font-bold text-green-400">
                ₹{course.price.toLocaleString()}
              </p>
           
            </div>
            <div className="flex gap-4">
              <Button
            className="bg-green-800 text-white text-base sm:text-md  py-3 px-6 sm:py-4 sm:px-8 hover:bg-lime-400 pixel-border shadow-[4px_4px_0_#000] hover:shadow-[6px_6px_0_#000] transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-lime-300 flex items-center gap-2"
            aria-label="Start Building Skills"
          >
           Enroll now
          
          </Button>
              <Button
              variant="secondary"
            className=" text-white text-base sm:text-md  py-3 px-6 sm:py-4 sm:px-8 hover:bg-lime-400 pixel-border shadow-[4px_4px_0_#000] hover:shadow-[6px_6px_0_#000] transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-lime-300 flex items-center gap-2"
            aria-label="Start Building Skills"
          >
           Learn more
          
          </Button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}