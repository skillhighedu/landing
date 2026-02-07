import { FileText, Upload } from "lucide-react";
import CustomButton from "@/components/common/Button";

export type Project = {
  id: string;
  projectName: string;
  projectLink: string;
  solutions: {
    reviewState: string;
    isCompleted: boolean;
  }[];
};

interface Props {
  project: Project;
  locked?: boolean;
  onOpen: (project: Project) => void;
}

export default function ProjectCard({ project, locked, onOpen }: Props) {
  return (
    <div
      className="
        rounded-3xl border border-border
        bg-card
        p-7
        min-h-[240px]
        flex flex-col justify-between
        transition-all duration-300
        hover:shadow-xl hover:-translate-y-1
      "
    >
      {/* Top */}
      <div>
        <h2 className="text-2xl leading-snug">{project.projectName && project.projectName}</h2>

        <a
          href={!locked ? project.projectLink : undefined}
          target="_blank"
          rel="noopener noreferrer"
          className={`
            mt-3 inline-flex items-center gap-2
            text-sm text-primary font-sans
            hover:underline
            ${locked ? "opacity-50 pointer-events-none" : ""}
          `}
        >
          <FileText className="w-4 h-4" />
          View Project Details
        </a>
      </div>

      {/* Bottom */}
      <div className="flex items-center justify-between mt-8">
        <span
          className="
            px-4 py-1.5
            bg-muted font-sans
            rounded-full
            text-xs font-medium
          "
        >
          {project.solutions[0]?.reviewState}
        </span>

        <CustomButton
          title={
            project.solutions[0]?.isCompleted
              ? "Check Solution"
              : "Submit"
          }
          icon={<Upload className="ml-2" />}
          disabled={locked}
          onClick={() => {
            if (!locked) onOpen(project);
          }}
        />
      </div>
    </div>
  );
}
