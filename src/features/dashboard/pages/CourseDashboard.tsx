import { useParams } from "react-router-dom";
import { useEffect } from "react";

import HeaderSection from "@/components/common/HeaderSection";

import LearnInPublic from "../sections/learn-in-public";

import CourseDashboardSkeleton from "@/components/course-dashboard/CourseDashboardSkeleton";

import { useCourse } from "@/hooks/tanstack/useCourses";
import DashboardLayout from "../layout/DashboardLayout";
import ProgressSection from "@/features/dashboard/sections/progress/ProgressSection";
import { useDemoCourse } from "../hooks/useDemoCourse";
import CourseHeader from "../sections/course-header/CourseHeader";
import CourseCurriculum from "../sections/course-curriculum";

type DashboardMode = "demo" | "real";

interface Props {
  mode: DashboardMode;
}

export default function CourseDashboardPage({ mode }: Props) {
  const { slug } = useParams<{ slug: string }>();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const query =
  mode === "demo"
    ? useDemoCourse(slug!)
    : useCourse(slug!);

const { data, isLoading, isError } = query;



  if (isLoading) {
    return <CourseDashboardSkeleton />;
  }

  if (isError || !data) {
    return (
      <DashboardLayout>
        <div className="flex min-h-[60vh] items-center justify-center px-6">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Failed to load course. Please try again.
          </p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <main
        className="
          min-h-screen
          px-4 sm:px-8 py-10
          bg-neutral-50 text-neutral-900
          dark:bg-neutral-900/50 dark:text-white
          mt-20
        "
      >
        {/* Page header */}
        <HeaderSection title="Course Dashboard" />

        {/* Course hero */}
        <CourseHeader
          courseName={data.courseData.courseName}
          courseThumbnail={data.courseData.courseThumbnail}
          totalTopicsCount={0}
          modules={[]}
          slug={slug}
          mode={mode}
        />

        {/* Content */}
        <div className="mx-auto mt-8 max-w-7xl space-y-10">
          <ProgressSection mode={mode} />

          <LearnInPublic mode={mode} />

          <CourseCurriculum modules={data.courseData.modules} />
        </div>
      </main>
    </DashboardLayout>
  );
}
