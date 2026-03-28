
export default function PendingBadge({ count }: { count: number }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700 shadow-sm dark:border-amber-800 dark:bg-amber-950/20 dark:text-amber-400">
      <span className="relative flex h-1.5 w-1.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-500" />
      </span>
      {count} pending
    </span>
  );
}

