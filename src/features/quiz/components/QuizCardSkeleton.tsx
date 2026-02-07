export default function QuizCardSkeleton() {
  return (
    <div
      className="
        rounded-xl border border-border
        p-5 sm:p-6
        flex flex-col gap-4
        animate-pulse
        bg-white dark:bg-neutral-900
      "
    >
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className="h-9 w-9 rounded-md bg-muted" />

        <div className="flex-1 space-y-2">
          <div className="h-4 w-40 bg-muted rounded" />
          <div className="h-3 w-28 bg-muted rounded" />
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <div className="h-3 bg-muted rounded" />
        <div className="h-3 w-5/6 bg-muted rounded" />
      </div>

      {/* Footer */}
      <div className="pt-4 border-t border-border flex items-center justify-between">
        <div className="h-3 w-20 bg-muted rounded" />
        <div className="h-8 w-20 bg-muted rounded-md" />
      </div>
    </div>
  );
}
