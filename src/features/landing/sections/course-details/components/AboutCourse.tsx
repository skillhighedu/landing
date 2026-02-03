'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Balancer from 'react-wrap-balancer';

import CustomButton from '@/components/common/Button';
import HeaderSection from '@/components/common/HeaderSection';

import { fetchSelectedCourse } from '@/services/course-service';
import { useSelectedCourseStore } from '@/store/useSelectedCourse';

import type { AboutCourseProps } from '../types';
import { containerVariants, itemVariants } from '../animations';
import { COURSE_STATS } from '../constants/courseStats';

export default function AboutCourse({
  courseSlug,
  scrollToPricing,
}: AboutCourseProps) {
  const {
    selectedCourse,
    setSelectedCourse,
    setSelectedCourseTools,
  } = useSelectedCourseStore();

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
  }, [courseSlug, setSelectedCourse, setSelectedCourseTools]);

  /* =============================
     LOADING
  ============================== */
  if (loading) {
    return (
      <section className="min-h-[70vh] bg-neutral-950 flex items-center justify-center">
        <p className="text-neutral-400">Loading course…</p>
      </section>
    );
  }

  /* =============================
     NOT FOUND
  ============================== */
  if (!selectedCourse) {
    return (
      <section className="min-h-[60vh] bg-neutral-950 flex items-center justify-center ">
        <div className="text-center space-y-2">
          <p className="text-neutral-400 text-lg">Course not found</p>
          <p className="text-sm text-neutral-500">
            Please check the course URL and try again.
          </p>
        </div>
      </section>
    );
  }

  /* =============================
     HERO
  ============================== */
  return (
   <section
  className="relative min-h-[90vh] overflow-hidden bg-white dark:bg-neutral-950"
  aria-label="Course hero section"
>
  {/* Header */}
  <div className="relative z-20 mb-12">
    <HeaderSection />
  </div>

  {/* ===== Background Image ===== */}
  <div className="absolute inset-0 z-0">
    <img
      src={selectedCourse.courseThumbnail || '/fallback-course.jpg'}
      alt={selectedCourse.courseName}
      className="h-full w-full object-cover"
      loading="eager"
    />

    {/* Horizontal overlay */}
    <div
      className="
        absolute inset-0
        bg-gradient-to-r
        from-white/95 via-white/70 to-white/40
        dark:from-neutral-950 dark:via-neutral-950/60 dark:to-neutral-950/30
      "
    />

    {/* Vertical fade */}
    <div
      className="
        absolute inset-0
        bg-gradient-to-t
        from-white/95 via-white/50 to-transparent
        dark:from-neutral-950/95 dark:via-neutral-950/40 dark:to-transparent
      "
    />
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
        className="
          text-4xl sm:text-5xl lg:text-6xl
          font-semibold leading-tight
          text-neutral-900 dark:text-white
        "
      >
        <Balancer>{selectedCourse.courseName}</Balancer>
      </motion.h1>

      {/* Description */}
      <motion.p
        variants={itemVariants}
        className="
          text-base sm:text-lg leading-relaxed max-w-2xl
          text-neutral-700 dark:text-neutral-300 font-sans
        "
      >
        <Balancer>{selectedCourse.courseDescription}</Balancer>
      </motion.p>

      {/* Stats */}
      <motion.div
        variants={itemVariants}
        className="flex flex-wrap gap-x-6 gap-y-3"
      >
        {COURSE_STATS.map(({ label, icon: Icon }) => (
          <div
            key={label}
            className="
              flex items-center gap-2 text-sm
              text-neutral-600 dark:text-neutral-400
            "
          >
            <Icon className="w-4 h-4 text-neutral-700 dark:text-neutral-300" />
            <span>{label}</span>
          </div>
        ))}
      </motion.div>

      {/* CTA */}
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
