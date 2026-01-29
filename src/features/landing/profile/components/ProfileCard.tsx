import { motion } from "framer-motion";
import CustomButton from "@/components/common/Button";
import { AvatarSkeleton } from "./skeletons/AvatarSkeleton";
import { TextSkeleton } from "./skeletons/TextSkeleton";
import type { Student } from "../types";

interface Props {
  student?: Student;
  loading: boolean;
  onLogout: () => void;
}

export default function ProfileCard({ student, loading, onLogout }: Props) {
  const initial = student?.name?.[0] ?? "S";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-neutral-900 border border-neutral-700 rounded-2xl p-6 text-center"
    >
      {loading ? (
        <>
          <AvatarSkeleton />
          <TextSkeleton width="w-32" />
          <TextSkeleton width="w-40" />
        </>
      ) : (
        <>
          <div className="w-28 h-28 mx-auto rounded-full bg-lime-400/20 flex items-center justify-center text-3xl font-bold text-white mb-4">
            {initial}
          </div>
          <h2 className="text-xl font-semibold">{student?.name}</h2>
          <p className="text-neutral-400">{student?.email}</p>
          <CustomButton
            title="Logout"
            onClick={onLogout}
            className="mt-6 bg-red-500 hover:bg-red-600 w-full"
          />
        </>
      )}
    </motion.div>
  );
}
