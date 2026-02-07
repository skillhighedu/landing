

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import QuestionCard from "./QuestionCard";
import DashboardLayout from "../../dashboard/layout/DashboardLayout";
import CustomButton from "@/components/common/Button";
import Container from "@/layouts/Container";
import { useQuizQuestions } from "../hooks/useQuizQuestions";
import QuizSkeleton from "./QuizSkeleton";

export default function Quiz({ mode }: { mode: "demo" | "real" }) {
  // ✅ Get routing values directly from URL
  const { slug, quizId } = useParams<{ slug: string; quizId: string }>();

  // ✅ Query only runs when both exist (handled in hook)
  const { data, isLoading } = useQuizQuestions(slug!, quizId!, mode);

  const questions = data?.questions ?? [];

  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[][]>([]);

  // Initialize answers after questions load
  useEffect(() => {
    setAnswers(Array(questions.length).fill([]));
  }, [questions.length]);

  if (isLoading) return <QuizSkeleton/>

  const question = questions[current];

  const progress =
    questions.length > 0
      ? ((current + 1) / questions.length) * 100
      : 0;

  const isLast = current === questions.length - 1;

  function selectOption(index: number) {
    setAnswers((prev) => {
      const copy = [...prev];
      const selected = copy[current] ?? [];

      if (selected.includes(index))
        copy[current] = selected.filter((i) => i !== index);
      else copy[current] = [...selected, index];

      return copy;
    });
  }

  return (
    <DashboardLayout title="Quiz">
      <section className="min-h-screen bg-background text-foreground ">
        <Container size="full" className="px-4 sm:px-8 lg:px-16">
          <div className=" mx-auto">
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
                  {question?.text}
                </div>

                <QuestionCard
                  question={question}
                  selected={answers[current] ?? []}
                  onSelect={selectOption}
                />

                {/* Actions */}
                <div className="mt-12 flex items-center justify-between gap-4">
                  <CustomButton
                  
                    disabled={current === 0}
                    onClick={() => setCurrent((c) => c - 1)}
                    title="Back"
                  />

                  <CustomButton
                    onClick={() => setCurrent((c) => c + 1)}
                    disabled={isLast}
                    title={isLast ? "Finish" : "Next"}
                  />
                </div>
              </div>

            </div>
          </div>
        </Container>
      </section>
    </DashboardLayout>
  );
}
