import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";

import Container from "@/layouts/Container";

import { MentorCourseSwitcher } from "../components/MentorCourseSwitcher";
import { useMentorProfile } from "../hooks/useMentorProfile";

export default function MentorCourseLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { courseId = "" } = useParams<{ courseId: string }>();
  const { assignedCourses } = useMentorProfile();

  const handleCourseChange = (nextCourseId: string) => {
    if (!nextCourseId || nextCourseId === courseId) {
      return;
    }

    const suffix = location.pathname.replace(`/mentor/course/${courseId}`, "") || "/projects";
    navigate(`/mentor/course/${nextCourseId}${suffix}`);
  };

  return (
    <>
      <Container size="full">
        <div className="mt-20 py-6 font-mono">
        <MentorCourseSwitcher
          assignedCourses={assignedCourses}
          selectedCourseId={courseId}
          onSelectCourse={handleCourseChange}
        />
        </div>
      </Container>
      <Outlet />
    </>
  );
}
