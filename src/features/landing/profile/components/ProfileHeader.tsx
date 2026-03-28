interface Props {
  name?: string;
  courseCount?: number;
  loading: boolean;
}

export default function ProfileHeader({ name, courseCount = 0, loading }: Props) {
  return (
    <div className="mb-10 rounded-[28px] border border-neutral-200 bg-gradient-to-r from-neutral-50 via-white to-white p-6 shadow-sm dark:border-neutral-800 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-950">
      {loading ? (
        <div className="space-y-2">
          <div className="h-7 w-48 rounded bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
          <div className="h-4 w-72 rounded bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
        </div>
      ) : (
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">
              Student Profile
            </p>
            <h1 className="mt-2 text-md sm:text-3xl  text-neutral-900 dark:text-white">
              {name ? `${name}'s learning space` : "Your learning space"}
            </h1>
            <p className="mt-2 text-sm font-mono text-neutral-500 dark:text-neutral-400">
              Manage your personal information, review enrolled courses, and jump back into learning quickly.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:w-fit">
            <div className="rounded-2xl border border-neutral-200 bg-white/80 px-4 py-3 dark:border-neutral-800 dark:bg-neutral-900/80">
              <p className="text-xs uppercase tracking-[0.18em] text-neutral-500 dark:text-neutral-400">
                Courses
              </p>
              <p className="mt-2 text-2xl font-semibold text-neutral-900 dark:text-white">
                {courseCount}
              </p>
            </div>
            <div className="rounded-2xl border border-neutral-200 bg-white/80 px-4 py-3 dark:border-neutral-800 dark:bg-neutral-900/80">
              <p className="text-xs uppercase tracking-[0.18em] text-neutral-500 dark:text-neutral-400">
                Status
              </p>
              <p className="mt-2 text-sm  text-emerald-600 dark:text-emerald-400">
                Active learner
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
