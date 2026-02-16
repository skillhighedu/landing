import { useState } from "react";
import DashboardLayout from "@/features/dashboard/layout/DashboardLayout";
import SubmitModal from "../components/Model";
import ProjectCard from "../components/ProjectCard";
import type { PlayGroundProps } from "@/types/dashboard/demo";
import DemoNotice from "@/features/dashboard/components/common/DemoNotice";
import { useDemoProjects } from "../hooks/useDemoProjects";
import { useProjects } from "../hooks/useProjects";
import { useDashboardRouteStore } from "@/store/dashboardRoute.store";
import type { ProjectItem } from "../types";
import ProjectCardSkeleton from "./ProjectCardSkeleton";
import { useSubmitProject } from "../hooks/useSubmitProject";

export default function Projects({ mode }: PlayGroundProps) {
  const { slug } = useDashboardRouteStore();
const submitMutation = useSubmitProject();

  const demoQuery = useDemoProjects(mode === "demo" ? slug : undefined);
  const realQuery = useProjects(mode === "real" ? slug : undefined);

  const { data: projects, isLoading } =
    mode === "demo" ? demoQuery : realQuery;

    console.log(projects)

  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const locked = mode === "demo";

  return (
    <DashboardLayout title="Projects">
      <div className="flex flex-col min-h-screen px-4 py-6">

        {/* REAL MODE → feature not live yet */}
        {/* {mode === "real" && <WorkInProgress />} */}

        {/* DEMO MODE → show demo projects */}
        {/* {mode === "demo" && ( */}
          <>
            <DemoNotice />

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-8">
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

          </>
        {/* )} */}

      </div>
    </DashboardLayout>
  );
}
