export default function CourseCardSkeleton() {
  return (
    <div className="bg-neutral-800/50 rounded-2xl shadow-[4px_4px_0_#000] overflow-hidden">
      {/* Image skeleton */}
      <div className="h-48 w-full bg-white/5 animate-pulse" />

      {/* Content */}
      <div className="p-5 space-y-3">
        <div className="h-5 w-3/4 bg-white/5 rounded animate-pulse" />
        <div className="h-4 w-full bg-white/5 rounded animate-pulse" />
        <div className="h-4 w-5/6 bg-white/5 rounded animate-pulse" />

        {/* Button */}
        <div className="mt-4 h-9 w-32 bg-white/5 rounded animate-pulse" />
      </div>
    </div>
  );
}
