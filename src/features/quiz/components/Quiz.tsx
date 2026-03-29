import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ArrowRight, CheckCircle2, ListChecks } from "lucide-react";
import QuestionCard from "./QuestionCard";
import DashboardLayout from "../../dashboard/layout/DashboardLayout";
import CustomButton from "@/components/common/Button";
import Container from "@/layouts/Container";
import { useQuizQuestions } from "../hooks/useQuizQuestions";
import QuizSkeleton from "./QuizSkeleton";
import type { QuestionDTO, QuizRouteState, RouteParams } from "../types";
import { useSubmitQuizResult } from "../hooks/useSubmitQuizResult";
import { buildSubmitPayload } from "../utils/buildSubmitPayload";
import QuizResultCard from "./QuizResultCard";

const AUTO_ADVANCE_DELAY_MS = 180;

function getQuizSelectionStorageKey(mode: "demo" | "real", slug: string) {
  return `quiz-selection:${mode}:${slug}`;
}

function readStoredQuizState(
  mode: "demo" | "real",
  slug: string,
): QuizRouteState | null {
  if (!slug) return null;

  try {
    const raw = sessionStorage.getItem(getQuizSelectionStorageKey(mode, slug));
    return raw ? (JSON.parse(raw) as QuizRouteState) : null;
  } catch {
    return null;
  }
}

