import { Navigate, useParams } from "react-router-dom";

import Container from "@/layouts/Container";
import Spinner from "@/components/ui/Spinner";

import { useMentorProfile } from "../hooks/useMentorProfile";

export default function MentorHomeRedirect() {
  const { courseId } = useParams<{ courseId: string }>();
  const { isLoading, assignedCourses } = useMentorProfile();

  if (isLoading) {
    return (
      <Container size="full">
        <div className="flex min-h-[60vh] items-center justify-center">
          <Spinner />
        </div>
      </Container>
    );
  }

  if (courseId) {
    return <Navigate to={`/mentor/course/${courseId}/projects`} replace />;
  }

  if (assignedCourses.length === 1) {
    return <Navigate to={`/mentor/course/${assignedCourses[0]?.courseId}/projects`} replace />;
  }

  if (assignedCourses.length > 1) {
    return <Navigate to="/mentor/select-course" replace />;
  }

  return <Navigate to="/mentor/no-course" replace />;
}
