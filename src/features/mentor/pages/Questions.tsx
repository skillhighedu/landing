import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageSquareQuote } from "lucide-react";
import HeaderSection from "@/components/common/HeaderSection";
import CustomButton from "@/components/common/Button";
import Container from "@/layouts/Container";
import api from "@/config/axiosConfig";
import { handleApiError } from "@/utils/errorHandler";
import type { ApiResponse } from "@/types";
import type { MentorQuestion } from "../types";
import { useNavigate, useParams } from "react-router-dom";
import { useMentorProfile } from "../hooks/useMentorProfile";

type QuestionFilter = "all" | "unanswered" | "answered";

function StatPill({
  value,
  label,
  color = "default",
}: {
  value: number;
  label: string;
  color?: "default" | "amber" | "emerald" | "blue";
}) {
  const colors = {
    default: "bg-card border-border text-foreground",
    amber: "bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-950/20 dark:border-amber-800 dark:text-amber-400",
    emerald:
      "bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-950/20 dark:border-emerald-800 dark:text-emerald-400",
    blue: "bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-950/20 dark:border-blue-800 dark:text-blue-400",
  };

  return (
    <div className={`inline-flex flex-col items-center rounded-[24px] border px-5 py-3 shadow-sm ${colors[color]}`}>
      <span className="text-xl font-bold tabular-nums">{value}</span>
      <span className="text-xs font-medium opacity-80">{label}</span>
    </div>
  );
}

function SkeletonQuestion() {
  return (
    <div className="animate-pulse space-y-4 rounded-[24px] border border-border bg-card/70 p-6">
      <div className="flex justify-between gap-6">
        <div className="flex-1 space-y-2">
          <div className="h-4 w-3/4 rounded-full bg-muted" />
          <div className="h-4 w-1/2 rounded-full bg-muted" />
          <div className="mt-3 h-3 w-1/3 rounded-full bg-muted" />
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="h-6 w-24 rounded-full bg-muted" />
          <div className="h-8 w-20 rounded-xl bg-muted" />
        </div>
      </div>
    </div>
  );
}

