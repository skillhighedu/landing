export function CardSkeleton({ className = "" }) {
  return (
    <div className={`animate-pulse bg-neutral-700/50 rounded-lg ${className}`} />
  );
}
