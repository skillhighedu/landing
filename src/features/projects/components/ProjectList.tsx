import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/layouts/DashboardLayout";
import HeaderSection from "@/components/common/HeaderSection";
import ProjectCard from "./ProjectCard";
import { projects } from "./project.data";

export default function ProjectList() {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-neutral-950 text-white py-10 px-4">
        <div className="max-w-6xl mx-auto mb-10">
          <HeaderSection title="Projects" />
        </div>

        <div className="max-w-6xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <ProjectCard
              key={p.id}
              index={i}
              title={p.title}
              description={p.description}
              difficulty={p.difficulty}
              time={p.time}
              onOpen={() => navigate(`/course-dashboard/projects/${p.id}`)}
            />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
