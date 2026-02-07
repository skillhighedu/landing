"use client";

import { useState } from "react";
import { quiz } from "./quiz.data";
import QuestionCard from "./QuestionCard";
import HeaderSection from "@/components/common/HeaderSection";
import DashboardLayout from "../../dashboard/layout/DashboardLayout";
import CustomButton from "@/components/common/Button";
import Container from "@/layouts/Container";

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[][]>(
    Array(quiz.questions.length).fill([])
  );

  const question = quiz.questions[current];
  const progress = ((current + 1) / quiz.questions.length) * 100;
  const isLast = current === quiz.questions.length - 1;

  function selectOption(index: number) {
    setAnswers((prev) => {
      const copy = [...prev];
      const selected = copy[current];

      if (selected.includes(index)) copy[current] = selected.filter((i) => i !== index);
      else copy[current] = [...selected, index];

      return copy;
    });
  }

  return (
    <DashboardLayout>
      {/* Page wrapper like Blogs */}
      <section className="min-h-screen bg-background text-foreground py-10">
        <Container size="xl" className="px-6 sm:px-10 lg:px-16">
          {/* Header aligned with container */}
          <div className="mb-8">
            <HeaderSection title="Quiz" />
          </div>

          {/* Quiz card */}
          <div className="max-w-3xl mx-auto">
            <div className="rounded-2xl border border-border bg-card text-card-foreground shadow-sm">
              {/* Top row */}
              <div className="px-5 sm:px-6 py-4 border-b border-border">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    Question{" "}
                    <span className="text-foreground font-medium">{current + 1}</span>{" "}
                    of{" "}
                    <span className="text-foreground font-medium">
                      {quiz.questions.length}
                    </span>
                  </span>

                  <span className="text-muted-foreground">{Math.round(progress)}%</span>
                </div>

                {/* Progress */}
                <div className="mt-3 h-1.5 w-full rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Question area */}
              <div className="px-5 sm:px-6 py-6">
                <QuestionCard
                  question={question}
                  selected={answers[current]}
                  onSelect={selectOption}
                />

                {/* Actions */}
                <div className="mt-8 flex items-center justify-between gap-3">
                  <CustomButton
                    disabled={current === 0}
                    onClick={() => setCurrent((c) => c - 1)}
                    title="Back"
                    icon={""}
                    className="
                      px-5 py-2.5 rounded-lg
                      bg-muted text-foreground border border-border
                      hover:opacity-90 disabled:opacity-30
                    "
                  />

                  <CustomButton
                    onClick={() => setCurrent((c) => c + 1)}
                    disabled={isLast}
                    icon={""}
                    title={isLast ? "Finish" : "Next"}
                    className="
                      px-6 py-2.5 rounded-lg
                      bg-primary text-primary-foreground
                      hover:opacity-90 disabled:opacity-30
                    "
                  />
                </div>
              </div>
            </div>

            {/* Helper text */}
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Select one or more options, then continue.
            </p>
          </div>
        </Container>
      </section>
    </DashboardLayout>
  );
}