function FilterTab({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-all duration-200 ${
        active
          ? "border-primary bg-primary text-primary-foreground shadow-sm"
          : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
      }`}
    >
      {label}
    </button>
  );
}

export default function Questions() {
  const navigate = useNavigate();
  const { courseId = "" } = useParams<{ courseId: string }>();
  const {
    selectedCourse,
    isLoading: isProfileLoading,
  } = useMentorProfile();
  const [questions, setQuestions] = useState<MentorQuestion[]>([]);
  const [answerInputs, setAnswerInputs] = useState<Record<string, string>>({});
  const [openAnswerId, setOpenAnswerId] = useState<string | null>(null);
  const [expandedQuestions, setExpandedQuestions] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<QuestionFilter>("all");
  const [submitting, setSubmitting] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    async function fetchQuestions() {
      setLoading(true);
      try {
        const response = await api.get<ApiResponse<MentorQuestion[]>>("/mentors/course/questions", {
          params: { courseId },
        });
        setQuestions(response.data.additional ?? []);
      } catch (error) {
        handleApiError(error);
      } finally {
        setLoading(false);
        setTimeout(() => setVisible(true), 40);
      }
    }

    void fetchQuestions();
  }, [courseId]);

  const handleAnswerChange = (id: string, value: string) => {
    setAnswerInputs((previous) => ({ ...previous, [id]: value }));
  };

  const handleAnswerSubmit = async (id: string) => {
    const answer = answerInputs[id]?.trim();
    if (!answer || !courseId) {
      return;
    }

    setSubmitting(id);

    try {
      await api.put(`/mentors/course/questions/${id}/answer`, {
        answer,
        courseId,
      });
      setQuestions((previous) =>
        previous.map((question) =>
          question.id === id ? { ...question, answer, isAnswered: true } : question
        )
      );
      setAnswerInputs((previous) => ({ ...previous, [id]: "" }));
      setOpenAnswerId(null);
    } catch (error) {
      handleApiError(error);
    } finally {
      setSubmitting(null);
    }
  };

  const truncate = (text: string, max = 140) =>
    text.length <= max ? text : `${text.slice(0, max)}...`;

  const answered = questions.filter((question) => question.isAnswered).length;
  const unanswered = questions.filter((question) => !question.isAnswered).length;
  const verified = questions.filter((question) => question.isVerified).length;
  const filteredQuestions =
    filter === "answered"
      ? questions.filter((question) => question.isAnswered)
      : filter === "unanswered"
        ? questions.filter((question) => !question.isAnswered)
        : questions;

  if (isProfileLoading || loading) {
    return (
      <Container size="full">
        <div className="mt-20 py-10 font-mono">
          <HeaderSection title="Questions" />
          <div className="mb-8 mt-6 flex flex-wrap gap-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="h-16 w-24 animate-pulse rounded-[24px] bg-muted/40" />
            ))}
          </div>
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <SkeletonQuestion key={index} />
            ))}
          </div>
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
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <HeaderSection title="Questions" />
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Review student lesson questions, see the related topic, and send answers without leaving the mentor workspace.
            </p>
            {selectedCourse && (
              <p className="mt-2 text-xs uppercase tracking-[0.18em] text-primary/80">
                Active course: {selectedCourse.courseName}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <CustomButton title="View Performance" onClick={() => navigate(`/mentor/course/${courseId}/performance`)}>
              View Performance
            </CustomButton>
          </div>
        </div>

        <div className="mb-8 mt-6 flex flex-wrap gap-3">
          <StatPill value={questions.length} label="Total" />
          <StatPill value={unanswered} label="Pending" color={unanswered > 0 ? "amber" : "default"} />
          <StatPill value={answered} label="Answered" color="emerald" />
          <StatPill value={verified} label="Verified" color="blue" />
        </div>

        {questions.length > 0 && (
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <FilterTab label="All" active={filter === "all"} onClick={() => setFilter("all")} />
            <FilterTab
              label="Unanswered"
              active={filter === "unanswered"}
              onClick={() => setFilter("unanswered")}
            />
            <FilterTab
              label="Answered"
              active={filter === "answered"}
              onClick={() => setFilter("answered")}
            />
          </div>
        )}

        {filteredQuestions.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 rounded-[28px] border border-dashed border-border bg-card/70 py-20 text-center">
            <p className="text-lg font-semibold text-foreground">No questions here</p>
            <p className="text-sm text-muted-foreground">
              {filter !== "all"
                ? "Try switching the filter above."
                : "Questions from students will appear here."}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredQuestions.map((question, index) => {
              const isExpanded = expandedQuestions[question.id];
              const isOpen = openAnswerId === question.id;
              const displayText = isExpanded
                ? question.question
                : truncate(question.question);
              const needsTruncation = question.question.length > 140;
              const charCount = answerInputs[question.id]?.length ?? 0;

              return (
                <motion.div
                  key={question.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  className={`rounded-[28px] border p-5 transition-shadow duration-200 hover:shadow-sm sm:p-6 ${
                    !question.isAnswered
                      ? "border-amber-200 bg-amber-50/30 dark:border-amber-800 dark:bg-amber-950/10"
                      : "border-border bg-card"
                  }`}
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0 flex-1">
                      {!question.isAnswered && (
                        <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-100 px-2 py-0.5 text-[11px] font-semibold text-amber-700 dark:border-amber-800 dark:bg-amber-950/20 dark:text-amber-400">
                          <span className="relative flex h-1.5 w-1.5">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
                            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber-500" />
                          </span>
                          Needs answer
                        </div>
                      )}

                      {(question.topic?.title || question.topicTitle) && (
                        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
                          <MessageSquareQuote className="h-3.5 w-3.5" />
                          {question.topic?.title || question.topicTitle}
                        </div>
                      )}

                      <p className="text-sm leading-relaxed text-foreground sm:text-base">
                        {displayText}
                        {needsTruncation && (
                          <button
                            onClick={() =>
                              setExpandedQuestions((previous) => ({
                                ...previous,
                                [question.id]: !previous[question.id],
                              }))
                            }
                            className="ml-1.5 text-xs font-semibold text-primary hover:underline"
                          >
                            {isExpanded ? "Show less" : "Show more"}
                          </button>
                        )}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                        <span>{question.studentName || "Unknown"}</span>
                        <span>{new Date(question.createdAt).toLocaleDateString("en-IN")}</span>
                      </div>
                    </div>

                    <div className="flex flex-shrink-0 items-center gap-2 sm:flex-col sm:items-end">
                      <div className="flex flex-wrap justify-end gap-1.5">
                        <span
                          className={`rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${
                            question.isAnswered
                              ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/20 dark:text-emerald-400"
                              : "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950/20 dark:text-amber-400"
                          }`}
                        >
                          {question.isAnswered ? "Answered" : "Unanswered"}
                        </span>
                        <span
                          className={`rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${
                            question.isVerified
                              ? "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950/20 dark:text-blue-400"
                              : "border-border bg-muted text-muted-foreground"
                          }`}
                        >
                          {question.isVerified ? "Verified" : "Unverified"}
                        </span>
                      </div>

                      <button
                        onClick={() => setOpenAnswerId((previous) => (previous === question.id ? null : question.id))}
                        className={`rounded-2xl px-4 py-2 text-xs font-semibold transition-all ${
                          isOpen
                            ? "border border-border bg-muted text-muted-foreground"
                            : "bg-primary text-primary-foreground shadow-sm hover:opacity-90"
                        }`}
                      >
                        {isOpen ? "Cancel" : question.isAnswered ? "Edit" : "Answer"}
                      </button>
                    </div>
                  </div>

                  {question.isAnswered && question.answer && !isOpen && (
                    <div className="mt-4 rounded-2xl border border-border/60 bg-muted/40 p-3">
                      <p className="mb-1 text-xs font-semibold text-muted-foreground">Your answer</p>
                      <p className="whitespace-pre-line text-sm leading-relaxed text-foreground/80">
                        {question.answer}
                      </p>
                    </div>
                  )}

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 space-y-3 border-t border-border/60 pt-4">
                          <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                            Your answer
                          </label>
                          <div className="relative">
                            <textarea
                              value={answerInputs[question.id] ?? ""}
                              onChange={(event) => handleAnswerChange(question.id, event.target.value)}
                              placeholder="Type a clear, helpful answer for the student..."
                              className="w-full resize-none rounded-2xl border border-border bg-background p-4 text-sm leading-relaxed text-foreground transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                              rows={5}
                            />
                            <span className="absolute bottom-3 right-3 text-[11px] text-muted-foreground tabular-nums">
                              {charCount} chars
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => void handleAnswerSubmit(question.id)}
                              disabled={!answerInputs[question.id]?.trim() || submitting === question.id}
                              className="flex items-center gap-2 rounded-2xl bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                              {submitting === question.id ? "Submitting..." : "Submit Answer"}
                            </button>
                            <button
                              onClick={() => setOpenAnswerId(null)}
                              className="text-xs text-muted-foreground transition hover:text-foreground"
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
    </Container>
  );
}
