import { useParams } from "react-router-dom";
import { useEffect } from "react";
import HeaderSection from "@/components/common/HeaderSection";
import CourseHeader from "@/components/course-dashboard/CourseHeader";
import ProgressSection from "@/components/course-dashboard/ProgressSection";
import LearnInPublic from "@/components/course-dashboard/LearnInPublic";
import CourseCurriculum from "@/components/course-dashboard/CourseCurriculum";


import { useCourse } from "@/hooks/tanstack/useCourses"; 
import CourseDashboardSkeleton from "@/components/course-dashboard/CourseDashboardSkeleton";
import DashboardLayout from "@/layouts/DashboardLayout";

export default function CourseDashboard() {
  const { slug } = useParams<{ slug: string }>();


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 🚀 Fetch the course data using ID
  const { data, isLoading, isError } = useCourse(slug!);


  if (isLoading) {
    return <CourseDashboardSkeleton/>
  }

  if (isError || !data) {
    return <div className="text-red-500 p-10">Failed to load course.</div>;
  }


  return (
   <DashboardLayout>
     <div className="min-h-screen bg-linear-to-b from-neutral-950 to-neutral-900 px-4 sm:px-8 py-12 text-white ">
      <HeaderSection title="Course Dashboard" />

      <CourseHeader courseName={data.courseData.courseName} courseThumbnail={data.courseData.courseThumbnail} totalTopicsCount={0} modules={[]} slug={slug} />

      <div className="max-w-7xl mx-auto space-y-8">
        <ProgressSection topicProgress={data.topicProgress} quizProgress={data.quizProgress} projectProgress={data.projectProgress} />
        <LearnInPublic />
        <CourseCurriculum modules={data && data.courseData.modules} />
      </div>
    </div>
   </DashboardLayout>
  );
}
