import { useParams } from "react-router-dom";
import { useEffect } from "react";
import HeaderSection from "@/components/ui/HeaderSection";
import { Courses } from "@/data/course";
import { courseProgressData } from "@/data/courseProgress";
import { courseDetailsData } from "@/data/courseDetails";
import { courseCurriculumData } from "@/data/courseCurriculum";
import CourseHeader from "@/components/course-dashboard/CourseHeader";
import ProgressSection from "@/components/course-dashboard/ProgressSection";
import LearnInPublic from "@/components/course-dashboard/LearnInPublic";
import CourseCurriculum from "@/components/course-dashboard/CourseCurriculum";

export default function CourseDashboard() {
  const { courseId } = useParams<{ courseId: string }>();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const progress = courseProgressData[courseId as keyof typeof courseProgressData] || courseProgressData["1"];
  const details = courseDetailsData[courseId as keyof typeof courseDetailsData] || courseDetailsData["1"];
  const course = Courses.find(c => c.id === courseId) || Courses[0];
  const curriculum = courseCurriculumData[courseId as keyof typeof courseCurriculumData] || courseCurriculumData["1"];

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-950 to-neutral-900 px-4 sm:px-8 py-12 text-white">
      <HeaderSection title="Course Dashboard" />

      <CourseHeader course={course} details={details} />

      <div className="max-w-7xl mx-auto space-y-8">
        <ProgressSection progress={progress} />
        <LearnInPublic />
        <CourseCurriculum modules={curriculum} />
      </div>
    </div>
  );
}
