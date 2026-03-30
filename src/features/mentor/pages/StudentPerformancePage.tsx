import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderSection from "@/components/common/HeaderSection";
import Container from "@/layouts/Container";
import { toast } from "sonner";
import { usePerformance, useUpsertPerformance } from "../hooks/performanceHooks";
import type { StudentPerformance } from "../types";

type PerformanceTone = {
  bar: string;
  badge: string;
  text: string;
  note: string;
};

type FilterBand = "ALL" | "HIGH" | "MID" | "LOW";
type SortOption = "RANK" | "SCORE_DESC" | "SCORE_ASC" | "NAME";
const STUDENTS_PER_PAGE = 8;

const FILTER_OPTIONS: { label: string; value: FilterBand }[] = [
  { label: "All", value: "ALL" },
  { label: "High", value: "HIGH" },
  { label: "On Track", value: "MID" },
  { label: "Needs Attention", value: "LOW" },
];

const SORT_OPTIONS: { label: string; value: SortOption }[] = [
  { label: "Rank", value: "RANK" },
  { label: "Highest Score", value: "SCORE_DESC" },
  { label: "Lowest Score", value: "SCORE_ASC" },
  { label: "Name", value: "NAME" },
];

function getScoreTone(percentage: number): PerformanceTone {
  if (percentage >= 80) {
    return {
      bar: "bg-emerald-500",
      badge:
        "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-400",
      text: "text-emerald-600 dark:text-emerald-400",
      note: "High performer",
    };
  }

  if (percentage >= 50) {
    return {
      bar: "bg-amber-400",
      badge:
        "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-400",
      text: "text-amber-600 dark:text-amber-400",
      note: "On track",
    };
  }

  return {
    bar: "bg-rose-500",
    badge:
      "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-800 dark:bg-rose-950/30 dark:text-rose-400",
    text: "text-rose-600 dark:text-rose-400",
    note: "Needs attention",
  };
}

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((part) => part.charAt(0).toUpperCase()).join("") || "ST";
}

function formatDate(date: string | null) {
  if (!date) return "Not available";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function getRankLabel(rank: number) {
  if (rank === 1) return "Top 1";
  if (rank === 2) return "Top 2";
  if (rank === 3) return "Top 3";
  return `#${rank}`;
}

function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-[28px] border border-dashed border-border bg-card/70 px-6 py-16 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-muted text-lg font-semibold text-muted-foreground">
        SP
      </div>
      <h2 className="mt-4 text-lg font-semibold text-foreground">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">{description}</p>
    </div>
  );
}

function matchesBand(student: StudentPerformance, filterBand: FilterBand) {
  if (filterBand === "HIGH") return student.percentage >= 80;
  if (filterBand === "MID") return student.percentage >= 50 && student.percentage < 80;
  if (filterBand === "LOW") return student.percentage < 50;
  return true;
}

