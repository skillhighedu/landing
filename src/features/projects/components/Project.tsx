import { useEffect, useMemo, useState } from "react";
import DashboardLayout from "@/features/dashboard/layout/DashboardLayout";
import DemoNotice from "@/features/dashboard/components/common/DemoNotice";
import { useDashboardRouteStore } from "@/store/dashboardRoute.store";
import SubmitModal from "../components/Model";
import ProjectCard from "../components/ProjectCard";
import ProjectCardSkeleton from "./ProjectCardSkeleton";
import { useDemoProjects } from "../hooks/useDemoProjects";
import { useProjects } from "../hooks/useProjects";
import {
  useSubmitProject,
  useUpdateProjectSubmission,
} from "../hooks/useSubmitProject";
import type { ProjectItem } from "../types";
import { BriefcaseBusiness, CheckCircle2, Clock3, FolderGit2, Sparkles, XCircle } from "lucide-react";
import { toast } from "sonner";

export default function Projects() {
  const { slug, mode } = useDashboardRouteStore();
  const submitMutation = useSubmitProject();
  const updateMutation = useUpdateProjectSubmission();

  const demoQuery = useDemoProjects(mode === "demo" ? slug : undefined);
  const realQuery = useProjects(mode === "real" ? slug : undefined);

  const { data: projects, isLoading } =
    mode === "demo" ? demoQuery : realQuery;
  const projectItems = projects?.projects ?? [];
  const totalProjects = projects?.meta?.totalProjects ?? projectItems.length;
  const submittedProjects = useMemo(
    () => projectItems.filter((project) => (project.solutions?.length ?? 0) > 0).length,
    [projectItems],
  );
  const approvedProjects = useMemo(
    () =>
      projectItems.filter(
        (project) => project.solutions?.[0]?.reviewState === "SUCCESSFUL",
      ).length,
    [projectItems],
  );
  const failedProjects = useMemo(
    () =>
      projectItems.filter(
        (project) => project.solutions?.[0]?.reviewState === "FAILED",
      ).length,
    [projectItems],
  );
  const reviewingProjects = useMemo(
    () =>
      projectItems.filter(
        (project) => project.solutions?.[0]?.reviewState === "PENDING",
      ).length,
    [projectItems],
  );

  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const locked = mode === "demo";

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    document.documentElement.scrollTo({ top: 0, left: 0, behavior: "auto" });
    document.body.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [mode, slug]);

  return (
    <DashboardLayout title="Projects">
      <div className="flex min-h-screen flex-col px-2 py-4 sm:px-4 sm:py-6">
        {mode === "demo" && <DemoNotice />}

        <section className="mx-auto w-full space-y-6">
          <div className="overflow-hidden rounded-[2rem] border border-border bg-gradient-to-br from-primary/10 via-background to-background shadow-sm">
            <div className="grid gap-6 px-5 py-6 sm:px-6 lg:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.95fr)] lg:px-8 lg:py-8">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 font-mono text-xs uppercase tracking-[0.18em] text-primary">
                  <Sparkles className="h-4 w-4" />
                  Project Studio
                </div>

                <h2 className="mt-4 max-w-2xl  text-2xl   text-foreground sm:text-3xl">
                  Build real deliverables, submit your work, and improve with feedback.
                </h2>

                <p className="mt-3 max-w-2xl font-mono text-sm leading-7 text-muted-foreground sm:text-base">
                  Each project is designed to move you from learning to execution. Keep submissions focused, practical, and easy to review.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3 lg:grid-cols-2">
                <div className="rounded-2xl border border-border bg-background/80 px-4 py-4">
                  <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    <BriefcaseBusiness className="h-4 w-4" />
                    Total
                  </div>
                  <div className="mt-3 text-2xl font-semibold text-foreground">{totalProjects}</div>
                  <p className="mt-1 text-sm font-mono text-muted-foreground">Projects in this track</p>
                </div>

                <div className="rounded-2xl border border-border bg-background/80 px-4 py-4">
                  <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    <FolderGit2 className="h-4 w-4" />
                    Submitted
                  </div>
                  <div className="mt-3 text-2xl font-semibold text-foreground">{submittedProjects}</div>
                  <p className="mt-1 text-sm font-mono text-muted-foreground">Projects with at least one submission</p>
                </div>

                <div className="rounded-2xl border border-border bg-background/80 px-4 py-4">
                  <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4" />
                    Approved
                  </div>
                  <div className="mt-3 text-2xl font-semibold text-foreground">{approvedProjects}</div>
                  <p className="mt-1 text-sm font-mono text-muted-foreground">Passed review successfully</p>
                </div>

                <div className="rounded-2xl border border-border bg-background/80 px-4 py-4">
                  <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    <XCircle className="h-4 w-4" />
                    Failed
                  </div>
                  <div className="mt-3 text-2xl font-semibold text-foreground">{failedProjects}</div>
                  <p className="mt-1 text-sm font-mono text-muted-foreground">Need fixes before approval</p>
                </div>

                <div className="rounded-2xl border border-border bg-background/80 px-4 py-4">
                  <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    <Clock3 className="h-4 w-4" />
                    Reviewing
                  </div>
                  <div className="mt-3 text-2xl font-semibold text-foreground">{reviewingProjects}</div>
                  <p className="mt-1 text-sm font-mono text-muted-foreground">Waiting for review outcome</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3">
            {isLoading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <ProjectCardSkeleton key={i} />
                ))
              : projectItems.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    locked={locked}
                    onOpen={(p) => {
                      if (locked) return;
                      setSelectedProject(p);
                      setIsModalOpen(true);
                    }}
                  />
                ))}

            {!isLoading && projectItems.length === 0 && (
              <div className="col-span-full rounded-[2rem] border border-dashed border-border bg-card px-6 py-12 text-center">
                <p className="font-mono text-sm uppercase tracking-[0.18em] text-muted-foreground">
                  No projects yet
                </p>
                <p className="mt-3 text-base text-foreground">
                  Projects for this course will appear here once they are available.
                </p>
              </div>
            )}
          </div>
        </section>

        <SubmitModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          isSubmitting={submitMutation.isPending || updateMutation.isPending}
          onSubmit={(githubLink, explanation) => {
            if (!selectedProject) return;

            const trimmedGithubLink = githubLink.trim();
            const trimmedExplanation = explanation.trim();
            const latestSolution =
              selectedProject.solutions?.slice().sort(
                (a, b) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
              )[0] ?? null;

            if (!trimmedGithubLink) {
              toast.error("GitHub link is required.");
              return;
            }

            if (!trimmedGithubLink.startsWith("https://github.com/")) {
              toast.error("Link must be a valid GitHub URL.");
              return;
            }

            if (trimmedExplanation.length < 30) {
              toast.error("Explanation must be at least 30 characters.");
              return;
            }

            if (latestSolution?.id) {
              updateMutation.mutate({
                solutionId: latestSolution.id,
                githubLink: trimmedGithubLink,
                explanation: trimmedExplanation,
              });
            } else {
              submitMutation.mutate({
                projectId: selectedProject.id,
                githubLink: trimmedGithubLink,
                explanation: trimmedExplanation,
              });
            }

            setIsModalOpen(false);
          }}
          selectedProject={selectedProject}
        />
      </div>
    </DashboardLayout>
  );
}
