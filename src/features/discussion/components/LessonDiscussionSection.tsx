import { useMemo, useState } from "react";
import { CheckCircle2, Clock3, MessageSquare, Pencil, ShieldCheck, Trash2 } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useStudentProfileStore } from "@/store/studentStore";
import { cn } from "@/lib/utils";
import {
  useCreateLessonQuestion,
  useDeleteLessonQuestion,
  useLessonDiscussion,
  useUpdateLessonQuestion,
} from "../hooks/useLessonDiscussion";
import type { DiscussionQuestion } from "../types";

function formatDate(value: string) {
  return new Date(value).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function normalize(value: string) {
  return value.trim().toLowerCase();
}

function DeleteConfirmDialog({
  open,
  onOpenChange,
  onConfirm,
  loading,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  loading: boolean;
}) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="font-mono">Delete this question?</AlertDialogTitle>
          <AlertDialogDescription className="font-sans">
            This will remove your question from the lesson discussion. You can post it again later if needed.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={loading}
            className="bg-red-600 text-white hover:bg-red-700"
          >
            {loading ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function AnswerBox({ answer }: { answer: string }) {
  const [expanded, setExpanded] = useState(false);
  const shouldClamp = answer.length > 240;

  return (
    <div className="mt-4 rounded-[1.25rem] border border-emerald-200 bg-emerald-50/70 p-4 dark:border-emerald-800 dark:bg-emerald-950/20">
      <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-400">
        <ShieldCheck className="h-4 w-4" />
        Mentor Answer
      </div>
      <p className={cn("mt-3 font-sans text-sm leading-7 text-neutral-700 dark:text-neutral-200", !expanded && shouldClamp && "line-clamp-4")}>
        {answer}
      </p>
      {shouldClamp && (
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          className="mt-3 font-mono text-xs uppercase tracking-[0.14em] text-emerald-700 transition hover:opacity-80 dark:text-emerald-400"
        >
          {expanded ? "Show Less" : "Read More"}
        </button>
      )}
    </div>
  );
}

function QuestionCard({
  question,
  isOwner,
  isHighlighted,
  editingText,
  setEditingText,
  isEditing,
  onStartEdit,
  onCancelEdit,
  onSaveEdit,
  onDelete,
  updatePending,
  deletePending,
}: {
  question: DiscussionQuestion;
  isOwner: boolean;
  isHighlighted: boolean;
  editingText: string;
  setEditingText: (value: string) => void;
  isEditing: boolean;
  onStartEdit: () => void;
  onCancelEdit: () => void;
  onSaveEdit: () => void;
  onDelete: () => void;
  updatePending: boolean;
  deletePending: boolean;
}) {
  return (
    <article
      className={cn(
        "rounded-[1.5rem] border p-5 shadow-sm transition sm:p-6",
        isHighlighted
          ? "border-primary/30 bg-primary/5"
          : "border-border bg-card",
      )}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-sm text-foreground">{question.studentName || "Student"}</span>
            {question.isVerified && (
              <span className="inline-flex items-center gap-1 rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-blue-700 dark:border-blue-800 dark:bg-blue-950/20 dark:text-blue-400">
                <ShieldCheck className="h-3.5 w-3.5" />
                Verified
              </span>
            )}
            {question.topic?.title && (
              <span className="rounded-full border border-border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                {question.topic.title}
              </span>
            )}
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Clock3 className="h-3.5 w-3.5" />
              {formatDate(question.createdAt)}
            </span>
            <span
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono uppercase tracking-[0.12em]",
                question.isAnswered
                  ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/20 dark:text-emerald-400"
                  : "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950/20 dark:text-amber-400",
              )}
            >
              {question.isAnswered ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Clock3 className="h-3.5 w-3.5" />}
              {question.isAnswered ? "Answered" : "Pending"}
            </span>
          </div>
        </div>

        {isOwner && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onStartEdit}
              className="inline-flex items-center gap-1 rounded-xl border border-border px-3 py-2 font-mono text-xs text-foreground transition hover:border-primary hover:text-primary"
            >
              <Pencil className="h-3.5 w-3.5" />
              Edit
            </button>
            <button
              type="button"
              onClick={onDelete}
              disabled={deletePending}
              className="inline-flex items-center gap-1 rounded-xl border border-red-200 px-3 py-2 font-mono text-xs text-red-600 transition hover:bg-red-50 disabled:opacity-50 dark:border-red-900/60 dark:hover:bg-red-950/20"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Delete
            </button>
          </div>
        )}
      </div>

      {isEditing ? (
        <div className="mt-4">
          <textarea
            value={editingText}
            onChange={(event) => setEditingText(event.target.value)}
            rows={4}
            className="w-full rounded-[1rem] border border-border bg-background p-4 font-sans text-sm leading-7 text-foreground outline-none transition focus:border-primary"
          />
          <div className="mt-3 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={onSaveEdit}
              disabled={updatePending || editingText.trim().length < 10}
              className="inline-flex items-center justify-center rounded-xl bg-primary px-4 py-3 font-mono text-sm text-white transition hover:opacity-90 disabled:opacity-50"
            >
              {updatePending ? "Saving..." : "Save Changes"}
            </button>
            <button
              type="button"
              onClick={onCancelEdit}
              className="inline-flex items-center justify-center rounded-xl border border-border px-4 py-3 font-mono text-sm text-foreground transition hover:border-primary hover:text-primary"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <p className="mt-4 whitespace-pre-line font-sans text-sm leading-7 text-foreground">{question.question}</p>
      )}

      {question.isAnswered && question.answer && <AnswerBox answer={question.answer} />}
    </article>
  );
}

