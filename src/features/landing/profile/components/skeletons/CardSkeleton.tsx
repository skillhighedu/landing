export function CardSkeleton({ className = "" }) {
  return (
    <div className={`animate-pulse  bg-white-700/50 dark:bg-neutral-700/50 rounded-lg ${className}`} />
  );
}
