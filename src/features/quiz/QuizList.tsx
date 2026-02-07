import { useNavigate } from "react-router-dom";
import DashboardLayout from "../dashboard/layout/DashboardLayout";
import QuizCard from "@/features/quiz/components/QuizCard";
import { useDashboardRouteStore } from "@/store/dashboardRoute.store";
import type { PlayGroundProps } from "@/types/dashboard/demo";
import Container from "@/layouts/Container";
import { useQuizzes } from "./hooks/useQuizzes";
import QuizCardSkeleton from "./components/QuizCardSkeleton";
import DemoNotice from "../dashboard/components/common/DemoNotice";

export default function QuizList({ mode }: PlayGroundProps) {
  const navigate = useNavigate();
  const { slug } = useDashboardRouteStore();

  const { data: quizzes = [], isLoading } = useQuizzes(slug, mode);

  const buildQuizPath = (quizId: string) => {
    const base =
      mode === "demo"
        ? `/courses/${slug}/demo/quiz`
        : `/course-dashboard/${slug}/quiz`;

    return `${base}/${quizId}`;
  };

  return (
    <DashboardLayout title="Quizzes">
      <Container size="full">
        
              {mode === "demo" && <DemoNotice />}
        <div className="mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {isLoading &&
    Array.from({ length: 6 }).map((_, i) => (
      <QuizCardSkeleton key={i} />
    ))}

          {quizzes.map((quiz, index) => (
            <QuizCard
              key={quiz.id}
              index={index}
              title={quiz.title}
              description=""
              questions={quiz.questionsCount}
              locked={quiz.locked}
              onStart={() => {
                if (!quiz.locked) navigate(buildQuizPath(quiz.id));
              }}
            />
          ))}
        </div>
      </Container>
    </DashboardLayout>
  );
}
