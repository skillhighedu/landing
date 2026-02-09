import { useState } from "react";
import DashboardLayout from "@/features/dashboard/layout/DashboardLayout";
import SubmitModal from "../components/Model";
import ProjectCard from "../components/ProjectCard";
import type { PlayGroundProps } from "@/types/dashboard/demo";
import DemoNotice from "@/features/dashboard/components/common/DemoNotice";
import { useDemoProjects} from "../hooks/useDemoProjects";
import { useProjects} from "../hooks/useProjects";

import { useDashboardRouteStore } from "@/store/dashboardRoute.store";
import type { ProjectItem } from "../types";
import ProjectCardSkeleton from "./ProjectCardSkeleton";

export default function Projects() {
  const { slug ,mode } = useDashboardRouteStore();

  
  const demoQuery = useDemoProjects(mode === "demo" ? slug : undefined); // its wokring in dmeo but check once
const realQuery = useProjects(mode === "real" ? slug : undefined);  // not going reqs if im logined and with mod ereal

const { data: projects, isLoading } =
  mode === "demo" ? demoQuery : realQuery;
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log(mode)
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
