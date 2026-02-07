export default function CourseDashboardSkeleton() {
  return (
    <div className="min-h-screen px-4 sm:px-8 py-12 mt-12">
      
      {/* Course Header Skeleton */}
      <div className="max-w-7xl mx-auto mt-8 mb-12">
        <div className="relative overflow-hidden rounded-3xl h-[260px] sm:h-80 md:h-[360px] bg-neutral-200 dark:bg-neutral-800 animate-pulse">
          <div className="absolute bottom-0 left-0 p-6 sm:p-10 w-full">
            <div className="h-8 w-2/3 bg-neutral-300 dark:bg-neutral-700 rounded mb-3" />
            <div className="h-4 w-1/3 bg-neutral-300 dark:bg-neutral-700 rounded" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Progress Section */}
        <div className="rounded-3xl p-6 sm:p-8 bg-neutral-100 dark:bg-neutral-900 animate-pulse">
          <div className="h-6 w-40 bg-neutral-300 dark:bg-neutral-700 rounded mb-8" />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-28 rounded-2xl bg-neutral-300 dark:bg-neutral-800"
              />
            ))}
          </div>
        </div>

        {/* Learn in Public */}
        <div className="h-40 rounded-3xl bg-neutral-200 dark:bg-neutral-800 animate-pulse" />

        {/* Curriculum */}
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-16 rounded-xl bg-neutral-200 dark:bg-neutral-800 animate-pulse"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
