
export default function StatCard({
  value,
  label,
  accent = false,
}: {
  value: number;
  label: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`flex flex-col gap-1 rounded-[26px] border px-5 py-4 font-mono shadow-sm transition-colors ${
        accent
          ? "border-amber-200 bg-amber-50/70 dark:border-amber-800 dark:bg-amber-950/20"
          : "border-border bg-card/85 backdrop-blur"
      }`}
    >
      <span
        className={`text-2xl font-bold tabular-nums ${
          accent ? "text-amber-700 dark:text-amber-400" : "text-foreground"
        }`}
      >
        {value}
      </span>
      <span className="text-xs leading-tight text-muted-foreground">{label}</span>
    </div>
  );
}

