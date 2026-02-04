import CustomButton from "@/components/common/Button";

interface Props {
  student?: any;
  loading: boolean;
  onLogout: () => void;
}

export default function ProfileSidebar({ student, loading, onLogout }: Props) {
  const initial = student?.name?.[0] ?? "S";

  return (
    <div className="sticky top-24">
      <div
        className="
          rounded-xl p-6
          bg-white dark:bg-neutral-900
          border border-neutral-200 dark:border-neutral-800
        "
      >
        {loading ? (
          <>
            <div className="w-16 h-16 rounded-full mx-auto mb-4 animate-pulse bg-neutral-200 dark:bg-neutral-800" />
            <div className="h-4 w-32 mx-auto mb-2 animate-pulse bg-neutral-200 dark:bg-neutral-800" />
            <div className="h-3 w-40 mx-auto animate-pulse bg-neutral-200 dark:bg-neutral-800" />
          </>
        ) : (
          <>
            {/* Avatar */}
            <div
              className="
                w-16 h-16 mx-auto mb-4 rounded-full
                flex items-center justify-center
                text-xl font-semibold
                bg-neutral-200 text-neutral-900
                dark:bg-neutral-800 dark:text-white
              "
            >
              {initial}
            </div>

            <h3 className="text-center font-medium text-neutral-900 dark:text-white">
              {student?.name}
            </h3>

            <p className="text-center text-sm text-neutral-500 dark:text-neutral-400 mb-6 break-all">
              {student?.email}
            </p>

            <CustomButton
              title="Logout"
              onClick={onLogout}
              className="
                w-full
                bg-neutral-900 text-white
                hover:bg-neutral-800
                dark:bg-neutral-800 dark:hover:bg-neutral-700
              "
            />
          </>
        )}
      </div>
    </div>
  );
}
