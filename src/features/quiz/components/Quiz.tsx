import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import QuestionCard from "./QuestionCard";
import DashboardLayout from "../../dashboard/layout/DashboardLayout";
import CustomButton from "@/components/common/Button";
import Container from "@/layouts/Container";
import { useQuizQuestions } from "../hooks/useQuizQuestions";
import QuizSkeleton from "./QuizSkeleton";
import type { QuestionDTO, RouteParams } from "../types";
import { useSubmitQuizResult } from "../hooks/useSubmitQuizResult";
import { buildSubmitPayload } from "../utils/buildSubmitPayload";
import QuizResultCard from "./QuizResultCard";

export default function Quiz({ mode }: { mode: "demo" | "real" }) {
  const { slug, quizId } = useParams<RouteParams>();

  // ✅ Query only runs when both exist (handled inside your hook)
  const { data, isLoading } = useQuizQuestions(slug!, quizId!, mode);

  // Strongly type questions
  const questions: QuestionDTO[] = useMemo(() => data?.questions ?? [], [data]);

  const [current, setCurrent] = useState<number>(0);

  const [result, setResult] = useState<{
    score: string;
    message: string;
  } | null>(null);

  // Store selected option indexes (supports multi-select UI, but we submit first selected)
  const [selectedIndexes, setSelectedIndexes] = useState<number[][]>([]);

  // mutation
  const submitMutation = useSubmitQuizResult();

  // Initialize selections when questions load/change
  useEffect(() => {
    setSelectedIndexes(Array.from({ length: questions.length }, () => []));
    setCurrent(0);
  }, [questions.length]);

  if (isLoading) return <QuizSkeleton />;

  const question = questions[current];

  const progress =
    questions.length > 0 ? ((current + 1) / questions.length) * 100 : 0;

  const isLast = current === questions.length - 1;

  function selectOption(index: number) {
    setSelectedIndexes((prev) => {
      const copy = prev.map((arr) => [...arr]); // deep copy
      const selected = copy[current] ?? [];

      if (selected.includes(index)) {
        copy[current] = selected.filter((i) => i !== index);
      } else {
        copy[current] = [...selected, index];
      }

      return copy;
    });
  }

  const canGoBack = current > 0 && !submitMutation.isPending;

  const handleNextOrFinish = async () => {
    console.log("Clicked. isLast=", isLast, "quizId=", quizId);

    if (!quizId) return;

    if (!isLast) {
      setCurrent((c) => c + 1);
      return;
    }

    const payload = buildSubmitPayload(questions, selectedIndexes);
    //   console.log("Submitting payload:", payload, "count=", payload.length);

    if (payload.length === 0) {
      alert("Please answer at least one question.");
      return;
    }

    try {
      const res = await submitMutation.mutateAsync({
        quizId,
        answers: payload,
      });
      setResult(res);
    } catch {
      // error UI already handled by isError block
    }
  };

  if (result) {
    return (
      <QuizResultCard
        result={result}
        onRetake={() => {
          setResult(null);
          setCurrent(0);
          setSelectedIndexes(
            Array.from({ length: questions.length }, () => []),
          );
        }}
      />
    );
  }

  return (
    <DashboardLayout title="Quiz">
      <section className="min-h-screen bg-background text-foreground">
        <Container size="full" className="px-4 sm:px-8 lg:px-16">
          <div className="mx-auto">
            <div className="rounded-3xl border border-border bg-card shadow-md">
              {/* Progress */}
              <div className="px-6 lg:px-10 py-6 border-b border-border">
                <div className="flex items-center justify-between text-base">
                  <span className="text-muted-foreground">
                    Question{" "}
                    <span className="text-foreground font-semibold">
                      {current + 1}
                    </span>{" "}
                    of{" "}
                    <span className="text-foreground font-semibold">
                      {questions.length}
                    </span>
                  </span>

                  <span className="text-muted-foreground font-medium">
                    {Math.round(progress)}%
                  </span>
                </div>

                <div className="mt-4 h-2 w-full rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Question */}
              <div className="px-6 lg:px-10 py-10">
                <div className="text-lg lg:text-xl font-medium mb-8 leading-relaxed">
                  {question?.text ?? ""}
                </div>

                {question ? (
                  <QuestionCard
                    question={question}
                    selected={selectedIndexes[current] ?? []}
                    onSelect={selectOption}
                  />
                ) : null}

                {/* Actions */}
                <div className="mt-12 flex items-center justify-between gap-4">
                  <CustomButton
                    disabled={!canGoBack}
                    onClick={() => setCurrent((c) => c - 1)}
                    title="Back"
                  />

                  <CustomButton
                    onClick={handleNextOrFinish}
                    disabled={
                      submitMutation.isPending || questions.length === 0
                    }
                    title={
                      submitMutation.isPending
                        ? "Submitting..."
                        : isLast
                          ? "Finish"
                          : "Next"
                    }
                  />
                </div>

                {/* Optional error */}
                {submitMutation.isError ? (
                  <p className="mt-4 text-sm text-destructive">
                    Failed to submit quiz. Please try again.
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </DashboardLayout>
  );
}
