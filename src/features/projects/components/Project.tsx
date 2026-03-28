import { useState } from "react";
import DashboardLayout from "@/features/dashboard/layout/DashboardLayout";
import DemoNotice from "@/features/dashboard/components/common/DemoNotice";
import { useDashboardRouteStore } from "@/store/dashboardRoute.store";
import SubmitModal from "../components/Model";
import ProjectCard from "../components/ProjectCard";
import ProjectCardSkeleton from "./ProjectCardSkeleton";
import { useDemoProjects } from "../hooks/useDemoProjects";
import { useProjects } from "../hooks/useProjects";
import { useSubmitProject } from "../hooks/useSubmitProject";
import type { ProjectItem } from "../types";

export default function Projects() {
  const { slug, mode } = useDashboardRouteStore();
  const submitMutation = useSubmitProject();

  const demoQuery = useDemoProjects(mode === "demo" ? slug : undefined);
  const realQuery = useProjects(mode === "real" ? slug : undefined);

  const { data: projects, isLoading } =
    mode === "demo" ? demoQuery : realQuery;

  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const locked = mode === "demo";

  return (
    <DashboardLayout title="Projects">
      <div className="flex min-h-screen flex-col px-4 py-6">
        {mode === "demo" && <DemoNotice />}

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <ProjectCardSkeleton key={i} />
              ))
            : projects?.projects.map((project) => (
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
        </div>

        <SubmitModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          isSubmitting={submitMutation.isPending}
          onSubmit={(githubLink, explanation) => {
            if (!selectedProject) return;

            submitMutation.mutate({
              projectId: selectedProject.id,
              githubLink,
              explanation,
            });

            setIsModalOpen(false);
          }}
          selectedProject={selectedProject}
        />
      </div>
    </DashboardLayout>
  );
}