function sortStudents(students: StudentPerformance[], sortBy: SortOption) {
  const sorted = [...students];

  if (sortBy === "NAME") {
    return sorted.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (sortBy === "SCORE_ASC") {
    return sorted.sort((a, b) => a.percentage - b.percentage || a.rank - b.rank);
  }

  if (sortBy === "SCORE_DESC") {
    return sorted.sort((a, b) => b.percentage - a.percentage || a.rank - b.rank);
  }

  return sorted.sort((a, b) => a.rank - b.rank);
}

export default function StudentPerformancePage() {
  const navigate = useNavigate();
  const tableSectionRef = useRef<HTMLDivElement | null>(null);
  const [search, setSearch] = useState("");
  const [filterBand, setFilterBand] = useState<FilterBand>("ALL");
  const [sortBy, setSortBy] = useState<SortOption>("RANK");
  const [page, setPage] = useState(1);
  const [editingStudent, setEditingStudent] = useState<StudentPerformance | null>(null);

  const {
    data: performanceData,
    isLoading,
    isError,
    refetch,
  } = usePerformance(page, STUDENTS_PER_PAGE);
  const students = performanceData?.students ?? [];
  const serverPagination = performanceData?.pagination;

  const filteredStudents = useMemo(() => {
    const query = search.trim().toLowerCase();

    const searched = students.filter((student) => {
      const matchesSearch =
        !query ||
        student.name.toLowerCase().includes(query) ||
        student.email.toLowerCase().includes(query);

      return matchesSearch && matchesBand(student, filterBand);
    });

    return sortStudents(searched, sortBy);
  }, [filterBand, search, sortBy, students]);

  const averageScore = students.length
    ? Math.round(
        students.reduce((total, student) => total + student.percentage, 0) / students.length
      )
    : 0;
  const highPerformers = students.filter((student) => student.percentage >= 80).length;
  const needsAttention = students.filter((student) => student.percentage < 50).length;
  const onTrack = students.filter(
    (student) => student.percentage >= 50 && student.percentage < 80
  ).length;
  const topPerformer = students[0];
  const totalPages = Math.max(1, serverPagination?.totalPages ?? 1);
  const currentPage = serverPagination?.page ?? page;
  const paginatedStudents = filteredStudents;

  const handlePageChange = (nextPage: number) => {
    const safePage = Math.max(1, Math.min(nextPage, totalPages));
    setPage(safePage);
  };

  useEffect(() => {
    setPage(1);
  }, [search, filterBand, sortBy]);

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  useEffect(() => {
    if (page === 1) return;

    tableSectionRef.current?.scrollIntoView({
      behavior: "auto",
      block: "start",
    });
  }, [page]);

  return (
    <Container size="full">
      <div className="mt-20 py-10 font-mono">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <HeaderSection title="Student Performance" />
            <p className="mt-3 text-sm leading-6 text-muted-foreground font-mono">
              Track learner progress in one place, quickly filter weak performers, and update
              percentages without breaking your review flow.
            </p>
          </div>

        
        </div>

        {!isLoading && !isError && students.length > 0 && (
          <>
            <div className="mt-8 grid grid-cols-1 font-mono gap-4 md:grid-cols-2 xl:grid-cols-[1.2fr_1fr_1fr_1fr]">
              <div className="rounded-[28px] border border-emerald-200 bg-gradient-to-br from-emerald-50 via-background to-background p-6 shadow-sm dark:border-emerald-900 dark:from-emerald-950/30">
                <p className="text-xs  uppercase tracking-[0.24em] text-emerald-700 dark:text-emerald-400">
                  Leaderboard highlight
                </p>
                <h2 className="mt-3 text-2xl  text-foreground">
                  {topPerformer?.name ?? "No leader yet"}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {topPerformer
                    ? `${topPerformer.percentage}% score, ranked #${topPerformer.rank} in the current records.`
                    : "Performance insights will appear once records are available."}
                </p>

                {topPerformer && (
                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl border border-border bg-background/80 px-4 py-3">
                      <p className="text-xs text-muted-foreground">Updated</p>
                      <p className="mt-1 text-sm font-medium text-foreground">
                        {formatDate(topPerformer.updatedAt)}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-border bg-background/80 px-4 py-3">
                      <p className="text-xs text-muted-foreground">Band</p>
                      <p className="mt-1 text-sm font-medium text-foreground">
                        {getScoreTone(topPerformer.percentage).note}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <StatCard
                label="Students"
                value={students.length}
                description="Saved performance records"
              />
              <StatCard
                label="Average"
                value={`${averageScore}%`}
                description="Class progress average"
              />
              <StatCard
                label="Needs Attention"
                value={needsAttention}
                description="Below 50% score"
                tone="danger"
              />
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
              <MiniStat label="High Performers" value={highPerformers} helper="80% and above" />
              <MiniStat label="On Track" value={onTrack} helper="50% to 79%" />
              <MiniStat label="Filter Result" value={filteredStudents.length} helper="Visible students" />
            </div>
          </>
        )}

        {!isLoading && students.length > 0 && (
          <div className="mt-8 rounded-[28px] border border-border bg-card p-5 shadow-sm">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
              <div className="w-full xl:max-w-xl">
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Search
                </label>
                <div className="relative">
                  <svg
                    className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35" />
                  </svg>
                  <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search by student name or email"
                    className="w-full rounded-2xl border border-border bg-background py-3 pl-10 pr-4 text-sm text-foreground outline-none transition focus:ring-2 focus:ring-primary/30"
                  />
                </div>
              </div>

              <div className="grid w-full gap-4 md:grid-cols-2 xl:w-auto xl:grid-cols-[220px_220px_auto]">
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Performance band
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {FILTER_OPTIONS.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setFilterBand(option.value)}
                        className={`rounded-xl border px-3 py-2 text-xs font-semibold transition-colors ${
                          filterBand === option.value
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border bg-background text-foreground hover:bg-muted"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Sort by
                  </label>
                  <select
                    value={sortBy}
                    onChange={(event) => setSortBy(event.target.value as SortOption)}
                    className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:ring-2 focus:ring-primary/30"
                  >
                    {SORT_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-end gap-2">
                  <button
                    onClick={() => {
                      setSearch("");
                      setFilterBand("ALL");
                      setSortBy("RANK");
                    }}
                    className="flex-1 rounded-2xl border border-border px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                  >
                    Reset
                  </button>
                  <button
                    onClick={() => refetch()}
                    className="flex-1 rounded-2xl border border-border px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                  >
                    Refresh
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {isLoading && (
          <div className="mt-8 space-y-3">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="h-24 animate-pulse rounded-[28px] bg-muted/40" />
            ))}
          </div>
        )}

        {isError && (
          <div className="mt-8 rounded-[28px] border border-rose-200 bg-rose-50/70 p-6 dark:border-rose-900 dark:bg-rose-950/20">
            <h2 className="text-lg font-semibold text-foreground">Unable to load performance</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              The performance list could not be fetched right now. Please try again in a moment.
            </p>
            <button
              onClick={() => refetch()}
              className="mt-4 inline-flex items-center justify-center rounded-2xl border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              Try again
            </button>
          </div>
        )}

        {!isLoading && !isError && students.length === 0 && (
          <div className="mt-8">
            <EmptyState
              title="No student performance records yet"
              description="There are no saved progress entries for this mentor course yet. Once records exist, they will appear here for filtering, review, and updates."
            />
          </div>
        )}

        {!isLoading && !isError && students.length > 0 && filteredStudents.length === 0 && (
          <div className="mt-8">
            <EmptyState
              title="No matching students"
              description="No performance records matched your current search or filter selection. Try clearing filters or searching with another keyword."
            />
          </div>
        )}

        {!isLoading && !isError && filteredStudents.length > 0 && (
          <div
            ref={tableSectionRef}
            key={currentPage}
            className="mt-8 overflow-hidden rounded-[28px] border border-border bg-card shadow-sm"
          >
            <div className="hidden grid-cols-[96px_1.5fr_1fr_120px_220px_170px_112px] gap-4 border-b border-border bg-muted/30 px-6 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground xl:grid">
              <span>Rank</span>
              <span>Student</span>
              <span>Updated</span>
              <span>Score</span>
              <span>Counts</span>
              <span>Progress</span>
              <span>Action</span>
            </div>

            {paginatedStudents.map((student, index) => (
              <PerformanceRow
                key={student.id ?? student.userId}
                student={student}
                isLast={index === paginatedStudents.length - 1}
                onEdit={() => setEditingStudent(student)}
              />
            ))}
          </div>
        )}

        {!isLoading && !isError && filteredStudents.length > 0 && totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={serverPagination?.total ?? filteredStudents.length}
            itemsPerPage={STUDENTS_PER_PAGE}
            onPageChange={handlePageChange}
          />
        )}
      </div>

      {editingStudent && (
        <EditPerformanceModal
          student={editingStudent}
          onClose={() => setEditingStudent(null)}
        />
      )}
    </Container>
  );
}

function StatCard({
  label,
  value,
  description,
  tone = "default",
}: {
  label: string;
  value: string | number;
  description: string;
  tone?: "default" | "danger";
}) {
  const toneStyles =
    tone === "danger"
      ? "border-rose-200 bg-rose-50/70 dark:border-rose-900 dark:bg-rose-950/20"
      : "border-border bg-card";

  return (
    <div className={`rounded-[28px] border p-6 shadow-sm ${toneStyles}`}>
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-3 text-3xl font-semibold text-foreground">{value}</p>
      <p className="mt-2 text-xs text-muted-foreground">{description}</p>
    </div>
  );
}

function MiniStat({
  label,
  value,
  helper,
}: {
  label: string;
  value: string | number;
  helper: string;
}) {
  return (
    <div className="rounded-3xl border border-border bg-card px-5 py-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-lg font-semibold text-foreground">{value}</p>
      </div>
      <p className="mt-1 text-xs text-muted-foreground">{helper}</p>
    </div>
  );
}

function PerformanceRow({
  student,
  isLast,
  onEdit,
}: {
  student: StudentPerformance;
  isLast: boolean;
  onEdit: () => void;
}) {
  const tone = getScoreTone(student.percentage);

  return (
    <div
      className={`grid grid-cols-1 gap-4 px-5 py-5 transition-colors hover:bg-muted/20 xl:grid-cols-[96px_1.5fr_1fr_120px_220px_170px_112px] xl:items-center xl:px-6 ${
        !isLast ? "border-b border-border" : ""
      }`}
    >
      <div className="flex items-center justify-between xl:block">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground xl:hidden">
          Rank
        </span>
        <span className="inline-flex w-fit items-center rounded-full border border-border px-3 py-1 text-xs font-semibold text-foreground">
          {getRankLabel(student.rank)}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-muted text-sm font-semibold text-foreground">
          {getInitials(student.name)}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-foreground">{student.name}</p>
          <p className="truncate text-xs text-muted-foreground">{student.email}</p>
        </div>
      </div>

      <div className="flex items-center justify-between xl:block">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground xl:hidden">
          Updated
        </span>
        <div className="rounded-2xl border border-border bg-background px-3 py-2 xl:border-0 xl:bg-transparent xl:p-0">
          <p className="text-sm text-foreground">{formatDate(student.updatedAt)}</p>
          <p className="text-xs text-muted-foreground">Created {formatDate(student.createdAt)}</p>
        </div>
      </div>

      <div className="flex items-center justify-between xl:block">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground xl:hidden">
          Score
        </span>
        <span
          className={`inline-flex w-fit items-center rounded-full border px-3 py-1 text-sm font-semibold ${tone.badge}`}
        >
          {student.percentage}%
        </span>
      </div>

      <div className="space-y-2">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground xl:hidden">
          Counts
        </span>
        <div className="grid grid-cols-3 gap-2">
          <CountPill
            label="Projects"
            value={student.completedProjectsCount ?? 0}
          />
          <CountPill
            label="Topics"
            value={student.completedTopicsCount ?? 0}
          />
          <CountPill
            label="Quiz"
            value={student.completedQuizCount ?? 0}
          />
        </div>
      </div>

      <div className="space-y-3">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground xl:hidden">
          Progress
        </span>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{tone.note}</span>
          <span>{student.percentage}%</span>
        </div>
        <div className="h-2.5 overflow-hidden rounded-full bg-muted">
          <div
            className={`h-full rounded-full transition-all duration-500 ${tone.bar}`}
            style={{ width: `${student.percentage}%` }}
          />
        </div>
      </div>

      <button
        onClick={onEdit}
        className="inline-flex items-center justify-center rounded-2xl border border-border px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted xl:self-center"
      >
        Update
      </button>
    </div>
  );
}

function CountPill({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-border bg-background px-3 py-2.5 text-center shadow-sm">
      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold text-foreground">{value}</p>
    </div>
  );
}

function EditPerformanceModal({
  student,
  onClose,
}: {
  student: StudentPerformance;
  onClose: () => void;
}) {
  const [value, setValue] = useState(student.percentage);
  const { mutate, isPending } = useUpsertPerformance();
  const tone = getScoreTone(value);

  const handleSubmit = () => {
    if (!Number.isFinite(value) || value < 0 || value > 100) {
      toast.error("Percentage must be between 0 and 100");
      return;
    }

    mutate(
      { userId: student.userId, percentage: value },
      {
        onSuccess: () => {
          toast.success("Student performance updated");
          onClose();
        },
      }
    );
  };

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/55 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md overflow-hidden rounded-[28px] border border-border bg-background shadow-2xl">
          <div className="border-b border-border bg-muted/20 p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                  Update Progress
                </p>
                <h2 className="mt-2 text-lg font-semibold text-foreground">{student.name}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{student.email}</p>
              </div>

              <button
                onClick={onClose}
                className="rounded-xl p-2 text-muted-foreground transition-colors hover:bg-muted"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>

          <div className="space-y-5 p-6">
            <div className="rounded-3xl border border-border bg-card p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Live preview</p>
                <p className={`text-3xl font-semibold ${tone.text}`}>{value}%</p>
              </div>
              <div className="mt-4 h-3 overflow-hidden rounded-full bg-muted">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${tone.bar}`}
                  style={{ width: `${value}%` }}
                />
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{tone.note}</p>
            </div>

            <div>
              <label className="mb-3 block text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Adjust score
              </label>
              <input
                type="range"
                min={0}
                max={100}
                step={1}
                value={value}
                onChange={(event) => setValue(Number(event.target.value))}
                className="w-full cursor-pointer accent-primary"
              />
              <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                <span>0</span>
                <span>50</span>
                <span>100</span>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Exact percentage
              </label>
              <input
                type="number"
                min={0}
                max={100}
                value={value}
                onChange={(event) => setValue(Number(event.target.value))}
                className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </div>

          <div className="flex gap-3 border-t border-border p-6">
            <button
              onClick={onClose}
              className="flex-1 rounded-2xl border border-border px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isPending}
              className="flex-1 rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function Pagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}) {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="mt-5 flex flex-col gap-3 rounded-[28px] border border-border bg-card/85 p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <p className="text-xs text-muted-foreground">
        Showing {startItem} to {endItem} of {totalItems} students
      </p>

      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="rounded-2xl border border-border px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
        >
          Prev
        </button>

        <div className="inline-flex h-9 min-w-[84px] items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 px-3 font-mono text-xs font-semibold text-primary">
          {currentPage}/{totalPages}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="rounded-2xl border border-border px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}
