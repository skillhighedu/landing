interface Props {
  name?: string;
  loading: boolean;
}

export default function ProfileHeader({ name, loading }: Props) {
  const firstName = name?.split(" ")[0] ?? "Student";

  return (
    <div className="mb-10">
      {loading ? (
        <div className="space-y-2">
          <div className="h-7 w-48 rounded bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
          <div className="h-4 w-72 rounded bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
        </div>
      ) : (
        <>
          <h1 className="text-2xl font-semibold text-neutral-900 dark:text-white">
            Account settings
          </h1>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            Manage your personal information and courses
          </p>
        </>
      )}
    </div>
  );
}
