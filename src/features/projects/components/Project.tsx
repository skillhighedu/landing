import { useState } from "react";
import DashboardLayout from "@/features/dashboard/layout/DashboardLayout";
import SubmitModal from "../components/Model";
import ProjectCard from "../components/ProjectCard";
import type { PlayGroundProps } from "@/types/dashboard/demo";
import DemoNotice from "@/features/dashboard/components/common/DemoNotice";
import { useDemoProjects } from "../hooks/useDemoProjects";
import { useDashboardRouteStore } from "@/store/dashboardRoute.store";
import type { ProjectItem } from "../types";
import ProjectCardSkeleton from "./ProjectCardSkeleton";

export default function Projects({ mode }: PlayGroundProps) {
  const { slug } = useDashboardRouteStore();
  const { data: projects, isLoading } = useDemoProjects(slug, mode);

  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const locked = mode === "demo";

  return (
    <DashboardLayout title="Projects">
      <div className="flex flex-col min-h-screen px-4 py-6">
        {mode === "demo" && <DemoNotice />}

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
          onSubmit={() => setIsModalOpen(false)}
          selectedProject={selectedProject}
        />
      </div>
    </DashboardLayout>
  );
}
