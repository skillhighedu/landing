import { FileText, Lock, Upload, CheckCircle, XCircle } from "lucide-react";
import type { ProjectItem } from "../types";
import CustomButton from "@/components/common/Button";

interface Props {
  project: ProjectItem;
  locked?: boolean;
  onOpen: (project: ProjectItem) => void;
}

export default function ProjectCard({ project, locked, onOpen }: Props) {
  const hasSolution = !!project.solutions?.length;
  const solution = hasSolution ? project.solutions![0] : null;

  const isApproved = solution?.reviewState === "SUCCESSFUL";

  const statusBg =
    solution?.reviewState === "SUCCESSFUL"
      ? "bg-green-50 dark:bg-green-950/20"
      : solution?.reviewState === "FAILED"
      ? "bg-red-50 dark:bg-red-950/20"
      : "bg-card";

  const buttonTitle = locked
    ? "Locked"
    : isApproved
    ? "Approved"
    : hasSolution
    ? "Update Submission"
    : "Submit Project";

  return (
    <div
      className={`rounded-3xl border border-border ${statusBg}
      p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-lg`}
    >
      <div>
        <h2 className="text-xl">{project.projectName}</h2>

        <a
          href={!locked ? project.projectLink ?? undefined : undefined}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-3 inline-flex items-center gap-2 text-sm text-primary  font-sans hover:underline ${
            locked ? "opacity-50 pointer-events-none" : ""
          }`}
        >
          <FileText className="w-4 h-4" />
          View Project Details
        </a>

        {solution && (
          <div className="mt-3 flex items-center gap-2 text-sm font-medium">
            {solution.reviewState === "SUCCESSFUL" && (
              <>
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-green-600">Approved</span>
              </>
            )}

            {solution.reviewState === "FAILED" && (
              <>
                <XCircle className="w-4 h-4 text-red-500" />
                <span className="text-red-600">Needs Fix</span>
              </>
            )}
          </div>
        )}
      </div>

      <div className="mt-6">
        <CustomButton
          title={buttonTitle}
          icon={
            locked || isApproved ? (
              <Lock className="ml-2 w-4 h-4" />
            ) : (
              <Upload className="ml-2 w-4 h-4" />
            )
          }
          disabled={locked || isApproved}
          onClick={() => {
            if (!locked && !isApproved) onOpen(project);
          }}
          className={`w-full ${
            locked || isApproved ? "opacity-60 cursor-not-allowed" : ""
          }`}
        />
      </div>
    </div>
  );
}
