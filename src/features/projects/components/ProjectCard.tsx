import { FileText, Lock, Upload } from "lucide-react";
import type { ProjectItem } from "../types";
import CustomButton from "@/components/common/Button";

interface Props {
  project: ProjectItem;
  locked?: boolean;
  onOpen: (project: ProjectItem) => void;
}

export default function ProjectCard({ project, locked, onOpen }: Props) {
  return (
    <div
      className="
        rounded-3xl border border-border
        bg-card
        p-5 sm:p-6 lg:p-7
        min-h-[220px] sm:min-h-60
        flex flex-col justify-between
        transition-all duration-300
        hover:shadow-xl hover:-translate-y-1
      "
    >
      {/* TOP */}
      <div>
        <h2 className="text-lg sm:text-xl lg:text-2xl leading-snug">
          {project.title && project.title}
        </h2>

        <a
          href={!locked ? project.projectLink ?? undefined : undefined}
          target="_blank"
          rel="noopener noreferrer"
          className={`
            mt-3 inline-flex items-center gap-2
            text-xs sm:text-sm text-primary font-sans
            hover:underline
            ${locked ? "opacity-50 pointer-events-none" : ""}
          `}
        >
          <FileText className="w-4 h-4" />
          View Project Details
        </a>
      </div>

      {/* BUTTON */}
      <div className="mt-6">
        <CustomButton
          title={locked ? "Locked" : "Submit Project"}
          icon={
            locked ? (
              <Lock className="ml-2 w-4 h-4" />
            ) : (
              <Upload className="ml-2 w-4 h-4" />
            )
          }
          disabled={locked}
          onClick={() => {
            if (!locked) onOpen(project);
          }}
          className={`
            w-full
            text-sm sm:text-base
            ${locked ? "opacity-60 cursor-not-allowed" : ""}
          `}
        />
      </div>
    </div>
  );
}
