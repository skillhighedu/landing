"use client";

import { useState } from "react";
import { quiz } from "./quiz.data";
// import QuizHeader from "./QuizHeader";
import QuestionCard from "./QuestionCard";
import HeaderSection from "@/components/common/HeaderSection";
import DashboardLayout from "../../dashboard/layout/DashboardLayout";
import CustomButton from "@/components/common/Button";

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[][]>(
    Array(quiz.questions.length).fill([])
  );

  const question = quiz.questions[current];
  const progress = ((current + 1) / quiz.questions.length) * 100;

  function selectOption(index: number) {
    setAnswers((prev) => {
      const copy = [...prev];
      const selected = copy[current];

      if (selected.includes(index)) {
        copy[current] = selected.filter((i) => i !== index);
      } else {
        copy[current] = [...selected, index];
      }
      return copy;
    });
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-neutral-950 text-white py-10 px-4">
        {/* Page Header */}
        <div className="max-w-6xl mx-auto mb-6">
          <HeaderSection title="Quiz" />
        </div>

        {/* Centered Quiz Area */}
        <div className="max-w-6xl mx-auto">
          <div
            className="
              relative
              bg-neutral-900
              border border-neutral-800
              rounded-2xl
              p-6 sm:p-8
              shadow-xl
            "
          >
            {/* Progress */}
            <div className="mb-6">
              <div className="flex justify-between text-xs text-neutral-400 mb-2">
                <span>
                  Question {current + 1} of {quiz.questions.length}
                </span>
                <span>{Math.round(progress)}%</span>
              </div>

              <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-800 transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Question */}
            <QuestionCard
              question={question}
              selected={answers[current]}
              onSelect={selectOption}
            />

            {/* Navigation */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-0 sm:justify-between mt-8">
              <CustomButton
                disabled={current === 0}
                onClick={() => setCurrent((c) => c - 1)}
                title="Back"
                icon={""}
                className="
                  w-full sm:w-auto
                  px-6 py-3 rounded-lg
                  bg-neutral-800 hover:bg-neutral-700
                  disabled:opacity-30
                  transition
                "
              >
                
              </CustomButton>

              <CustomButton
                onClick={() => setCurrent((c) => c + 1)}
                disabled={current === quiz.questions.length - 1}
                icon={""}
                title= {current === quiz.questions.length - 1
                  ? "Finish"
                  : "Next"}

                className="
                  w-full sm:w-auto
                  px-6 py-3 rounded-lg
                  bg-green-600 hover:bg-green-500
                  text-white
                  disabled:opacity-30
                  transition
                "
              >
               
              </CustomButton>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