export default function Quiz({ mode }: { mode: "demo" | "real" }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { slug, quizId: legacyQuizId } = useParams<RouteParams>();
  const safeSlug = slug ?? "";
  const routeState = (location.state ?? null) as QuizRouteState | null;
  const storedQuizState = useMemo(
    () => readStoredQuizState(mode, safeSlug),
    [mode, safeSlug, location.key],
  );

  const activeQuizState = routeState ?? storedQuizState;
  const safeQuizId = activeQuizState?.quizId ?? legacyQuizId ?? "";
  const quizTitle = activeQuizState?.quizTitle?.trim() || "Quiz";
  const { data, isLoading } = useQuizQuestions(safeSlug, safeQuizId, mode);

  const questions: QuestionDTO[] = useMemo(() => data?.questions ?? [], [data]);
  const [current, setCurrent] = useState<number>(0);
  const [result, setResult] = useState<{
    score: string;
    message: string;
  } | null>(null);
  const [selectedIndexes, setSelectedIndexes] = useState<number[][]>([]);
  const autoAdvanceTimeoutRef = useRef<number | null>(null);
  const submitMutation = useSubmitQuizResult();

  useEffect(() => {
    if (!safeSlug || !safeQuizId) return;

    const nextQuizState: QuizRouteState = {
      quizId: safeQuizId,
      quizTitle,
      questionsCount: activeQuizState?.questionsCount,
    };

    sessionStorage.setItem(
      getQuizSelectionStorageKey(mode, safeSlug),
      JSON.stringify(nextQuizState),
    );

    if (legacyQuizId) {
      const nextPath =
        mode === "demo"
          ? `/course/${safeSlug}/demo/quiz/play`
          : `/course-dashboard/${safeSlug}/quiz/play`;

      navigate(nextPath, {
        replace: true,
        state: nextQuizState,
      });
    }
  }, [activeQuizState?.questionsCount, legacyQuizId, mode, navigate, quizTitle, safeQuizId, safeSlug]);

  useEffect(() => {
    setSelectedIndexes(Array.from({ length: questions.length }, () => []));
    setCurrent(0);
  }, [questions.length]);

  useEffect(() => {
    return () => {
      if (autoAdvanceTimeoutRef.current) {
        window.clearTimeout(autoAdvanceTimeoutRef.current);
      }
    };
  }, []);

  const question = questions[current];
  const progress =
    questions.length > 0 ? ((current + 1) / questions.length) * 100 : 0;
  const isLast = current === questions.length - 1;
  const canGoBack = current > 0 && !submitMutation.isPending;
  const currentSelection = selectedIndexes[current] ?? [];
  const hasSelection = currentSelection.length > 0;
  const answeredCount = selectedIndexes.filter((item) => item.length > 0).length;

  function selectOption(index: number) {
    if (autoAdvanceTimeoutRef.current) {
      window.clearTimeout(autoAdvanceTimeoutRef.current);
    }

    setSelectedIndexes((prev) => {
      const copy = prev.map((arr) => [...arr]);
      copy[current] = [index];
      return copy;
    });

    if (!isLast) {
      autoAdvanceTimeoutRef.current = window.setTimeout(() => {
        setCurrent((value) => Math.min(value + 1, questions.length - 1));
        autoAdvanceTimeoutRef.current = null;
      }, AUTO_ADVANCE_DELAY_MS);
    }
  }

  const handleNextOrFinish = async () => {
    if (!safeQuizId) return;

    if (!isLast) {
      setCurrent((value) => value + 1);
      return;
    }

    const payload = buildSubmitPayload(questions, selectedIndexes);

    if (payload.length === 0) {
      alert("Please answer at least one question.");
      return;
    }

    try {
      const response = await submitMutation.mutateAsync({
        quizId: safeQuizId,
        answers: payload,
        slug: safeSlug,
        mode,
      });
      setResult(response);
    } catch {
      // Error UI is handled below via mutation state.
    }
  };

  if (result) {
    return (
      <QuizResultCard
        result={result}
        onRetake={() => {
          setResult(null);
          setCurrent(0);
          setSelectedIndexes(Array.from({ length: questions.length }, () => []));
        }}
      />
    );
  }

  return (
    <DashboardLayout title={quizTitle}>
      <section className="min-h-screen bg-background text-foreground">
        <Container size="full" className="px-2 sm:px-4 lg:px-10">
          {!safeSlug || !safeQuizId ? (
            <div className="mx-auto max-w-3xl rounded-[2rem] border border-border bg-card p-6 shadow-sm sm:p-8">
              <p className="font-mono text-lg font-semibold">No quiz selected yet.</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Open a quiz from the quiz list first. We now keep the URL clean and store the selected quiz internally.
              </p>
            </div>
          ) : isLoading ? (
            <QuizSkeleton />
          ) : (
            <div className="mx-auto max-w-5xl">
              <div className="overflow-hidden rounded-[2rem] border border-border bg-card shadow-sm">
                <div className="border-b border-border bg-gradient-to-br from-primary/10 via-background to-background px-4 py-5 sm:px-6 lg:px-8">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                    <div className="space-y-3">
                      <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 font-mono text-xs font-medium text-primary">
                        <ListChecks className="h-4 w-4" />
                        {questions.length} questions
                      </div>

                      <div>
                        <p className="font-mono text-sm text-muted-foreground">
                          Question {Math.min(current + 1, questions.length)} of {questions.length}
                        </p>
                        <h2 className="mt-1 font-mono text-xl font-semibold sm:text-2xl">
                          {question?.text ?? "Quiz in progress"}
                        </h2>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 sm:flex sm:items-center">
                      <div className="rounded-2xl border border-border bg-background/80 px-4 py-3">
                        <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                          Answered
                        </p>
                        <p className="mt-1 font-mono text-lg font-semibold">{answeredCount}</p>
                      </div>

                      <div className="rounded-2xl border border-border bg-background/80 px-4 py-3">
                        <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                          Progress
                        </p>
                        <p className="mt-1 font-mono text-lg font-semibold">{Math.round(progress)}%</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 h-2.5 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                <div className="px-4 py-6 sm:px-6 lg:px-8">
                  <div className="mb-4 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 font-mono">
                      <CheckCircle2 className={`h-4 w-4 ${hasSelection ? "text-primary" : "text-muted-foreground/50"}`} />
                      {hasSelection ? "Answer selected" : "Select an answer"}
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 font-mono">
                      Tap an option to select it
                    </span>
                  </div>

                  {question ? (
                    <QuestionCard
                      question={question}
                      selected={currentSelection}
                      onSelect={selectOption}
                    />
                  ) : null}

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <CustomButton
                      disabled={!canGoBack}
                      onClick={() => setCurrent((value) => value - 1)}
                      title="Previous"
                      isBack
                      icon={<ArrowRight className="h-4 w-4 rotate-180" />}
                      className="w-full justify-center font-mono sm:w-auto"
                    />

                    <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                      {!isLast ? (
                        <CustomButton
                          onClick={handleNextOrFinish}
                          title="Next question"
                          icon={<ArrowRight className="h-4 w-4" />}
                          className="w-full justify-center font-mono sm:w-auto"
                        />
                      ) : (
                        <CustomButton
                          onClick={handleNextOrFinish}
                          disabled={submitMutation.isPending}
                          loading={submitMutation.isPending}
                          title="Submit quiz"
                          icon={<CheckCircle2 className="h-4 w-4" />}
                          className="w-full justify-center font-mono sm:w-auto"
                        />
                      )}
                    </div>
                  </div>

                  {submitMutation.isError ? (
                    <p className="mt-4 text-sm text-destructive">
                      Failed to submit quiz. Please try again.
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
          )}
        </Container>
      </section>
    </DashboardLayout>
  );
}
