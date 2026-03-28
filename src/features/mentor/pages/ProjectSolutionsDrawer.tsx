import { useSolutionsByProject } from "../hooks/solutionHooks";
import type { Solution } from "../types";

const STATE_STYLES = {
  REVIEWING: "bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-950/30 dark:border-amber-800 dark:text-amber-400",
  SUCCESSFUL:  "bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-950/30 dark:border-emerald-800 dark:text-emerald-400",
  FAILED:  "bg-red-50 border-red-200 text-red-700 dark:bg-red-950/30 dark:border-red-800 dark:text-red-400",
};

const STATE_DOT = {
  REVIEWING: "bg-amber-400",
  SUCCESSFUL:  "bg-emerald-500",
  FAILED:  "bg-red-500",
};

type Props = {
  projectId: string;
  projectName: string;
  open: boolean;
  onClose: () => void;
};

export default function ProjectSolutionsDrawer({ projectId, projectName, open, onClose }: Props) {
  const { data: solutions, isLoading, isError } = useSolutionsByProject(projectId);

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`
          fixed right-0 top-0 z-50 h-full w-full max-w-xl
          bg-white dark:bg-zinc-900 border-l border-border
          shadow-2xl flex flex-col
          transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-border">
          <div>
            <p className="text-xs text-muted-foreground font-mono mb-1 uppercase tracking-wider">
              Solutions
            </p>
            <h2 className="text-base font-semibold text-foreground leading-snug">
              {projectName}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {isLoading && (
            <>
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-28 rounded-xl bg-muted/40 animate-pulse" />
              ))}
            </>
          )}

          {isError && (
            <div className="flex flex-col items-center gap-2 py-12 text-center">
              <span className="text-3xl">⚠️</span>
              <p className="text-sm text-muted-foreground">Failed to load solutions.</p>
            </div>
          )}

          {solutions?.length === 0 && (
            <div className="flex flex-col items-center gap-2 py-12 text-center">
              <span className="text-3xl">📭</span>
              <p className="text-sm text-muted-foreground">No submissions yet.</p>
            </div>
          )}

          {solutions?.map((s) => (
            <SolutionCard key={s.id} solution={s} />
          ))}
        </div>
      </div>
    </>
  );
}

function SolutionCard({ solution: s }: { solution: Solution }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 space-y-3">
      {/* Top row */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <div className="h-7 w-7 rounded-full bg-muted flex items-center justify-center text-xs font-semibold text-muted-foreground shrink-0">
            {s.userName.charAt(0).toUpperCase()}
          </div>
          <span className="text-sm font-medium text-foreground truncate">{s.userName}</span>
        </div>
        <span className={`shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-semibold ${STATE_STYLES[s.reviewState]}`}>
          <span className={`h-1.5 w-1.5 rounded-full ${STATE_DOT[s.reviewState]}`} />
          {s.reviewState}
        </span>
      </div>

      {/* Explanation */}
      {s.explanation && (
        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
          {s.explanation}
        </p>
      )}

      {/* Review notes */}
      {s.reviewNotes && (
        <div className="rounded-lg bg-muted/50 border border-border px-3 py-2">
          <p className="text-xs font-semibold text-muted-foreground mb-0.5">Review Note</p>
          <p className="text-xs text-foreground">{s.reviewNotes}</p>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-1">
        <span className="text-xs text-muted-foreground font-mono">
          {new Date(s.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
        </span>
        <a
          href={s.githubLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
        >
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
          GitHub
        </a>
      </div>
    </div>
  );
}