function AskQuestionForm({
  value,
  onChange,
  onSubmit,
  loading,
}: {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  loading: boolean;
}) {
  return (
    <div className="rounded-[1.5rem] border border-border bg-card p-4 shadow-sm sm:p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary">Ask A Question</p>
          <h3 className="mt-2 font-mono text-2xl text-foreground">Need clarity on this lesson?</h3>
          <p className="mt-2 font-sans text-sm leading-7 text-muted-foreground">
            Ask about the current topic and mentors can answer right inside the course flow.
          </p>
        </div>
      </div>

      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={4}
        placeholder="Ask a clear question about this lesson or topic..."
        className="mt-4 w-full rounded-[1rem] border border-border bg-background p-4 font-sans text-sm leading-7 text-foreground outline-none transition focus:border-primary"
      />

      <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-sans text-xs text-muted-foreground">Tip: include what part confused you so mentors can help faster.</p>
        <button
          type="button"
          onClick={onSubmit}
          disabled={loading || value.trim().length < 10}
          className="inline-flex items-center justify-center rounded-xl bg-primary px-5 py-3 font-mono text-sm text-white transition hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Posting..." : "Post Question"}
        </button>
      </div>
    </div>
  );
}

export default function LessonDiscussionSection({
  slug,
  topicId,
  topicTitle,
  mode,
}: {
  slug: string;
  topicId: string;
  topicTitle?: string | null;
  mode: "demo" | "real";
}) {
  const isDemo = mode === "demo";
  const [questionText, setQuestionText] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const studentProfile = useStudentProfileStore((state) => state.studentProfile);
  const currentStudentName = studentProfile[0]?.name ?? "";

  const questionsQuery = useLessonDiscussion(slug, !isDemo);
  const createMutation = useCreateLessonQuestion(slug);
  const updateMutation = useUpdateLessonQuestion(slug);
  const deleteMutation = useDeleteLessonQuestion(slug);

  const visibleQuestions = useMemo(() => {
    const allQuestions = questionsQuery.data ?? [];
    const normalizedStudentName = normalize(currentStudentName);

    return allQuestions
      .filter((question) => {
        if (question.isVerified) return true;
        return normalizedStudentName.length > 0 && normalize(question.studentName || "") === normalizedStudentName;
      })
      .sort((left, right) => new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime());
  }, [currentStudentName, questionsQuery.data]);

  const handleSubmit = () => {
    if (!topicId || questionText.trim().length < 10) return;

    createMutation.mutate(
      { topicId, question: questionText.trim() },
      {
        onSuccess: () => {
          setQuestionText("");
        },
      },
    );
  };

  const handleStartEdit = (question: DiscussionQuestion) => {
    setEditingId(question.id);
    setEditingText(question.question);
  };

  const handleSaveEdit = () => {
    if (!editingId || editingText.trim().length < 10) return;

    updateMutation.mutate(
      { questionId: editingId, question: editingText.trim() },
      {
        onSuccess: () => {
          setEditingId(null);
          setEditingText("");
        },
      },
    );
  };

  const handleConfirmDelete = () => {
    if (!deleteId) return;

    deleteMutation.mutate(
      { questionId: deleteId },
      {
        onSuccess: () => {
          setDeleteId(null);
          if (editingId === deleteId) {
            setEditingId(null);
            setEditingText("");
          }
        },
      },
    );
  };

  if (isDemo) {
    return (
      <section className="rounded-[1.5rem] border border-border bg-card p-5 shadow-sm sm:p-6">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary">Discussion</p>
        <h3 className="mt-2 font-mono text-2xl text-foreground">Available in real mode</h3>
        <p className="mt-3 font-sans text-sm leading-7 text-muted-foreground">
          Course discussion is disabled in demo mode. Enroll and open the real lesson workspace to ask questions and receive mentor answers.
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-5">
      <AskQuestionForm
        value={questionText}
        onChange={setQuestionText}
        onSubmit={handleSubmit}
        loading={createMutation.isPending}
      />

      <div className="rounded-[1.5rem] border border-border bg-card p-4 shadow-sm sm:p-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary">Discussion</p>
            <h3 className="mt-2 font-mono text-2xl text-foreground">Questions on this course</h3>
            <p className="mt-2 font-sans text-sm leading-7 text-muted-foreground">
              Showing verified course questions plus your own submissions{topicTitle ? `, with ${topicTitle} highlighted.` : "."}
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
            <MessageSquare className="h-4 w-4 text-primary" />
            {visibleQuestions.length} visible
          </div>
        </div>

        {questionsQuery.isLoading ? (
          <div className="mt-5 space-y-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="min-h-[140px] animate-pulse rounded-[1.5rem] border border-border bg-muted/30" />
            ))}
          </div>
        ) : questionsQuery.isError ? (
          <div className="mt-5 rounded-[1.25rem] border border-border bg-background p-5 text-center">
            <p className="font-mono text-lg text-foreground">Unable to load discussion</p>
            <p className="mt-2 font-sans text-sm text-muted-foreground">
              Please try again in a moment.
            </p>
            <button
              type="button"
              onClick={() => void questionsQuery.refetch()}
              className="mt-4 inline-flex rounded-xl bg-primary px-4 py-3 font-mono text-sm text-white transition hover:opacity-90"
            >
              Retry
            </button>
          </div>
        ) : visibleQuestions.length === 0 ? (
          <div className="mt-5 rounded-[1.25rem] border border-dashed border-border bg-background p-8 text-center">
            <p className="font-mono text-lg text-foreground">No questions yet. Ask the first one.</p>
            <p className="mt-2 font-sans text-sm text-muted-foreground">
              Keep it specific to the lesson so mentors can answer clearly.
            </p>
          </div>
        ) : (
          <div className="mt-5 space-y-4">
            {visibleQuestions.map((question) => {
              const isOwner = normalize(question.studentName || "") === normalize(currentStudentName);
              const isHighlighted = question.topicId === topicId;

              return (
                <QuestionCard
                  key={question.id}
                  question={question}
                  isOwner={isOwner}
                  isHighlighted={isHighlighted}
                  editingText={editingId === question.id ? editingText : question.question}
                  setEditingText={setEditingText}
                  isEditing={editingId === question.id}
                  onStartEdit={() => handleStartEdit(question)}
                  onCancelEdit={() => {
                    setEditingId(null);
                    setEditingText("");
                  }}
                  onSaveEdit={handleSaveEdit}
                  onDelete={() => setDeleteId(question.id)}
                  updatePending={updateMutation.isPending && editingId === question.id}
                  deletePending={deleteMutation.isPending && deleteId === question.id}
                />
              );
            })}
          </div>
        )}
      </div>

      <DeleteConfirmDialog
        open={Boolean(deleteId)}
        onOpenChange={(open) => {
          if (!open) setDeleteId(null);
        }}
        onConfirm={handleConfirmDelete}
        loading={deleteMutation.isPending}
      />
    </section>
  );
}
