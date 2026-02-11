import { useParams } from "react-router-dom";

import HeaderSection from "@/components/common/HeaderSection";
import { projects } from "./project.data";
import DashboardLayout from "@/features/dashboard/layout/DashboardLayout";

export default function ProjectDetails() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  if (!project) return null;

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-neutral-950 text-white py-10 px-4">
        <div className="max-w-5xl mx-auto mb-6">
          <HeaderSection title={project.title} />
        </div>

        <div className="max-w-3xl mx-auto bg-neutral-900 border border-neutral-800 rounded-2xl p-8">
          <p className="text-neutral-400">{project.description}</p>

          <div className="mt-6 flex gap-4">
            <span className="text-sm text-blue-400">
              {project.difficulty}
            </span>
            <span className="text-sm text-neutral-500">
              {project.time}
            </span>
          </div>

          <button className="mt-8 w-full bg-blue-600 hover:bg-blue-500 text-black py-3 rounded-xl font-semibold">
            Start Project
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
