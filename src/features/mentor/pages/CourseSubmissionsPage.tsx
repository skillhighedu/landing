import { useState } from "react";
import { useParams } from "react-router-dom";
import Container from "@/layouts/Container";
import HeaderSection from "@/components/common/HeaderSection";
import { useSubmissionsByCourse } from "../hooks/solutionHooks";
import type { Solution } from "../types";

const FILTERS = ["ALL", "REVIEWING", "APPROVED", "FAILED"] as const;
type Filter = (typeof FILTERS)[number];

const STATE_STYLES = {
  REVIEWING: "bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-950/30 dark:border-amber-800 dark:text-amber-400",
  SUCCESSFUL:  "bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-950/30 dark:border-emerald-800 dark:text-emerald-400",
  FAILED:  "bg-red-50 border-red-200 text-red-700 dark:bg-red-950/30 dark:border-red-800 dark:text-red-400",
};

export default function CourseSubmissionsPage() {
  const { courseId } = useParams<{ courseId: string }>();
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState<Filter>("ALL");

  const { data, isLoading, isError, isFetching } = useSubmissionsByCourse(
    courseId!,
    page,
    10,
    filter === "ALL" ? undefined : filter
  );

  const handleFilterChange = (f: Filter) => {
    setFilter(f);
    setPage(1);  // reset to page 1 on filter change
  };

  return (
    <Container size="full">
      <div className="py-10 mt-20">
        <HeaderSection title="All Submissions" />

        {/* Filter tabs */}
        <div className="mt-6 mb-6 flex items-center gap-2 flex-wrap">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => handleFilterChange(f)}
              className={`px-4 py-1.5 rounded-full border text-xs font-semibold transition-all ${
                filter === f
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}

          {data && (
            <span className="ml-auto text-xs text-muted-foreground font-mono">
              {data.pagination.total} total
            </span>
          )}
        </div>

        {/* Loading skeleton */}
        {isLoading && (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-20 rounded-xl bg-muted/40 animate-pulse" />
            ))}
          </div>
        )}

        {isError && (
          <div className="flex flex-col items-center gap-2 py-16 text-center">
            <span className="text-4xl">⚠️</span>
            <p className="text-sm text-muted-foreground">Failed to load submissions.</p>
          </div>
        )}

        {/* Table */}
        {data && (
          <div className={`transition-opacity duration-200 ${isFetching ? "opacity-60" : "opacity-100"}`}>
            <div className="rounded-2xl border border-border overflow-hidden">
              {/* Table header */}
              <div className="hidden sm:grid grid-cols-[2fr_2fr_1.5fr_1fr_1fr] gap-4 px-5 py-3 bg-muted/40 border-b border-border text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                <span>Student</span>
                <span>Project</span>
                <span>Submitted</span>
                <span>Status</span>
                <span>Link</span>
              </div>

              {data.submissions.length === 0 ? (
                <div className="flex flex-col items-center gap-2 py-16 text-center">
                  <span className="text-3xl">📭</span>
                  <p className="text-sm text-muted-foreground">No submissions match this filter.</p>
                </div>
              ) : (
                data.submissions.map((s, i) => (
                  <SubmissionRow key={s.id} solution={s} index={i} total={data.submissions.length} />
                ))
              )}
            </div>

            {/* Pagination */}
            <Pagination
              pagination={data.pagination}
              onPageChange={setPage}
              isFetching={isFetching}
            />
          </div>
        )}
      </div>
    </Container>
  );
}

function SubmissionRow({ solution: s, index, total }: { solution: Solution; index: number; total: number }) {
  return (
    <div
      className={`
        grid grid-cols-1 sm:grid-cols-[2fr_2fr_1.5fr_1fr_1fr] gap-2 sm:gap-4
        px-5 py-4 text-sm items-center
        hover:bg-muted/30 transition-colors
        ${index < total - 1 ? "border-b border-border" : ""}
      `}
    >
      {/* Student */}
      <div className="flex items-center gap-2 min-w-0">
        <div className="h-7 w-7 rounded-full bg-muted flex items-center justify-center text-xs font-semibold text-muted-foreground shrink-0">
          {s.userName.charAt(0).toUpperCase()}
        </div>
        <div className="min-w-0">
          <p className="text-foreground font-medium text-xs truncate">{s.userName}</p>
          {s.userEmail && (
            <p className="text-muted-foreground text-xs truncate">{s.userEmail}</p>
          )}
        </div>
      </div>

      {/* Project */}
      <p className="text-xs text-muted-foreground truncate font-mono">
        {s.projectName}
      </p>

      {/* Date */}
      <p className="text-xs text-muted-foreground font-mono">
        {new Date(s.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
      </p>

      {/* Status */}
      <span className={`inline-flex w-fit items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-semibold ${STATE_STYLES[s.reviewState]}`}>
        {s.reviewState}
      </span>

      {/* GitHub */}
      <a
        href={s.githubLink}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-xs text-primary hover:underline font-medium"
      >
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
        </svg>
        View
      </a>
    </div>
  );
}

function Pagination({
  pagination,
  onPageChange,
  isFetching,
}: {
  pagination: { page: number; totalPages: number; hasNext: boolean; hasPrev: boolean; total: number };
  onPageChange: (p: number) => void;
  isFetching: boolean;
}) {
  if (pagination.totalPages <= 1) return null;

  return (
    <div className="mt-4 flex items-center justify-between">
      <p className="text-xs text-muted-foreground font-mono">
        Page {pagination.page} of {pagination.totalPages}
      </p>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(pagination.page - 1)}
          disabled={!pagination.hasPrev || isFetching}
          className="px-3 py-1.5 rounded-lg border border-border text-xs font-medium text-foreground hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          ← Prev
        </button>

        {/* Page numbers */}
        {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
          .filter((p) => Math.abs(p - pagination.page) <= 2)
          .map((p) => (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              disabled={isFetching}
              className={`w-8 h-8 rounded-lg border text-xs font-mono font-medium transition-colors ${
                p === pagination.page
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border text-muted-foreground hover:bg-muted"
              }`}
            >
              {p}
            </button>
          ))}

        <button
          onClick={() => onPageChange(pagination.page + 1)}
          disabled={!pagination.hasNext || isFetching}
          className="px-3 py-1.5 rounded-lg border border-border text-xs font-medium text-foreground hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Next →
        </button>
      </div>
    </div>
  );
}