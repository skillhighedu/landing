import { useParams } from "react-router-dom";
import { useEffect } from "react";

import LearnInPublic from "../sections/learn-in-public";
import CourseDashboardSkeleton from "../skeltons/CourseDashboardSkeleton";
import { useCourse } from "@/hooks/tanstack/useCourses";
import DashboardLayout from "../layout/DashboardLayout";
import ProgressSection from "@/features/dashboard/sections/progress/ProgressSection";
import { useDemoCourse } from "../hooks/useDemoCourse";
import CourseHeader from "../sections/course-header/CourseHeader";
import CourseCurriculum from "../sections/course-curriculum";
import DemoNotice from "../components/common/DemoNotice";

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
    return (
      <DashboardLayout title="Course Dashboard">
        {mode === "demo" && <DemoNotice />}
        <CourseDashboardSkeleton />
      </DashboardLayout>
    );
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
    <DashboardLayout title="Course Dashboard">
      {mode === "demo" && <DemoNotice />}

      <main className="min-h-screen rounded-[1.75rem] bg-neutral-50 px-3 py-6 text-neutral-900 sm:px-5 sm:py-8 lg:px-6 dark:bg-neutral-900 dark:text-white">

        <CourseHeader
          courseName={data.courseData.courseName}
          courseThumbnail={data.courseData.courseThumbnail}
          slug={slug!}
          mode={mode}
        />

        <div className="mx-auto mt-6 max-w-7xl space-y-8 sm:mt-8 sm:space-y-10">
          <ProgressSection
            mode={mode}
            realData={{
              topics: data.topicProgress,
              quizzes: data.quizProgress,
              projects: data.projectProgress,
              mentorPercentage: data.mentorPercentage ?? null,
            }}
          />

          <LearnInPublic mode={mode} />

          <CourseCurriculum modules={data.courseData.modules} />

        </div>
      </main>
    </DashboardLayout>
  );
}
