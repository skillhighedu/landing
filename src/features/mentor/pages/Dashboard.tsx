import CustomButton from "@/components/common/Button";
import HeaderSection from "@/components/common/HeaderSection";
import Container from "@/layouts/Container";
import PendingBadge from "../components/PendingBadge";
import SkeletonCard from "../components/Skelton";
import StatCard from "../components/StatCard";
import { useProjects } from "../hooks/projectHook";
import { useNavigate, useParams } from "react-router-dom";
import { useMentorProfile } from "../hooks/useMentorProfile";

export default function MentorDashboard() {
  const navigate = useNavigate();
  const { courseId = "" } = useParams<{ courseId: string }>();
  const {
    selectedCourse,
    isLoading: isProfileLoading,
  } = useMentorProfile();
  const { data: projects, isLoading, isError } = useProjects(courseId);

  const totalPending =
    projects?.reduce(
      (accumulator, project) =>
        accumulator +
        project.solutions.filter((solution) => solution.reviewState === "REVIEWING").length,
      0
    ) ?? 0;

  const totalApproved =
    projects?.reduce(
      (accumulator, project) =>
        accumulator +
        project.solutions.filter((solution) => solution.reviewState === "SUCCESSFUL").length,
      0
    ) ?? 0;

  const projectsNeedingReview =
    projects?.filter((project) =>
      project.solutions.some((solution) => solution.reviewState === "REVIEWING")
    ).length ?? 0;

  if (isProfileLoading || isLoading) {
    return (
      <Container size="full">
        <div className="mt-20 py-10 font-mono">
          <HeaderSection title="Project Submissions" />
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="h-24 animate-pulse rounded-[26px] bg-muted/40" />
            ))}
          </div>
          <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        </div>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container>
        <div className="mt-20 py-10 font-mono">
          <HeaderSection title="Project Submissions" />
          <div className="mt-10 rounded-[28px] border border-rose-200 bg-rose-50/70 p-8 text-center dark:border-rose-900 dark:bg-rose-950/20">
            <p className="text-lg font-semibold text-foreground">Failed to load mentor dashboard</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Project submissions could not be loaded right now. Please refresh and try again.
            </p>
          </div>
        </div>
      </Container>
    );
  }

  if (!projects || projects.length === 0) {
    return (
      <Container >
        <div className="mt-20 py-10 font-mono">
          <HeaderSection title="Project Submissions" />
          <div className="mt-10 rounded-[28px] border border-dashed border-border bg-card/70 p-12 text-center">
            <p className="text-lg font-semibold text-foreground">No mentor projects found</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Once projects are assigned, they will appear here with review status and actions.
            </p>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container size="full">
      <div className="mt-20 py-10 font-mono">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <HeaderSection title="Project Submissions" />
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Review submitted work, prioritize pending items, and jump directly into performance
              tracking from the same mentor workspace.
            </p>
            {selectedCourse && (
              <p className="mt-2 text-xs uppercase tracking-[0.18em] text-primary/80">
                Active course: {selectedCourse.courseName}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <CustomButton title="View Questions" onClick={() => navigate(`/mentor/course/${courseId}/questions`)}>
              View Questions
            </CustomButton>
            <CustomButton title="View Performance" onClick={() => navigate(`/mentor/course/${courseId}/performance`)}>
              View Performance
            </CustomButton>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-[repeat(4,minmax(0,1fr))]">
          <StatCard value={projects.length} label="Total Projects" />
          <StatCard
            value={projectsNeedingReview}
            label="Need Review"
            accent={projectsNeedingReview > 0}
          />
          <StatCard value={totalPending} label="Pending Solutions" accent={totalPending > 0} />
          <StatCard value={totalApproved} label="Approved" />
        </div>

        <div className="mt-8 rounded-[28px] border border-border bg-card/85 p-5 shadow-sm backdrop-blur">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Active Review Queue
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Projects are sorted visually by review urgency and current submission state.
              </p>
            </div>

            {totalPending > 0 && (
              <span className="text-xs text-amber-700 dark:text-amber-400">
                {totalPending} solution{totalPending !== 1 ? "s" : ""} awaiting review
              </span>
            )}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
          {projects.map((project, index) => {
            const pendingCount = project.solutions.filter(
              (solution) => solution.reviewState === "REVIEWING"
            ).length;
            const approvedCount = project.solutions.filter(
              (solution) => solution.reviewState === "SUCCESSFUL"
            ).length;
            const submissionCount = project.solutions.length;
            const hasPending = pendingCount > 0;
            const completionPercentage =
              submissionCount > 0 ? Math.round((approvedCount / submissionCount) * 100) : 0;

            return (
              <div
                key={project.id}
                style={{ animationDelay: `${index * 60}ms` }}
                className={`group relative flex flex-col justify-between rounded-[28px] border p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md ${
                  hasPending
                    ? "border-amber-200 bg-amber-50/20 dark:border-amber-800 dark:bg-amber-950/10"
                    : "border-border bg-card/90"
                }`}
              >
                {hasPending && (
                  <div className="absolute left-0 top-5 bottom-5 w-1 rounded-full bg-amber-400" />
                )}

                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/70">
                        Project {index + 1}
                      </p>
                      <h3 className="mt-2 truncate text-lg font-semibold text-foreground">
                        {project.projectName}
                      </h3>
                    </div>

                    {hasPending ? (
                      <PendingBadge count={pendingCount} />
                    ) : submissionCount === 0 ? (
                      <span className="inline-flex items-center rounded-full border border-border bg-muted/50 px-2.5 py-1 text-xs text-muted-foreground">
                        No submissions
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/20 dark:text-emerald-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        All reviewed
                      </span>
                    )}
                  </div>

                  <div className="mt-5 grid grid-cols-3 gap-3">
                    <ProjectMiniStat label="Submissions" value={submissionCount} />
                    <ProjectMiniStat label="Approved" value={approvedCount} />
                    <ProjectMiniStat label="Pending" value={pendingCount} />
                  </div>

                  <div className="mt-5 rounded-2xl border border-border/70 bg-background/80 p-4">
                    <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
                      <span>Approval progress</span>
                      <span className="tabular-nums">{completionPercentage}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-muted">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${
                          hasPending ? "bg-amber-400" : "bg-emerald-500"
                        }`}
                        style={{ width: `${completionPercentage}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
                  <a
                    href={project.projectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-border bg-background px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                  >
                    <svg
                      className="h-3.5 w-3.5 opacity-60"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6m0 0v6m0-6L10 14" />
                    </svg>
                    View Project
                  </a>

                  <CustomButton
                    title="Review Solutions"
                    className={`flex-1 transition-all duration-150 ${
                      hasPending
                        ? "border-none bg-primary text-primary-foreground shadow-sm hover:opacity-90"
                        : "cursor-default border-none bg-muted text-muted-foreground opacity-60"
                    }`}
                    disabled={!hasPending}
                    onClick={() =>
                      hasPending &&
                      navigate(`/mentor/course/${courseId}/projects/solutions`, {
                        state: { projectId: project.id, projectName: project.projectName },
                      })
                    }
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Container>
  );
}

function ProjectMiniStat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-border/70 bg-background/80 px-3 py-3">
      <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
      <p className="mt-2 text-lg font-semibold text-foreground">{value}</p>
    </div>
  );
}
