export default function CourseCardSkeleton() {
  return (
    <div
      className="
        relative
        h-[420px]
        overflow-hidden
        rounded-2xl
        bg-neutral-900
        shadow-[4px_4px_0_#000]
      "
    >
      {/* ================= IMAGE / BANNER SKELETON ================= */}
      <div className="absolute inset-0 bg-white/5" />

      {/* ================= SHINE SWEEP ================= */}
      <span
        className="
          pointer-events-none
          absolute top-0 left-[-60%]
          h-full w-[40%]
          bg-gradient-to-r
          from-transparent via-white/15 to-transparent
          skew-x-[-20deg]
          animate-[skeleton-shine_2.8s_linear_infinite]
          will-change-transform
        "
      />

      {/* ================= DARK OVERLAY ================= */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

      {/* ================= CONTENT SKELETON ================= */}
      <div className="absolute bottom-0 z-10 w-full p-5 space-y-3">
        <div className="h-5 w-3/4 rounded bg-white/10 animate-pulse" />
        <div className="h-4 w-full rounded bg-white/10 animate-pulse" />
        <div className="h-4 w-5/6 rounded bg-white/10 animate-pulse" />

        <div className="mt-4 h-9 w-32 rounded bg-white/10 animate-pulse" />
      </div>
    </div>
  );
}
