export default function ProjectCardSkeleton() {
  return (
    <div
      className="
        flex min-h-72 flex-col justify-between rounded-[1.75rem] border border-border
        bg-card p-6
        animate-pulse
        shadow-sm
      "
    >
      <div>
        <div className="mb-4 h-6 w-24 rounded-full bg-muted" />
        <div className="mb-4 h-6 w-3/4 rounded bg-muted" />

        <div className="h-4 w-40 rounded bg-muted" />
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3">
        <div className="h-20 rounded-2xl bg-muted" />
        <div className="h-20 rounded-2xl bg-muted" />
      </div>

      <div className="mt-6 h-11 w-full rounded-xl bg-muted" />
      <div className="mt-4 flex items-center justify-between">
        <div className="h-3 w-24 rounded bg-muted" />
      </div>
    </div>
  );
}
