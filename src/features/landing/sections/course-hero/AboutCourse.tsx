'use client';

import { useEffect, useState } from "react";
import { motion, easeOut } from "framer-motion";
import CustomButton from "@/components/common/Button";
import { fetchSelectedCourse } from "@/services/course-service";
import { useSelectedCourseStore } from "@/store/useSelectedCourse";
import HeaderSection from "@/components/common/HeaderSection";
import Balancer from "react-wrap-balancer";
import HeroStats from "./components/HeroStats";

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

  /* =============================
     LOADING
  ============================== */
  if (loading) {
    return (
      <section className="min-h-[70vh] bg-neutral-950 flex items-center justify-center">
        <div className="w-full max-w-5xl space-y-6 px-4">
          <div className="h-10 bg-neutral-800 rounded w-3/4 animate-pulse" />
          <div className="h-6 bg-neutral-800 rounded w-full animate-pulse" />
          <div className="h-6 bg-neutral-800 rounded w-5/6 animate-pulse" />
          <div className="h-12 bg-neutral-800 rounded w-40 animate-pulse" />
        </div>
      </section>
    );
  }

  /* =============================
     NOT FOUND
  ============================== */
  if (!selectedCourse) {
    return (
      <section className="min-h-[60vh] bg-neutral-950 flex items-center justify-center">
        <p className="text-neutral-400 text-lg">Course not found</p>
      </section>
    );
  }

  /* =============================
     ANIMATIONS
  ============================== */
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
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
    <section className="relative min-h-[90vh] bg-neutral-950 overflow-hidden mt-19">
      <HeaderSection />

      {/* ===== Background ===== */}
      <div className="absolute inset-0">
        <img
          src={selectedCourse.courseThumbnail}
          alt={selectedCourse.courseName}
          className="h-full w-full object-cover"
        />
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
            className="text-4xl sm:text-5xl lg:text-6xl text-white leading-tight"
          >
            <Balancer>{selectedCourse.courseName}</Balancer>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg text-neutral-300 leading-relaxed max-w-2xl"
          >
            <Balancer>{selectedCourse.courseDescription}</Balancer>
          </motion.p>

          {/* Stats */}
          <motion.div variants={itemVariants}>
            <HeroStats />
          </motion.div>

          {/* CTA */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 pt-4"
          >
            <CustomButton
              title="Enroll now"
              onClick={scrollToPricing}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
