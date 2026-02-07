export default function QuizSkeleton() {
  return (
    <section className="min-h-screen bg-background text-foreground py-12 lg:py-16">
      <div className="px-4 sm:px-8 lg:px-16">
        <div className="max-w-5xl mx-auto">   {/* FIXED */}
          <div className="rounded-3xl border border-border bg-card shadow-md animate-pulse">

            {/* Progress skeleton */}
            <div className="px-6 lg:px-10 py-6 border-b border-border">
              <div className="flex items-center justify-between">
                <div className="h-4 w-40 bg-muted rounded" />
                <div className="h-4 w-16 bg-muted rounded" />
              </div>

              <div className="mt-4 h-2 w-full rounded-full bg-muted" />
            </div>

            {/* Question skeleton */}
            <div className="px-6 lg:px-10 py-10">
              <div className="h-6 w-3/4 bg-muted rounded mb-8" />

              <div className="grid gap-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-12 w-full bg-muted rounded-lg"
                  />
                ))}
              </div>

              <div className="mt-12 flex items-center justify-between">
                <div className="h-10 w-24 bg-muted rounded-lg" />
                <div className="h-10 w-24 bg-muted rounded-lg" />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
