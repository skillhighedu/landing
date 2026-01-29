import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CustomButton from "@/components/common/Button";
import { fetchSelectedCourse } from "@/services/course-service";
import { useSelectedCourseStore } from "@/store/useSelectedCourse";
import HeaderSection from "@/components/common/HeaderSection";
import Balancer from "react-wrap-balancer";

interface AboutCourseProps {
  courseSlug: string;
  scrollToPricing: () => void;
}

export default function AboutCourse({
  courseSlug,
  scrollToPricing,
}: AboutCourseProps) {
  const { selectedCourse, setSelectedCourse, setSelectedCourseTools } =
    useSelectedCourseStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const res = await fetchSelectedCourse(courseSlug);
      setSelectedCourse(res);
      setSelectedCourseTools(
        (res?.tools ?? []).map((tool: any) => ({
          toolName: tool.toolName,
          toolImage: tool.toolImage,
        }))
      );
      setLoading(false);
    }
    load();
  }, [courseSlug]);

  if (loading) {
    return (
      <section className="min-h-[70vh] bg-neutral-950 flex items-center justify-center ">
        <div className="w-full max-w-5xl space-y-6 px-4">
          <div className="h-10 bg-neutral-800 rounded w-3/4 animate-pulse" />
          <div className="h-6 bg-neutral-800 rounded w-full animate-pulse" />
          <div className="h-6 bg-neutral-800 rounded w-5/6 animate-pulse" />
          <div className="h-12 bg-neutral-800 rounded w-40 animate-pulse" />
        </div>
      </section>
    );
  }

  if (!selectedCourse) {
    return (
      <section className="min-h-[60vh] bg-neutral-950 flex items-center justify-center">
        <p className="text-red-400 text-lg">Course not found</p>
      </section>
    );
  }

  return (
    <section className="relative min-h-[90vh] bg-neutral-950 overflow-hidden mt-19">
      <HeaderSection />

      {/* ===== Background Image ===== */}
      <div className="absolute inset-0">
        <img
          src={selectedCourse.courseThumbnail}
          alt={selectedCourse.courseName}
          className="h-full w-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/85 via-neutral-950/70 to-neutral-950/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-transparent to-transparent" />
      </div>

      {/* ===== Content ===== */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8 pt-28 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl space-y-6"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
            <Balancer>{selectedCourse.courseName}</Balancer>
          </h1>

          <p className="text-base sm:text-lg text-neutral-300 font-sans leading-relaxed">
            <Balancer>{selectedCourse.courseDescription}</Balancer>
          </p>

          {/* CTA Row */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <CustomButton
              title="Enroll now"
              onClick={scrollToPricing}
              
            />

            

            {/* <span className="text-sm text-neutral-400 flex items-center">
              Limited seats · Beginner friendly
            </span> */}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
