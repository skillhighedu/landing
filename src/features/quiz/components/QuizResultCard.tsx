import DashboardLayout from "../../dashboard/layout/DashboardLayout";
import Container from "@/layouts/Container";
import CustomButton from "@/components/common/Button";
import type { QuizResultCardProps } from "../types";




export default function QuizResultCard({ result, onRetake }: QuizResultCardProps) {
  return (
    <DashboardLayout title="Quiz Result">
      <section className="bg-background text-foreground">
        <Container size="full" className="px-4 pt-2 sm:px-8 lg:px-16">
          <div className="mx-auto max-w-2xl">
            <div className="rounded-3xl border border-border bg-card p-8 shadow-md">
              <h2 className="font-mono text-2xl">Quiz Result</h2>

              <p className="mt-3 text-muted-foreground font-mono">{result.message}</p>

              <div className="mt-6 rounded-2xl border border-border bg-background p-6">
                <div className="font-mono text-sm text-muted-foreground">Your Score</div>
                <div className="mt-2 font-mono text-4xl font-bold">{result.score}%</div>
              </div>

              <div className="mt-8 flex gap-4">
                <CustomButton title="Retake" onClick={onRetake} className="font-mono" />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </DashboardLayout>
  );
}
