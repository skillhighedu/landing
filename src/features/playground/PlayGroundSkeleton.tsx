export default function PlayGroundSkeleton() {
  return (
    <div className="flex flex-col lg:flex-row gap-6 animate-pulse mt-20">
      
      {/* LEFT CONTENT */}
      <div className="flex-1 space-y-6">
        {/* Video skeleton */}
        <div className="w-full aspect-video rounded-2xl bg-neutral-800" />

        {/* Actions skeleton */}
        <div className="h-14 rounded-xl bg-neutral-800" />

        {/* Description skeleton */}
        <div className="space-y-3">
          <div className="h-4 w-1/2 bg-neutral-800 rounded" />
          <div className="h-4 w-full bg-neutral-800 rounded" />
          <div className="h-4 w-5/6 bg-neutral-800 rounded" />
          <div className="h-4 w-4/6 bg-neutral-800 rounded" />
        </div>
      </div>

      {/* RIGHT SIDEBAR */}
      <div className="hidden lg:block w-[340px] space-y-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="h-12 rounded-lg bg-neutral-800"
          />
        ))}
      </div>
    </div>
  );
}
