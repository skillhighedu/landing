'use client';

import { useEffect, useState } from "react";
import { easeOut, motion } from "framer-motion";
// import { Skeleton } from "@/components/";
import CustomButton from "@/components/common/Button";
import { fetchSelectedCourse } from "@/services/course-service";
import { useSelectedCourseStore } from "@/store/useSelectedCourse";
import HeaderSection from "@/components/common/HeaderSection";
import Balancer from "react-wrap-balancer";

interface AboutCourseProps {
  courseSlug: string;
  scrollToPricing: () => void;
}

interface CourseStat {
  label: string;
  icon: string;
}

const fakeStats = ["1k+ learners trained", "Used across 20+ colleges", "Designed for real-world roles"];

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

  /* =============================
     LOADING
  ============================== */
  if (loading) {
    return (
      // <section 
      //   className="min-h-[90vh] bg-neutral-950 flex items-center justify-center"
      //   aria-label="Loading course content"
      // >
      //   <div className="w-full max-w-6xl space-y-8 px-4 sm:px-8 pt-28 pb-20">
      //     <div className="max-w-3xl space-y-8">
      //       {/* Title skeleton */}
      //       <Skeleton className="h-16 w-3/4 rounded-lg" />
            
      //       {/* Description skeleton */}
      //       <div className="space-y-3">
      //         <Skeleton className="h-6 w-full rounded-lg" />
      //         <Skeleton className="h-6 w-5/6 rounded-lg" />
      //         <Skeleton className="h-6 w-4/5 rounded-lg" />
      //       </div>
            
      //       {/* Stats skeleton */}
      //       <div className="flex flex-wrap gap-6">
      //         <Skeleton className="h-5 w-32 rounded-lg" />
      //         <Skeleton className="h-5 w-40 rounded-lg" />
      //         <Skeleton className="h-5 w-36 rounded-lg" />
      //       </div>
            
      //       {/* CTA skeleton */}
      //       <Skeleton className="h-12 w-40 rounded-lg" />
      //     </div>
      //   </div>
      // </section>
      <h1>loading</h1>
    );
  }

  /* =============================
     NOT FOUND
  ============================== */
  if (!selectedCourse) {
    return (
      <section className="min-h-[60vh] bg-neutral-950 flex items-center justify-center">
        <div className="text-center space-y-2">
          <p className="text-neutral-400 text-lg">Course not found</p>
          <p className="text-sm text-neutral-500">Please check the course URL and try again.</p>
        </div>
      </section>
    );
  }

  /* =============================
     COURSE STATS WITH ICONS
  ============================== */
  const courseStats: CourseStat[] = [
    { label: "1k+ learners trained", icon: "👥" },
    { label: "Used across 20+ colleges", icon: "🎓" },
    { label: "Designed for real-world roles", icon: "💼" },
  ];

  /* =============================
     ANIMATION VARIANTS
  ============================== */
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: easeOut },
    },
  };

  /* =============================
     HERO
  ============================== */
  return (
    <section 
      className="relative min-h-[90vh] bg-neutral-950 overflow-hidden mt-19"
      aria-label="Course hero section"
    >
      <HeaderSection />

      {/* ===== Background with optimized image ===== */}
      <div className="absolute inset-0">
        <img
          src={selectedCourse.courseThumbnail || "/fallback-course.jpg"}
          alt=""
          className="h-full w-full object-cover"
          loading="eager"
        />
        {/* Multi-layer gradient for better overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/60 to-neutral-950/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/95 via-neutral-950/30 to-transparent" />
      </div>

      {/* ===== Content ===== */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8 pt-28 pb-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl space-y-8"
        >
          {/* Title */}
          <motion.h1 
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl  text-white leading-tight"
          >
            <Balancer>{selectedCourse.courseName}</Balancer>
          </motion.h1>

          {/* Description */}
          <motion.p 
            variants={itemVariants}
            className="text-base sm:text-lg font-sans text-neutral-300 leading-relaxed max-w-2xl"
          >
            <Balancer>{selectedCourse.courseDescription}</Balancer>
          </motion.p>

          {/* ===== SOCIAL PROOF WITH ICONS ===== */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap gap-x-6 gap-y-3"
          >
            {courseStats.map((stat) => (
              <div 
                key={stat.label}
                className="flex items-center font-sans gap-2 text-sm text-neutral-400 whitespace-nowrap"
              >
                <span className="text-lg">{stat.icon}</span>
                <span>{stat.label}</span>
              </div>
            ))}
          </motion.div>

          {/* ===== CTA ===== */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 pt-4"
          >
            <CustomButton
              title="Enroll now"
              onClick={scrollToPricing}
              aria-label="Enroll in this course"
            />

         
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
