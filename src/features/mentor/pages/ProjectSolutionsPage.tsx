import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Container from "@/layouts/Container";
import { useSolutionsByProject, useUpdateReviewState } from "../hooks/solutionHooks";
import type { Solution } from "../types";

const STATE_STYLES = {
  REVIEWING:
    "bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-950/30 dark:border-amber-800 dark:text-amber-400",
  SUCCESSFUL:
    "bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-950/30 dark:border-emerald-800 dark:text-emerald-400",
  FAILED:
    "bg-red-50 border-red-200 text-red-700 dark:bg-red-950/30 dark:border-red-800 dark:text-red-400",
} as const;

const STATE_DOT = {
  REVIEWING: "bg-amber-400",
  SUCCESSFUL: "bg-emerald-500",
  FAILED: "bg-red-500",
} as const;

const ALL_STATES = ["REVIEWING", "SUCCESSFUL", "FAILED"] as const;
const FILTER_OPTIONS = ["REVIEWING", "SUCCESSFUL", "FAILED", "ALL"] as const;
type FilterOption = (typeof FILTER_OPTIONS)[number];

export default function ProjectSolutionsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedSolution, setSelectedSolution] = useState<Solution | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterOption>("REVIEWING");

  const { projectId, projectName } = (location.state ?? {}) as {
    projectId?: string;
    projectName?: string;
  };

  if (!projectId || !projectName) {
    return (
      <Container size="full">
        <div className="flex flex-col items-center gap-3 py-24 text-center">
          <span className="text-4xl">🔒</span>
          <p className="text-sm text-muted-foreground">No project selected.</p>
          <button onClick={() => navigate(-1)} className="mt-2 text-xs text-primary underline">
            Go back
          </button>
        </div>
      </Container>
    );
  }

  const { data: solutions, isLoading, isError } = useSolutionsByProject(projectId);

  const counts = useMemo(() => {
    const allSolutions = solutions ?? [];
    return {
      ALL: allSolutions.length,
      REVIEWING: allSolutions.filter((solution) => solution.reviewState === "REVIEWING").length,
      SUCCESSFUL: allSolutions.filter((solution) => solution.reviewState === "SUCCESSFUL").length,
      FAILED: allSolutions.filter((solution) => solution.reviewState === "FAILED").length,
    };
  }, [solutions]);

  const filteredSolutions = useMemo(() => {
    const allSolutions = solutions ?? [];
    if (activeFilter === "ALL") {
      return allSolutions;
    }
    return allSolutions.filter((solution) => solution.reviewState === activeFilter);
  }, [activeFilter, solutions]);

  return (
    <Container>
      <div className="mt-10 py-10">
        <div className="mb-8 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="rounded-xl border border-border p-2 text-muted-foreground transition-colors hover:bg-muted"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div>
            <p className="mb-0.5 font-mono text-xs uppercase tracking-wider text-muted-foreground">
              Project Solutions
            </p>
            <h1 className="text-xl font-semibold text-foreground">{projectName}</h1>
          </div>

          {solutions && (
            <div className="ml-auto flex items-center gap-2">
              <span className="rounded-full border border-border bg-muted/40 px-3 py-1.5 font-mono text-xs text-muted-foreground">
                {solutions.length} submission{solutions.length !== 1 ? "s" : ""}
              </span>
              {counts.REVIEWING > 0 && (
                <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 font-mono text-xs text-amber-600 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-400">
                  {counts.REVIEWING} pending
                </span>
              )}
            </div>
          )}
        </div>

        {!isLoading && !isError && solutions && solutions.length > 0 && (
          <div className="mb-6 rounded-2xl border border-border bg-card p-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  Filter Solutions
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Reviewing is shown first so you can handle pending submissions quickly.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {FILTER_OPTIONS.map((filter) => {
                  const isActive = activeFilter === filter;
                  const toneClass =
                    filter === "REVIEWING"
                      ? "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-400"
                      : filter === "SUCCESSFUL"
                        ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-400"
                        : filter === "FAILED"
                          ? "border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950/30 dark:text-red-400"
                          : "border-primary bg-primary text-primary-foreground";

                  return (
                    <button
                      key={filter}
                      onClick={() => setActiveFilter(filter)}
                      className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold transition-colors ${
                        isActive ? toneClass : "border-border bg-background text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      <span>{filter === "ALL" ? "ALL" : filter}</span>
                      <span className="rounded-full bg-black/5 px-1.5 py-0.5 text-[10px] dark:bg-white/10">
                        {counts[filter]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {isLoading && (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="h-48 animate-pulse rounded-2xl bg-muted/40" />
            ))}
          </div>
        )}

        {isError && (
          <div className="flex flex-col items-center gap-2 py-20 text-center">
            <span className="text-4xl">⚠️</span>
            <p className="text-sm text-muted-foreground">Failed to load solutions.</p>
          </div>
        )}

        {!isLoading && solutions?.length === 0 && (
          <div className="flex flex-col items-center gap-2 py-20 text-center">
            <span className="text-4xl">📭</span>
            <p className="text-sm text-muted-foreground">No submissions yet for this project.</p>
          </div>
        )}

        {!isLoading && solutions && solutions.length > 0 && filteredSolutions.length === 0 && (
          <div className="flex flex-col items-center gap-2 py-20 text-center">
            <span className="text-4xl">🗂️</span>
            <p className="text-sm text-muted-foreground">
              No solutions found for the {activeFilter.toLowerCase()} filter.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {filteredSolutions.map((solution) => (
            <SolutionCard
              key={solution.id}
              solution={solution}
              onReview={() => setSelectedSolution(solution)}
            />
          ))}
        </div>
      </div>

      {selectedSolution && (
        <ReviewModal
          solution={selectedSolution}
          projectId={projectId}
          onClose={() => setSelectedSolution(null)}
        />
      )}
    </Container>
  );
}

function SolutionCard({
  solution: solutionItem,
  onReview,
}: {
  solution: Solution;
  onReview: () => void;
}) {
  return (
    <div
      className={`relative flex flex-col gap-4 rounded-2xl border p-5 font-mono transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${
        solutionItem.reviewState === "REVIEWING"
          ? "border-amber-200 bg-amber-50/10 dark:border-amber-800 dark:bg-amber-950/10"
          : "border-border bg-card"
      }`}
    >
      {solutionItem.reviewState === "REVIEWING" && (
        <div className="absolute left-0 top-4 bottom-4 w-0.5 rounded-full bg-amber-400" />
      )}

      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-semibold text-muted-foreground">
            {solutionItem.userName.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-foreground">{solutionItem.userName}</p>
            <p className="font-mono text-xs text-muted-foreground">
              {new Date(solutionItem.createdAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
        <span
          className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${
            STATE_STYLES[solutionItem.reviewState]
          }`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${STATE_DOT[solutionItem.reviewState]}`} />
          {solutionItem.reviewState}
        </span>
      </div>

      {solutionItem.explanation && (
        <p className="line-clamp-3 text-xs leading-relaxed text-muted-foreground">
          {solutionItem.explanation}
        </p>
      )}

      {solutionItem.reviewNotes && (
        <div className="rounded-lg border border-border bg-muted/50 px-3 py-2">
          <p className="mb-0.5 text-xs font-semibold text-muted-foreground">Review Note</p>
          <p className="text-xs text-foreground">{solutionItem.reviewNotes}</p>
        </div>
      )}

      <div className="flex items-center gap-2 border-t border-border/50 pt-1">
        <a
          href={solutionItem.githubLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-border px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-muted"
        >
          <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
          GitHub
        </a>
        <button
          onClick={onReview}
          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground transition-all hover:opacity-90"
        >
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Review
        </button>
      </div>
    </div>
  );
}

function ReviewModal({
  solution,
  projectId,
  onClose,
}: {
  solution: Solution;
  projectId: string;
  onClose: () => void;
}) {
  const [reviewState, setReviewState] = useState(solution.reviewState);
  const [reviewNotes, setReviewNotes] = useState(solution.reviewNotes ?? "");
  const { mutate, isPending } = useUpdateReviewState(projectId);

  const handleSubmit = () => {
    mutate(
      { solutionId: solution.id, reviewState, reviewNotes: reviewNotes || undefined },
      { onSuccess: onClose }
    );
  };

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="flex max-h-[90vh] w-full max-w-lg flex-col rounded-2xl border border-border bg-white shadow-2xl dark:bg-zinc-900">
          <div className="flex shrink-0 items-start justify-between border-b border-border p-6 font-mono">
            <div>
              <p className="mb-1 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                Review Solution
              </p>
              <h2 className="text-base font-semibold text-foreground">{solution.userName}</h2>
            </div>
            <button onClick={onClose} className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          <div className="flex-1 space-y-5 overflow-y-auto p-6">
            <div className="space-y-3 rounded-xl border border-border bg-muted/30 p-4">
              <div>
                <p className="mb-1 font-mono text-xs text-muted-foreground">Explanation</p>
                <p className="font-mono text-sm leading-relaxed text-foreground">{solution.explanation}</p>
              </div>
              <div className="h-px bg-border" />
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">Submitted</p>
                <p className="font-mono text-xs text-foreground">
                  {new Date(solution.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
              <a
                href={solution.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
              >
                <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                View on GitHub
              </a>
            </div>

            <div>
              <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Update Status
              </p>
              <div className="grid grid-cols-3 gap-2">
                {ALL_STATES.map((state) => (
                  <button
                    key={state}
                    onClick={() => setReviewState(state)}
                    className={`flex flex-col items-center gap-1.5 rounded-xl border px-3 py-3 font-mono text-xs font-semibold transition-all ${
                      reviewState === state
                        ? STATE_STYLES[state]
                        : "border-border text-muted-foreground hover:border-primary/40 hover:bg-muted/40"
                    }`}
                  >
                    <span
                      className={`h-2 w-2 rounded-full ${
                        reviewState === state ? STATE_DOT[state] : "bg-muted-foreground/30"
                      }`}
                    />
                    {state}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-2 block font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Review Notes
                <span className="ml-1 font-normal normal-case tracking-normal">(optional)</span>
              </label>
              <textarea
                value={reviewNotes}
                onChange={(event) => setReviewNotes(event.target.value)}
                rows={4}
                placeholder="Add feedback for the student..."
                className="w-full resize-none rounded-xl border border-border bg-muted/30 px-4 py-3 font-mono text-sm text-foreground transition placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/40"
              />
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-3 border-t border-border p-6">
            <button
              onClick={onClose}
              className="flex-1 cursor-pointer rounded-xl border border-border px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isPending}
              className="flex-1 cursor-pointer rounded-xl bg-primary px-4 py-2.5 text-sm text-primary-foreground transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isPending ? "Saving..." : "Save Review"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
