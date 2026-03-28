
export default function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-border bg-muted/30 p-6 space-y-4 animate-pulse">
      <div className="flex items-start justify-between">
        <div className="space-y-2 flex-1">
          <div className="h-3 w-16 bg-muted rounded-full" />
          <div className="h-5 w-3/4 bg-muted rounded-full" />
        </div>
        <div className="h-8 w-20 bg-muted rounded-full" />
      </div>
      <div className="h-px bg-border/60" />
      <div className="flex gap-3">
        <div className="h-9 flex-1 bg-muted rounded-xl" />
        <div className="h-9 flex-1 bg-muted rounded-xl" />
      </div>
    </div>
  );
}
