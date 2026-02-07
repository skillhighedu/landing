import { Card } from "@/components/ui/card";

export default function HeaderCard() {
  return (
    <Card className="p-10 relative overflow-hidden border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
      {/* Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.08),transparent_50%)] pointer-events-none" />

      <div className="relative space-y-5 text-center">
        <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-green-600 text-white text-xs tracking-[0.2em] uppercase">
          Learn In Public
        </span>

        <h1 className="text-4xl tracking-tight text-neutral-900 dark:text-white">
          Show your work. Show your progress.
        </h1>

        <p className="text-base text-neutral-600 dark:text-neutral-300 mx-auto max-w-2xl">
          Log what you build, fix, or learn. These small updates compound into
          proof of skill, discipline, and direction.
        </p>
      </div>
    </Card>
  );
}
