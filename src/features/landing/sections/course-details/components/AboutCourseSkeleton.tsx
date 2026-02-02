export default function AboutCourseSkeleton() {
  return (
    <section className="min-h-[90vh] bg-neutral-950 flex items-center">
      <div className="w-full max-w-6xl mx-auto px-6 space-y-6">
        <div className="h-16 w-3/4 bg-neutral-800 rounded-lg animate-pulse" />
        <div className="space-y-3">
          <div className="h-5 w-full bg-neutral-800 rounded animate-pulse" />
          <div className="h-5 w-5/6 bg-neutral-800 rounded animate-pulse" />
          <div className="h-5 w-4/6 bg-neutral-800 rounded animate-pulse" />
        </div>

        <div className="flex gap-4">
          <div className="h-6 w-32 bg-neutral-800 rounded-full animate-pulse" />
          <div className="h-6 w-40 bg-neutral-800 rounded-full animate-pulse" />
          <div className="h-6 w-36 bg-neutral-800 rounded-full animate-pulse" />
        </div>

        <div className="h-12 w-40 bg-neutral-800 rounded-lg animate-pulse" />
      </div>
    </section>
  );
}
