import type { MentorAssignedCourse } from "../types";

type MentorCourseSwitcherProps = {
  assignedCourses: MentorAssignedCourse[];
  selectedCourseId: string;
  onSelectCourse: (courseId: string) => void;
  compact?: boolean;
};

export function MentorCourseSwitcher({
  assignedCourses,
  selectedCourseId,
  onSelectCourse,
  compact = false,
}: MentorCourseSwitcherProps) {
  if (assignedCourses.length <= 1) {
    return null;
  }

  return (
    <div
      className={`rounded-[24px] border border-border bg-card/85 shadow-sm ${
        compact ? "p-4" : "p-5"
      }`}
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary/80">
            Active Mentor Course
          </p>
          <h2 className="mt-2 text-lg font-semibold text-foreground">
            Switch the course you are reviewing
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Your dashboard, questions, and performance data will follow the selected course.
          </p>
        </div>

        <div className="w-full lg:w-[320px]">
          <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Selected course
          </label>
          <select
            value={selectedCourseId}
            onChange={(event) => onSelectCourse(event.target.value)}
            className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:ring-2 focus:ring-primary/30"
          >
            <option value="">Choose a course</option>
            {assignedCourses.map((course) => (
              <option key={course.courseId} value={course.courseId}>
                {course.courseName}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export function MentorCourseRequiredState({
  hasAssignedCourses,
  onGoProfile,
}: {
  hasAssignedCourses: boolean;
  onGoProfile?: () => void;
}) {
  return (
    <div className="rounded-[28px] border border-dashed border-border bg-card/70 px-6 py-16 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-muted text-lg font-semibold text-muted-foreground">
        MC
      </div>
      <h2 className="mt-4 text-lg font-semibold text-foreground">
        {hasAssignedCourses ? "Choose a course to continue" : "No assigned courses yet"}
      </h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
        {hasAssignedCourses
          ? "Select one of your assigned courses to load projects, student performance, and questions."
          : "This mentor account does not have any assigned courses right now. Please contact an admin to continue."}
      </p>
      {onGoProfile && (
        <button
          onClick={onGoProfile}
          className="mt-5 inline-flex items-center justify-center rounded-2xl border border-border px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
        >
          Open Mentor Profile
        </button>
      )}
    </div>
  );
}
