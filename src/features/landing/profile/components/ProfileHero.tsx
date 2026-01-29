interface Props {
  name?: string;
  loading: boolean;
}

export default function ProfileHeader({ name, loading }: Props) {
  return (
    <div className="mb-8">
      {loading ? (
        <div className="h-7 w-48 bg-neutral-800 animate-pulse rounded" />
      ) : (
        <>
          <h1 className="text-2xl font-semibold text-white">
            Account settings
          </h1>
          <p className="text-neutral-400 mt-1">
            Manage your personal information and courses
          </p>
        </>
      )}
    </div>
  );
}
