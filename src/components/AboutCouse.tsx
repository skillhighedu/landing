import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CustomButton from "@/components/common/Button";;
import { DotPatternLinearGradient } from './ui/DotBg';
import { fetchSelectedCourse } from "@/services/course-service";
import { useSelectedCourseStore } from "@/store/useSelectedCourse";
import HeaderSection from "@/components/common/HeaderSection";
import Balancer from "react-wrap-balancer"; 

interface AboutCourseProps {
  courseSlug: string;
  scrollToPricing: () => void;
}

export default function AboutCourse({ courseSlug, scrollToPricing }: AboutCourseProps) {
  const { setSelectedCourse, selectedCourse,setSelectedCourseTools } = useSelectedCourseStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      setIsLoading(true);
      const res = await fetchSelectedCourse(courseSlug ?? "");
      setSelectedCourse(res);
      setSelectedCourseTools(
        (res?.tools ?? []).map((tool: any) => ({
          toolName: tool.toolName,
          toolImage: tool.toolImage,
        }))
      );
      setIsLoading(false);
    };
    fetchCourse();
  }, [courseSlug, setSelectedCourse]);

  // --- Skeleton Loader ---
  if (isLoading) {
    return (
      <section className="min-h-[60vh] bg-neutral-900 flex items-center justify-center px-4 mt-10 mb-10">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="animate-pulse bg-neutral-800 rounded-2xl h-[320px] sm:h-[400px] lg:h-[480px]" />
          <div className="space-y-4">
            <div className="animate-pulse bg-neutral-800 h-8 w-3/4 rounded" />
            <div className="animate-pulse bg-neutral-800 h-6 w-full rounded" />
            <div className="animate-pulse bg-neutral-800 h-6 w-5/6 rounded" />
            <div className="animate-pulse bg-neutral-800 h-12 w-40 rounded mt-4" />
          </div>
        </div>
      </section>
    );
  }

  if (!selectedCourse) {
    return (
      <section className="min-h-[60vh] bg-neutral-900 flex items-center justify-center">
        <div className="text-red-400 text-xl font-medium">
          Course not found
        </div>
      </section>
    );
  }

  return (
    <section className="relative bg-neutral-950 py-16 sm:py-20 lg:py-24 px-4 sm:px-8 lg:px-16 overflow-hidden">
      <DotPatternLinearGradient />
      <HeaderSection />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Course Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative group rounded-2xl overflow-hidden shadow-xl"
        >
          <img
            src={selectedCourse.courseThumbnail}
            alt={selectedCourse.courseName}
            className="w-full h-[320px] sm:h-[400px] lg:h-[480px] object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            onError={(e) => (e.currentTarget.src = "/fallback-image.jpg")}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-500" />
        </motion.div>

        {/* Course Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-neutral-900 rounded-3xl p-8 shadow-lg flex flex-col justify-between space-y-6 max-w-3xl mx-auto"
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight">
            <Balancer>{selectedCourse.courseName}</Balancer>
          </h1>

         <p className="text-gray-300 text-base sm:text-lg leading-relaxed font-bricolage text-left">
  <Balancer>{selectedCourse.courseDescription}</Balancer>
</p>


          <div>
            <CustomButton
              title="Enroll now"
              icon=""
              onClick={scrollToPricing}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
