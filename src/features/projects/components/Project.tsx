import { useState } from "react";
import DashboardLayout from "@/features/dashboard/layout/DashboardLayout";
import SubmitModal from "../components/Model";
import ProjectCard, { type Project } from "../components/ProjectCard";
import type { PlayGroundProps } from "@/types/dashboard/demo";
import DemoNotice from "@/features/dashboard/components/common/DemoNotice";
export default function Projects({ mode }: PlayGroundProps) {
  const mockProjects: Project[] = [
    {
      id: "1",
      projectName: "E-commerce Landing Page",
      projectLink: "https://example.com/project1",
      solutions: [{ reviewState: "Pending", isCompleted: false }],
    },
    {
      id: "2",
      projectName: "Dashboard UI Clone",
      projectLink: "https://example.com/project2",
      solutions: [{ reviewState: "Approved", isCompleted: true }],
    },
    {
      id: "3",
      projectName: "Chat Application",
      projectLink: "https://example.com/project3",
      solutions: [{ reviewState: "Under Review", isCompleted: true }],
    },
  ];

  const [projects] = useState<Project[]>(mockProjects);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const locked = mode === "demo";

  return (
    <DashboardLayout title="Projects">
      <div className="flex flex-col min-h-screen px-4 py-6">

        {/* DEMO NOTICE */}
        {mode === "demo" && <DemoNotice />}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-8">
          {projects.map((project) => (
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
