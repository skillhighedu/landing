export default function ProjectCardSkeleton() {
  return (
    <div
      className="
        rounded-3xl border border-border
        bg-card
        p-7
        min-h-60
        flex flex-col justify-between
        animate-pulse
      "
    >
      {/* Top */}
      <div>
        <div className="h-6 w-3/4 bg-muted rounded mb-4" />

        <div className="h-4 w-40 bg-muted rounded" />
      </div>

      {/* Bottom */}
      <div className="flex items-center justify-between mt-8">
        <div className="h-6 w-20 bg-muted rounded-full" />

        <div className="h-10 w-32 bg-muted rounded-xl" />
      </div>
    </div>
  );
}
