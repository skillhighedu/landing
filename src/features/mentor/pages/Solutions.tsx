import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import HeaderSection from "@/components/common/HeaderSection";
import Container from "@/layouts/Container";
import api from "@/config/axiosConfig";
import { handleApiError } from "@/utils/errorHandler";
import type { ApiResponse } from "@/types";
import type { MentorProjectState, Solution } from "../types";

type ReviewState = Solution["reviewState"];

const STATUS = {
  REVIEWING: {
    label: "Reviewing",
    color:
      "bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-950/20 dark:border-amber-800 dark:text-amber-400",
    dot: "bg-amber-400",
  },
  SUCCESSFUL: {
    label: "Approved",
    color:
      "bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-950/20 dark:border-emerald-800 dark:text-emerald-400",
    dot: "bg-emerald-500",
  },
  FAILED: {
    label: "Failed",
    color:
      "bg-rose-50 border-rose-200 text-rose-700 dark:bg-rose-950/20 dark:border-rose-800 dark:text-rose-400",
    dot: "bg-rose-500",
  },
} satisfies Record<ReviewState, { label: string; color: string; dot: string }>;

function StatusBadge({ state }: { state: ReviewState }) {
  const status = STATUS[state];

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold ${status.color}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
      {status.label}
    </span>
  );
}

function SkeletonCard() {
  return (
    <div className="animate-pulse space-y-4 rounded-[24px] border border-border bg-card/70 p-6">
      <div className="flex justify-between gap-4">
        <div className="flex-1 space-y-2">
          <div className="h-4 w-1/3 rounded-full bg-muted" />
          <div className="h-3 w-1/4 rounded-full bg-muted" />
        </div>
        <div className="h-8 w-24 rounded-xl bg-muted" />
      </div>
      <div className="h-px bg-border" />
      <div className="flex gap-3">
        <div className="h-9 w-32 rounded-xl bg-muted" />
        <div className="h-9 w-28 rounded-xl bg-muted" />
      </div>
    </div>
  );
}

