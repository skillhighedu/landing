export function CourseCardSkeleton() {
  return (
    <div className="bg-neutral-800 rounded-2xl border border-neutral-700 p-4 space-y-3">
      <div className="aspect-video bg-neutral-700/50 rounded animate-pulse" />
      <div className="h-5 w-3/4 bg-neutral-700/50 rounded animate-pulse" />
      <div className="h-10 w-full bg-neutral-700/50 rounded animate-pulse" />
    </div>
  );
}
