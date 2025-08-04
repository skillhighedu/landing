import { useEffect, useRef, useState } from "react";
import { Courses } from "@/data/course";
import { motion, AnimatePresence } from "framer-motion";
import CustomButton from "./Button";

interface AboutCourseProps {
  courseId?: string;
  scrollToPricing: () => void
}

export default function AboutCourse({ courseId,scrollToPricing }: AboutCourseProps) {
  const [course, setCourse] = useState<(typeof Courses)[0] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showOptions, setShowOptions] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setIsLoading(true);
    const selectedCourse = courseId
      ? Courses.find((c) => c.id === courseId)
      : Courses[0];
    setCourse(selectedCourse || null);
    setIsLoading(false);
  }, [courseId]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowOptions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
    <section className="bg-neutral-950 py-20 px-4 sm:px-8 lg:px-16">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-7xl mx-auto rounded-3xl overflow-hidden shadow-[0_0_60px_-15px_rgba(0,0,0,0.8)] bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900"
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
            <p className="text-3xl font-bold text-green-400">
              ₹{course.price.toLocaleString()}
            </p>

            <div className="pt-2 relative" ref={dropdownRef}>
              <CustomButton
                title="Enroll now"
                icon=""
                 onClick={scrollToPricing}
              />

              <AnimatePresence>
                {showOptions && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="absolute z-50 mt-2 w-60 rounded-xl bg-white shadow-xl right-0"
                  >
                    <div className="flex flex-col">
                      <button
                        onClick={() => {
                          setShowOptions(false);
                          alert("You selected Pre-registration (₹2,000)");
                        }}
                        className="px-5 py-3 hover:bg-gray-100 text-left text-sm font-medium text-gray-800"
                      >
                        Pay ₹2,000 (Pre-registration)
                      </button>
                      <button
                        onClick={() => {
                          setShowOptions(false);
                          alert(`You selected Full payment (₹${course.price})`);
                        }}
                        className="px-5 py-3 hover:bg-gray-100 text-left text-sm font-medium text-gray-800"
                      >
                        Pay ₹{course.price.toLocaleString()} (Full Amount)
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
