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
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
        {loading ? (
          <>
            <div className="w-16 h-16 bg-neutral-800 rounded-full mx-auto mb-4 animate-pulse" />
            <div className="h-4 w-32 bg-neutral-800 mx-auto mb-2 animate-pulse" />
            <div className="h-3 w-40 bg-neutral-800 mx-auto animate-pulse" />
          </>
        ) : (
          <>
            <div className="w-16 h-16 rounded-full bg-neutral-800 flex items-center justify-center text-xl font-semibold mx-auto mb-4">
              {initial}
            </div>

            <h3 className="text-center font-medium">
              {student?.name}
            </h3>

            <p className="text-center text-sm text-neutral-400 mb-6 break-all">
              {student?.email}
            </p>

            <CustomButton
              title="Logout"
              onClick={onLogout}
              className="w-full bg-neutral-800 hover:bg-neutral-700"
            />
          </>
        )}
      </div>
    </div>
  );
}
