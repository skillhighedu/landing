import { useEffect } from "react";
import { Navigate, Outlet, useParams } from "react-router-dom";

import Spinner from "@/components/ui/Spinner";
import Container from "@/layouts/Container";
import { useMentorCourseStore } from "@/store/mentorCourse.store";

import { useMentorProfile } from "@/features/mentor/hooks/useMentorProfile";

export default function MentorCourseRoute() {
  const { courseId = "" } = useParams<{ courseId: string }>();
  const { isLoading, assignedCourses } = useMentorProfile();
  const setSelectedCourseId = useMentorCourseStore((state) => state.setSelectedCourseId);
  const isAssigned = assignedCourses.some((course) => course.courseId === courseId);

  useEffect(() => {
    if (courseId && isAssigned) {
      setSelectedCourseId(courseId);
    }
  }, [courseId, isAssigned, setSelectedCourseId]);

  if (isLoading) {
    return (
      <Container size="full">
        <div className="flex min-h-[60vh] items-center justify-center">
          <Spinner />
        </div>
      </Container>
    );
  }

  if (!assignedCourses.length) {
    return <Navigate to="/mentor/no-course" replace />;
  }

  if (!isAssigned) {
    return (
      <Navigate
        to={assignedCourses.length > 1 ? "/mentor/select-course" : `/mentor/course/${assignedCourses[0]?.courseId}/projects`}
        replace
      />
    );
  }

  return <Outlet />;
}
