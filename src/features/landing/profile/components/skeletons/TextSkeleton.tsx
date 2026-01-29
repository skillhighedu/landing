export function TextSkeleton({ width = "w-40", height = "h-4" }) {
  return (
    <div className={`bg-neutral-700/50 animate-pulse rounded ${width} ${height}`} />
  );
}