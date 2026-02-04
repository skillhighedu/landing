import { useParams } from "react-router-dom";
import { useEffect } from "react";

import HeaderSection from "@/components/common/HeaderSection";
import CourseHeader from "@/components/course-dashboard/CourseHeader";
import ProgressSection from "@/components/course-dashboard/ProgressSection";
import LearnInPublic from "@/components/course-dashboard/LearnInPublic";
import CourseCurriculum from "@/components/course-dashboard/CourseCurriculum";
import CourseDashboardSkeleton from "@/components/course-dashboard/CourseDashboardSkeleton";

import { useCourse } from "@/hooks/tanstack/useCourses";
import DashboardLayout from "@/layouts/DashboardLayout";

export default function CourseDashboard() {
  const { slug } = useParams<{ slug: string }>();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { data, isLoading, isError } = useCourse(slug!);

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

          /* Light */
          bg-neutral-50 text-neutral-900

          /* Dark */
          dark:bg-neutral-900/50 dark:text-white mt-20
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
        />

        {/* Content */}
        <div className="mx-auto mt-8 max-w-7xl space-y-10">
          <ProgressSection
            topicProgress={data.topicProgress}
            quizProgress={data.quizProgress}
            projectProgress={data.projectProgress}
          />

          <LearnInPublic />

          <CourseCurriculum modules={data.courseData.modules} />
        </div>
      </main>
    </DashboardLayout>
  );
}
