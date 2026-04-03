import { memo, useState, useEffect } from "react";
import { X, ExternalLink, FolderGit2, NotebookPen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import CustomButton from "@/components/common/Button";
import type { ProjectItem } from "../types";
import { getLatestProjectSolution } from "../utils/getLatestProjectSolution";

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

    const existingSolution = getLatestProjectSolution(selectedProject);

    useEffect(() => {
      if (selectedProject) {
        const latestSolution = getLatestProjectSolution(selectedProject);

        setProjectSolution({
          githubLink: latestSolution?.githubLink || "",
          explanation: latestSolution?.explanation || "",
        });
        return;
      }

      setProjectSolution({
        githubLink: "",
        explanation: "",
      });
    }, [selectedProject]);

    if (!isOpen || !selectedProject) return null;

    return (
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 p-3 backdrop-blur-sm sm:p-4">
        <div className="flex min-h-full items-center justify-center py-4 sm:py-6">
          <div className="w-full max-w-xl rounded-[1.75rem] border border-border bg-card p-4 shadow-2xl sm:p-7">
            <div className="flex items-start justify-between gap-3 border-b border-border pb-4">
              <div className="min-w-0">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  Project submission
                </p>
                <h2 className="mt-2 font-mono text-lg leading-snug sm:text-xl">
                  {existingSolution ? "Update Submission" : "Submit Solution"}
                </h2>
              </div>

              <button
                onClick={onClose}
                className="rounded-lg p-2 transition hover:bg-muted"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-5">
              <h3 className="font-mono text-base leading-7 sm:text-lg">
                {selectedProject.projectName}
              </h3>

              {selectedProject.projectLink && (
                <a
                  href={selectedProject.projectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex flex-wrap items-center gap-2 font-mono text-sm text-primary hover:underline"
                >
                  View Project Details <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>

            <div className="mt-6 grid gap-4">
              <div className="min-w-0 space-y-2">
                <label className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  <FolderGit2 className="h-4 w-4" />
                  GitHub Repository
                </label>
                <Input
                  type="url"
                  inputMode="url"
                  autoCapitalize="none"
                  autoCorrect="off"
                  autoComplete="url"
                  spellCheck={false}
                  placeholder="Enter GitHub repository URL"
                  value={projectSolution.githubLink}
                  onChange={(e) =>
                    setProjectSolution((prev) => ({
                      ...prev,
                      githubLink: e.target.value,
                    }))
                  }
                  className="max-w-full min-w-0 overflow-hidden text-ellipsis whitespace-nowrap font-mono text-sm sm:text-base"
                />
              </div>

              <div className="min-w-0 space-y-2">
                <label className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  <NotebookPen className="h-4 w-4" />
                  Solution Summary
                </label>
                <Textarea
                  autoCapitalize="sentences"
                  autoCorrect="on"
                  placeholder="Write a short description about your solution"
                  value={projectSolution.explanation}
                  onChange={(e) =>
                    setProjectSolution((prev) => ({
                      ...prev,
                      explanation: e.target.value,
                    }))
                  }
                  className="field-sizing-fixed min-h-28 max-w-full min-w-0 break-all whitespace-pre-wrap text-sm sm:min-h-32 sm:text-base"
                />
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:justify-end">
              <CustomButton
                title="Cancel"
                icon=""
                onClick={onClose}
                className="w-full font-mono sm:w-auto"
              />

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
                className="w-full font-mono sm:w-auto"
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
      </div>
    );
  }
);

export default SubmitModal;
