import { memo, useState, useEffect } from "react";
import { X, ExternalLink, FolderGit2, NotebookPen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import CustomButton from "@/components/common/Button";
import type { ProjectItem } from "../types";

interface SubmitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (githubLink: string, description: string) => void;
  selectedProject: ProjectItem | null;
  isSubmitting?: boolean;
}

interface LocalSolutionState {
  githubLink: string;
  explanation: string;
}

const SubmitModal = memo(
  ({
    isOpen,
    onClose,
    onSubmit,
    selectedProject,
    isSubmitting,
  }: SubmitModalProps) => {
    const [projectSolution, setProjectSolution] =
      useState<LocalSolutionState>({
        githubLink: "",
        explanation: "",
      });

    const existingSolution =
      selectedProject?.solutions?.slice().sort(
        (a, b) =>
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime()
      )[0] ?? null;

    useEffect(() => {
      if (selectedProject) {
        const latestSolution =
          selectedProject.solutions?.slice().sort(
            (a, b) =>
              new Date(b.createdAt).getTime() -
              new Date(a.createdAt).getTime()
          )[0];

        setProjectSolution({
          githubLink: latestSolution?.githubLink || "",
          explanation: latestSolution?.explanation || "",
        });
      }
    }, [selectedProject]);

    if (!isOpen || !selectedProject) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
        <div className="w-full max-w-xl rounded-[1.75rem] border border-border bg-card p-6 shadow-2xl sm:p-7">

          <div className="flex items-center justify-between border-b border-border pb-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Project submission
              </p>
              <h2 className="mt-2 font-mono text-xl">Submit Solution</h2>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-muted transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-5">
            <h3 className="font-mono text-lg">{selectedProject.projectName}</h3>

            {selectedProject.projectLink && (
              <a
                href={selectedProject.projectLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex items-center gap-2 font-mono text-sm text-primary hover:underline"
              >
                View Project Details <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>

          <div className="mt-6 grid gap-4">
            <div className="space-y-2">
              <label className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
                <FolderGit2 className="h-4 w-4" />
                GitHub Repository
              </label>
            <Input
              placeholder="Enter GitHub repository URL"
              value={projectSolution.githubLink}
              onChange={(e) =>
                setProjectSolution((prev) => ({
                  ...prev,
                  githubLink: e.target.value,
                }))
              }
              className="font-mono"
            />
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
                <NotebookPen className="h-4 w-4" />
                Solution Summary
              </label>
            <Textarea
              placeholder="Write a short description about your solution"
              value={projectSolution.explanation}
              onChange={(e) =>
                setProjectSolution((prev) => ({
                  ...prev,
                  explanation: e.target.value,
                }))
              }
              className="min-h-32"
            />
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:justify-end">
            <CustomButton title="Cancel" icon="" onClick={onClose} className="font-mono sm:w-auto" />

            <CustomButton
              title={
                isSubmitting
                  ? "Submitting..."
                  : existingSolution
                  ? "Update"
                  : "Submit"
              }
              icon=""
              disabled={isSubmitting}
              className="font-mono sm:w-auto"
              onClick={() =>
                onSubmit(
                  projectSolution.githubLink,
                  projectSolution.explanation
                )
              }
            />
          </div>
        </div>
      </div>
    );
  }
);

export default SubmitModal;
