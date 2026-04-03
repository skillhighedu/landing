import { FileText, Lock, Upload, CheckCircle, XCircle, ArrowUpRight, TimerReset } from "lucide-react";
import type { ProjectItem } from "../types";
import CustomButton from "@/components/common/Button";
import { getLatestProjectSolution } from "../utils/getLatestProjectSolution";
import { normalizeProjectReviewState } from "../utils/normalizeProjectReviewState";

interface Props {
  project: ProjectItem;
  locked?: boolean;
  onOpen: (project: ProjectItem) => void;
}

export default function ProjectCard({ project, locked, onOpen }: Props) {
  const hasSolution = !!project.solutions?.length;
  const solution = getLatestProjectSolution(project);
  const normalizedReviewState = normalizeProjectReviewState(solution?.reviewState);

  const isApproved = normalizedReviewState === "SUCCESSFUL";
  const statusTone =
    normalizedReviewState === "SUCCESSFUL"
      ? "border-emerald-200/70 bg-emerald-50/70 dark:border-emerald-900/40 dark:bg-emerald-950/10"
      : normalizedReviewState === "FAILED"
      ? "border-rose-200/70 bg-rose-50/70 dark:border-rose-900/40 dark:bg-rose-950/10"
      : "border-border bg-card";

  const buttonTitle = locked
    ? "Locked"
    : isApproved
    ? "Approved"
    : hasSolution
    ? "Update Submission"
    : "Submit Project";

  return (
    <div
      className={`flex h-full flex-col justify-between rounded-[1.75rem] border p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg ${statusTone}`}
    >
      <div>
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
              <TimerReset className="h-3.5 w-3.5" />
              Project task
            </div>

            <h2 className="mt-3 font-mono text-xl leading-snug">{project.projectName}</h2>
          </div>

          <div className="inline-flex shrink-0 items-center gap-1 rounded-full border border-border bg-background/80 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
            {locked ? "Locked" : "Open"}
          </div>
        </div>

        {project.description && (
          <p className="mt-4 text-sm leading-7 text-muted-foreground line-clamp-3">
            {project.description}
          </p>
        )}

        <a
          href={!locked ? project.projectLink ?? undefined : undefined}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-4 inline-flex items-center gap-2 font-mono text-sm text-primary hover:underline ${
            locked ? "opacity-50 pointer-events-none" : ""
          }`}
        >
          <FileText className="w-4 h-4" />
          View Project Details
          <ArrowUpRight className="h-4 w-4" />
        </a>

        {solution && (
          <div className="mt-4 flex items-center gap-2 font-mono text-sm font-medium">
            {normalizedReviewState === "SUCCESSFUL" && (
              <>
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-green-600">Approved</span>
              </>
            )}

            {normalizedReviewState === "FAILED" && (
              <>
                <XCircle className="w-4 h-4 text-red-500" />
                <span className="text-red-600">Needs Fix</span>
              </>
            )}

            {normalizedReviewState === "REVIEWING" && (
              <span className="text-amber-600">Reviewing</span>
            )}
          </div>
        )}

        {solution?.reviewNotes && (
          <div className="mt-4 rounded-2xl border border-border bg-background/80 px-4 py-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
              Review Notes
            </p>
            <p className="mt-2 text-sm leading-6 text-foreground">
              {solution.reviewNotes}
            </p>
          </div>
        )}
      </div>

      <div className="mt-6 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-border bg-background/80 px-4 py-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
              Submission
            </p>
            <p className="mt-1 text-base font-semibold text-foreground">
              {hasSolution ? "Added" : "Pending"}
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-background/80 px-4 py-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
              Review
            </p>
            <p className="mt-1 text-base font-semibold text-foreground">
              {isApproved
                ? "Approved"
                : normalizedReviewState === "FAILED"
                ? "Fixes"
                : normalizedReviewState === "REVIEWING"
                ? "Pending"
                : hasSolution
                ? "Pending"
                : "None"}
            </p>
          </div>
        </div>

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
            locked || isApproved ? "cursor-not-allowed opacity-60" : ""
          }`}
        />
      </div>
    </div>
  );
}
