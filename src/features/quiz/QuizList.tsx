import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "../dashboard/layout/DashboardLayout";
import QuizCard from "@/features/quiz/components/QuizCard";
import { useDashboardRouteStore } from "@/store/dashboardRoute.store";
import type { PlayGroundProps } from "@/types/dashboard/demo";
import Container from "@/layouts/Container";
import { useQuizzes } from "./hooks/useQuizzes";
import QuizCardSkeleton from "./components/QuizCardSkeleton";
import DemoNotice from "../dashboard/components/common/DemoNotice";
import type { QuizRouteState } from "./types";
import { BookOpenCheck, CirclePlay, LockKeyhole, Sparkles } from "lucide-react";

export default function QuizList({ mode }: PlayGroundProps) {
  const navigate = useNavigate();
  const { slug: routeSlug = "" } = useParams<{ slug: string }>();
  const { slug: storedSlug } = useDashboardRouteStore();
  const slug = routeSlug || storedSlug;

  const { data: quizzes = [], isLoading } = useQuizzes(slug, mode);
  const unlockedCount = quizzes.filter((quiz) => !quiz.locked).length;
  const lockedCount = quizzes.length - unlockedCount;

  const buildQuizPath = () => {
    return mode === "demo"
      ? `/course/${slug}/demo/quiz/play`
      : `/course-dashboard/${slug}/quiz/play`;
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    document.documentElement.scrollTo({ top: 0, left: 0, behavior: "auto" });
    document.body.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [slug, mode]);

  return (
    <DashboardLayout title="Quizzes">
      <Container size="full">
        {mode === "demo" && <DemoNotice />}

        <section className="mx-auto space-y-6">
          <div className="overflow-hidden rounded-[2rem] border border-border bg-gradient-to-br from-primary/10 via-background to-background shadow-sm">
            <div className="grid gap-6 px-5 py-6 sm:px-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.9fr)] lg:px-8 lg:py-8">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 font-mono text-xs uppercase tracking-[0.18em] text-primary">
                  <Sparkles className="h-4 w-4" />
                  Quiz Arena
                </div>

                <h2 className="mt-4 max-w-2xl text-2xl  text-foreground sm:text-3xl">
                  Pick a quiz, test your recall, and move through the course with momentum.
                </h2>

                <p className="mt-3 max-w-2xl text-sm leading-7 font-mono text-muted-foreground sm:text-base">
                  Each quiz is designed for quick practice. Open any available set, answer at your own pace, and keep progressing through the dashboard.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                <div className="rounded-2xl border border-border bg-background/80 px-4 py-4">
                  <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    <BookOpenCheck className="h-4 w-4" />
                    Total
                  </div>
                  <div className="mt-3 text-2xl font-semibold text-foreground">{quizzes.length}</div>
                  <p className="mt-1 font-mono text-sm text-muted-foreground">Quiz sets ready for this course</p>
                </div>

                <div className="rounded-2xl border border-border bg-background/80 px-4 py-4">
                  <div className="flex  items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    <CirclePlay className="h-4 w-4" />
                    Open
                  </div>
                  <div className="mt-3 text-2xl font-semibold text-foreground">{unlockedCount}</div>
                  <p className="mt-1 font-mono text-sm text-muted-foreground">Available to start right now</p>
                </div>

                <div className="rounded-2xl border border-border bg-background/80 px-4 py-4">
                  <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    <LockKeyhole className="h-4 w-4" />
                    Locked
                  </div>
                  <div className="mt-3 text-2xl font-semibold text-foreground">{lockedCount}</div>
                  <p className="mt-1 font-mono text-sm text-muted-foreground">Will unlock as you continue</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mx-auto grid gap-6 sm:grid-cols-2 xl:grid-cols-3">

            {isLoading &&
              Array.from({ length: 6 }).map((_, i) => (
                <QuizCardSkeleton key={i} />
              ))}

            {!isLoading && quizzes.map((quiz, index) => (
              <QuizCard
                key={quiz.id}
                index={index}
                title={quiz.title}
                description="Focused practice to sharpen recall and help you move faster through the course."
                questions={quiz.questionsCount}
                locked={quiz.locked}
                onStart={() => {
                  if (!quiz.locked) {
                    const quizState: QuizRouteState = {
                      quizId: quiz.id,
                      quizTitle: quiz.title,
                      questionsCount: quiz.questionsCount,
                    };

                    sessionStorage.setItem(
                      `quiz-selection:${mode}:${slug}`,
                      JSON.stringify(quizState),
                    );

                    navigate(buildQuizPath(), {
                      state: quizState,
                    });
                  }
                }}
              />
            ))}

            {!isLoading && quizzes.length === 0 && (
              <div className="col-span-full rounded-[2rem] border border-dashed border-border bg-card px-6 py-12 text-center">
                <p className="font-mono text-sm uppercase tracking-[0.18em] text-muted-foreground">
                  No quizzes yet
                </p>
                <p className="mt-3 text-base text-foreground">
                  Quiz sets for this course will appear here once they are available.
                </p>
              </div>
            )}
          </div>
        </section>
      </Container>
    </DashboardLayout>
  );
}
