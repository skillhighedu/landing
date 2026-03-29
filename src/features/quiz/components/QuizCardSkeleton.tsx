export default function QuizCardSkeleton() {
  return (
    <div
      className="
        flex flex-col gap-5 rounded-[1.75rem] border border-border
        p-5 sm:p-6
        animate-pulse
        bg-white shadow-sm dark:bg-neutral-900
      "
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="h-11 w-11 rounded-2xl bg-muted" />

          <div className="flex-1 space-y-3">
            <div className="h-6 w-24 rounded-full bg-muted" />
            <div className="h-4 w-40 rounded bg-muted" />
          </div>
        </div>

        <div className="h-6 w-16 rounded-full bg-muted" />
      </div>

      <div className="space-y-2">
        <div className="h-3 rounded bg-muted" />
        <div className="h-3 w-5/6 rounded bg-muted" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="h-20 rounded-2xl bg-muted" />
        <div className="h-20 rounded-2xl bg-muted" />
      </div>

      <div className="flex items-center justify-between border-t border-border pt-5">
        <div className="h-3 w-28 rounded bg-muted" />
        <div className="h-10 w-28 rounded-xl bg-muted" />
      </div>
    </div>
  );
}