function ExplanationModal({
  solution,
  onClose,
}: {
  solution: Solution;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
        onClick={(event) => event.target === event.currentTarget && onClose()}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 16 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 16 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-lg overflow-hidden rounded-[28px] border border-border bg-background shadow-2xl"
        >
          <div className="flex items-center justify-between border-b border-border px-6 py-5">
            <div>
              <h3 className="text-base font-bold text-foreground">Solution Explanation</h3>
              <p className="mt-0.5 text-xs text-muted-foreground">by {solution.userName}</p>
            </div>
            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-xl text-muted-foreground transition hover:bg-muted hover:text-foreground"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="max-h-[60vh] overflow-y-auto px-6 py-5">
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground/80">
              {solution.explanation || "No explanation provided."}
            </p>
          </div>

          <div className="flex justify-end border-t border-border px-6 py-4">
            <button
              onClick={onClose}
              className="rounded-xl bg-muted px-5 py-2 text-xs font-semibold text-muted-foreground transition hover:bg-muted/80"
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Solutions() {
  const location = useLocation();
  const projectDetails = (location.state?.project ?? null) as MentorProjectState | null;

  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingSolution, setUpdatingSolution] = useState<string | null>(null);
  const [reviewNotes, setReviewNotes] = useState<Record<string, string>>({});
  const [showFeedbackField, setShowFeedbackField] = useState<string | null>(null);
  const [selectedSolution, setSelectedSolution] = useState<Solution | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!projectDetails?.id) {
      setLoading(false);
      return;
    }

    async function fetchSolutions() {
      try {
        const response = await api.get<ApiResponse<Solution[]>>(
          `/projectMentoring/getSolutions/${projectDetails?.id}`,
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
        setSolutions(
          (response.data.additional ?? []).filter(
            (solution) => solution.reviewState === "REVIEWING"
          )
        );
      } catch (error) {
        handleApiError(error);
      } finally {
        setLoading(false);
        setTimeout(() => setVisible(true), 40);
      }
    }

    void fetchSolutions();
  }, [projectDetails?.id]);

  const updateSolutionReview = async (
    solutionId: string,
    newState: ReviewState,
    feedbackText: string
  ) => {
    setUpdatingSolution(solutionId);

    try {
      await api.put(
        `/projectMentoring/review-state/${solutionId}`,
        { reviewState: newState, reviewNotes: feedbackText },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      setSolutions((previous) =>
        previous.map((solution) =>
          solution.id === solutionId
            ? { ...solution, reviewState: newState, reviewNotes: feedbackText }
            : solution
        )
      );
      setShowFeedbackField(null);
      setReviewNotes((previous) => ({ ...previous, [solutionId]: "" }));
    } catch (error) {
      handleApiError(error);
    } finally {
      setUpdatingSolution(null);
    }
  };

  const reviewing = solutions.filter((solution) => solution.reviewState === "REVIEWING").length;
  const approved = solutions.filter((solution) => solution.reviewState === "SUCCESSFUL").length;
  const failed = solutions.filter((solution) => solution.reviewState === "FAILED").length;

  if (!projectDetails) {
    return (
      <Container>
        <div className="mt-20 rounded-[28px] border border-dashed border-border bg-card/70 py-20 text-center font-mono">
          <p className="text-lg font-semibold text-foreground">No project selected</p>
        </div>
      </Container>
    );
  }

  return (
    <Container size="full">
      <div
        className={`mt-20 py-10 font-mono transition-all duration-500 ${
          visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
        }`}
      >
        <HeaderSection title="Solutions" />

        <div className="mt-6 flex flex-col gap-3 rounded-[28px] border border-border bg-card p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-primary/70">Project</p>
            <h2 className="text-lg font-bold leading-snug text-foreground sm:text-xl">
              {projectDetails.projectName}
            </h2>
          </div>
          <a
            href={projectDetails.projectLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-shrink-0 items-center gap-2 self-start rounded-2xl border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted sm:self-auto"
          >
            View Project
          </a>
        </div>

        <div className="mb-8 mt-5 grid grid-cols-3 gap-3">
          <SummaryCard label="Pending Review" value={reviewing} tone={reviewing > 0 ? "amber" : "default"} />
          <SummaryCard label="Approved" value={approved} tone="emerald" />
          <SummaryCard label="Failed" value={failed} tone={failed > 0 ? "red" : "default"} />
        </div>

        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Submitted Solutions
          </h3>
          <span className="text-xs text-muted-foreground">{solutions.length} total</span>
        </div>

        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        ) : solutions.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 rounded-[28px] border border-dashed border-border bg-card/70 py-20 text-center">
            <p className="text-lg font-semibold text-foreground">No solutions yet</p>
            <p className="text-sm text-muted-foreground">
              Student submissions will appear here once reviewed.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {solutions.map((solution, index) => {
              const isBusy = updatingSolution === solution.id;
              const feedbackText = reviewNotes[solution.id] ?? "";

              return (
                <motion.div
                  key={solution.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.06, duration: 0.3 }}
                  className="rounded-[28px] border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-sm sm:p-6"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-sm font-bold text-primary">
                        {solution.userName?.charAt(0)?.toUpperCase() ?? "?"}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{solution.userName}</p>
                        <a
                          href={solution.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-0.5 inline-flex items-center gap-1 text-xs text-primary hover:underline"
                        >
                          GitHub
                        </a>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 sm:flex-col sm:items-end">
                      <StatusBadge state={solution.reviewState} />

                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedSolution(solution)}
                          className="rounded-2xl border border-border bg-background px-3 py-2 text-xs font-medium text-foreground transition hover:bg-muted"
                        >
                          Explanation
                        </button>

                        <select
                          value={solution.reviewState}
                          onChange={(event) => {
                            const nextState = event.target.value as ReviewState;
                            if (nextState === "FAILED") {
                              setShowFeedbackField(solution.id);
                            } else {
                              void updateSolutionReview(solution.id, nextState, "");
                            }
                          }}
                          disabled={isBusy}
                          className="rounded-2xl border border-border bg-background px-3 py-2 text-xs font-medium text-foreground transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:opacity-50"
                        >
                          <option value="REVIEWING">Reviewing</option>
                          <option value="SUCCESSFUL">Approve</option>
                          <option value="FAILED">Fail</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <AnimatePresence>
                    {showFeedbackField === solution.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 space-y-3 border-t border-rose-100 pt-4">
                          <div className="text-xs font-semibold text-rose-600">Failure feedback</div>
                          <textarea
                            value={feedbackText}
                            onChange={(event) =>
                              setReviewNotes((previous) => ({
                                ...previous,
                                [solution.id]: event.target.value,
                              }))
                            }
                            placeholder="Explain clearly why this solution did not meet the requirement..."
                            className="w-full resize-none rounded-2xl border border-rose-200 bg-rose-50/30 p-4 text-sm text-foreground transition focus:border-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-300/40"
                            rows={4}
                          />
                          <div className="flex gap-2">
                            <button
                              onClick={() => void updateSolutionReview(solution.id, "FAILED", feedbackText)}
                              disabled={isBusy || !feedbackText.trim()}
                              className="rounded-2xl bg-rose-600 px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                              {isBusy ? "Submitting..." : "Submit Feedback"}
                            </button>
                            <button
                              onClick={() => setShowFeedbackField(null)}
                              className="rounded-2xl border border-border px-4 py-2.5 text-xs font-medium text-muted-foreground transition hover:text-foreground"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {selectedSolution && (
        <ExplanationModal solution={selectedSolution} onClose={() => setSelectedSolution(null)} />
      )}
    </Container>
  );
}

function SummaryCard({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: "default" | "amber" | "emerald" | "red";
}) {
  const colors = {
    default: "border-border bg-card text-foreground",
    amber: "border-amber-200 bg-amber-50/60 text-amber-700 dark:border-amber-800 dark:bg-amber-950/20 dark:text-amber-400",
    emerald:
      "border-emerald-200 bg-emerald-50/60 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/20 dark:text-emerald-400",
    red: "border-rose-200 bg-rose-50/60 text-rose-700 dark:border-rose-800 dark:bg-rose-950/20 dark:text-rose-400",
  };

  return (
    <div className={`flex flex-col gap-0.5 rounded-[24px] border px-4 py-3 ${colors[tone]}`}>
      <span className="text-xl font-bold tabular-nums">{value}</span>
      <span className="text-xs opacity-75">{label}</span>
    </div>
  );
}
