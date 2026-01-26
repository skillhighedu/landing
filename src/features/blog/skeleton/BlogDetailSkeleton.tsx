export function BlogDetailSkeleton() {
  return (
    <div className="min-h-screen bg-neutral-950 py-20 px-6 sm:px-10 lg:px-16 animate-pulse">
      <article className="max-w-3xl mx-auto space-y-8">
        {/* Title */}
        <div className="h-10 w-3/4 bg-neutral-800 rounded" />

        {/* Meta */}
        <div className="flex gap-4">
          <div className="h-4 w-24 bg-neutral-800 rounded" />
          <div className="h-4 w-16 bg-neutral-800 rounded" />
        </div>

        {/* Image */}
        <div className="w-full h-64 bg-neutral-800 rounded-xl" />

        {/* Share */}
        <div className="h-5 w-32 bg-neutral-800 rounded" />

        {/* Content */}
        <div className="space-y-4">
          <div className="h-4 w-full bg-neutral-800 rounded" />
          <div className="h-4 w-full bg-neutral-800 rounded" />
          <div className="h-4 w-5/6 bg-neutral-800 rounded" />
          <div className="h-4 w-4/6 bg-neutral-800 rounded" />
        </div>

        <div className="space-y-4 pt-6">
          <div className="h-4 w-full bg-neutral-800 rounded" />
          <div className="h-4 w-11/12 bg-neutral-800 rounded" />
          <div className="h-4 w-2/3 bg-neutral-800 rounded" />
        </div>

        {/* Footer Share */}
        <div className="h-5 w-32 bg-neutral-800 rounded pt-8" />
      </article>
    </div>
  );
}
