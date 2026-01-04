import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import HeaderSection from "@/components/common/HeaderSection";
import DashboardLayout from "@/layouts/DashboardLayout";
import QuizCard from "@/features/quiz/components/QuizCard";

const quizzes = [
  {
    id: "quiz-1",
    title: "JavaScript Basics",
    description: "Variables, constants, and how JS really works.",
    questionsCount: 12,
  },
  {
    id: "quiz-2",
    title: "Functions & Scope",
    description: "Closures, arrow functions, and execution context.",
    questionsCount: 10,
  },
  {
    id: "quiz-3",
    title: "Async JavaScript",
    description: "Promises, async/await, and the event loop.",
    questionsCount: 8,
  },
];

export default function QuizList() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-neutral-950 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto mb-10">
          <HeaderSection title="Quizzes" />
        </div>

        <div className="max-w-6xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {quizzes.map((quiz, index) => (
            <QuizCard
              key={quiz.id}
              index={index}
              title={quiz.title}
              description={quiz.description}
              questions={quiz.questionsCount}
              onStart={() => navigate(`/course-dashboard/:slug/quiz/:quizId"`)}
            />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
