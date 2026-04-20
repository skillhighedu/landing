import { Navigate, useNavigate } from "react-router-dom";

import Container from "@/layouts/Container";
import HeaderSection from "@/components/common/HeaderSection";
import Spinner from "@/components/ui/Spinner";

import { useMentorProfile } from "../hooks/useMentorProfile";

export default function MentorSelectCoursePage() {
  const navigate = useNavigate();
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

  if (!assignedCourses.length) {
    return <Navigate to="/mentor/no-course" replace />;
  }

  if (assignedCourses.length === 1) {
    return <Navigate to={`/mentor/course/${assignedCourses[0]?.courseId}/projects`} replace />;
  }

  return (
    <Container size="full">
      <div className="mt-20 py-10 font-mono">
        <HeaderSection title="Choose Course" />

        <div className="mt-8 rounded-[28px] border border-border bg-card p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary/80">
            Mentor Workspace
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-foreground">
            Select the course you want to manage
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            Choose one assigned course to open projects, questions, and student performance for that course.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {assignedCourses.map((course) => (
              <button
                key={course.courseId}
                onClick={() => navigate(`/mentor/course/${course.courseId}/projects`)}
                className="rounded-[24px] border border-border bg-background p-5 text-left transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:bg-primary/5"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary/80">
                  Assigned Course
                </p>
                <h3 className="mt-3 text-lg font-semibold text-foreground">
                  {course.courseName}
                </h3>
                <p className="mt-2 break-all text-xs text-muted-foreground">
                  {course.courseId}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}
