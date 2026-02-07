import { memo, useState, useEffect } from "react";
import { X, ExternalLink, Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import CustomButton from "@/components/common/Button";

interface SubmitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (githubLink: string, description: string) => void;
  selectedProject: Project | null;
}

const SubmitModal = memo(
  ({ isOpen, onClose, onSubmit, selectedProject }: SubmitModalProps) => {
    const [projectSolution, setProjectSolution] = useState<ProjectSolution>({
      githubLink: "",
      explanation: "",
    });

    useEffect(() => {
      if (selectedProject) {
        const existingSolution = selectedProject.solutions?.[0] ?? null;
        setProjectSolution({
          githubLink: existingSolution?.githubLink || "",
          explanation: existingSolution?.explanation || "",
        });
      }
    }, [selectedProject]);

    if (!isOpen || !selectedProject) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
        <div
          className="
            w-full max-w-lg
            rounded-2xl
            bg-card
            border border-border
            shadow-2xl
            p-6
          "
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-border">
            <h2 className="text-xl ">Submit Solution</h2>

            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-muted transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Project Info */}
          <div className="mt-5">
            <h3 className=" text-lg">
              {selectedProject.projectName &&  selectedProject.projectName}
            </h3>

            <a
              href={selectedProject.projectLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-primary mt-1 hover:underline"
            >
              View Project Details <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Inputs */}
          <div className="mt-6 space-y-4">
            <Input
              placeholder="Enter GitHub repository URL"
              value={projectSolution.githubLink}
              onChange={(e) =>
                setProjectSolution((prev) => ({
                  ...prev,
                  githubLink: e.target.value,
                }))
              }
            />

            <Textarea
              placeholder="Write a short description about your solution"
              className="font-sans"
              value={projectSolution.explanation}
              onChange={(e) =>
                setProjectSolution((prev) => ({
                  ...prev,
                  explanation: e.target.value,
                }))
              }
            />
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-border">
            <CustomButton title="Cancel" variant="outline" icon={""} className="text-neutral-700 dark:text-neutral-50" onClick={onClose}>
              
            </CustomButton>

            <CustomButton
            title= {selectedProject?.solutions?.length ? "Update" : "Submit"}
            icon={""}
              onClick={() =>
                onSubmit(
                  projectSolution.githubLink,
                  projectSolution.explanation
                )
              }
            >
             
            </CustomButton>
          </div>
        </div>
      </div>
    );
  }
);

export default SubmitModal;
