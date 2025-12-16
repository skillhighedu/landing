export default function CourseDashboardSkeleton() {
  return (
    <div className="min-h-screen bg-linear-to-b from-neutral-950 to-neutral-900 px-4 sm:px-8 py-12 text-white mt-12">
      {/* Header */}
      <div className="h-8 w-48 bg-neutral-800 rounded animate-pulse mb-8" />

      {/* Course Header */}
      <div className="rounded-2xl border border-white/10 bg-neutral-900/70 p-6 animate-pulse">
        <div className="flex gap-6">
          <div className="h-32 w-56 bg-neutral-800 rounded-xl" />
          <div className="flex-1 space-y-4">
            <div className="h-6 w-2/3 bg-neutral-800 rounded" />
            <div className="h-4 w-1/3 bg-neutral-800 rounded" />
            <div className="h-4 w-1/4 bg-neutral-800 rounded" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto space-y-8 mt-10">
        {/* Progress cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-28 rounded-2xl bg-neutral-900/70 border border-white/10 animate-pulse"
            />
          ))}
        </div>

        {/* Learn in Public */}
        <div className="h-40 rounded-2xl bg-neutral-900/70 border border-white/10 animate-pulse" />

        {/* Curriculum */}
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-16 rounded-xl bg-neutral-900/70 border border-white/10 animate-pulse"
            />
          ))}
        </div>
      </div>
    </div>
  );
}  