import { motion } from "framer-motion";
import CustomButton from "@/components/common/Button";;

interface Student {
  name?: string;
  email?: string;
}

interface ProfileCardProps {
  student?: Student;
  loading: boolean;
  onLogout: () => void;
}

const Skeleton = ({ className }: { className?: string }) => (
  <div className={`animate-pulse rounded-2xl bg-neutral-700/50 ${className}`}></div>
);

export default function ProfileCard({ student, loading, onLogout }: ProfileCardProps) {
  const initial = student?.name?.[0] || "S";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="col-span-1 bg-neutral-900 p-6 rounded-2xl shadow-xl border border-neutral-700 flex flex-col items-center text-center"
    >
      {loading ? (
        <>
          <Skeleton className="mb-4 h-28 w-28 rounded-full" />
          <Skeleton className="mb-2 h-6 w-40" />
          <Skeleton className="h-4 w-32" />
          <div className="mt-6 w-full space-y-3">
            <Skeleton className="h-11 w-full rounded-xl" />
            <Skeleton className="h-11 w-full rounded-xl" />
          </div>
        </>
      ) : (
        <>
          <div className="relative w-28 h-28 flex items-center justify-center mb-4">
            <div className="w-28 h-28 rounded-full bg-lime-400/20 flex items-center justify-center text-3xl font-bold text-white">
              {initial}
            </div>
          </div>
          <h2 className="text-2xl font-semibold">{student?.name}</h2>
          <p className="text-gray-400 font-sans">{student?.email}</p>
          <CustomButton
            onClick={onLogout}
            icon=""
            title="Logout"
            className="mt-6 bg-red-500 hover:bg-red-700 w-full sm:w-auto"
          />
        </>
      )}
    </motion.div>
  );
}
