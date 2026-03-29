import { motion } from "framer-motion";

interface ProfileHeroProps {
  name?: string;
  loading: boolean;
}

const Skeleton = ({ className }: { className?: string }) => (
  <div className={`animate-pulse rounded-2xl bg-neutral-700/50 ${className}`}></div>
);

export default function ProfileHero({ name, loading }: ProfileHeroProps) {
  const firstName = name?.split(" ")[0] || "Student";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-linear-to-r from-neutral-900 via-zinc-800 to-neutral-900 p-8 mt-6 rounded-2xl shadow-xl mb-12 text-center mx-auto border border-neutral-700"
    >
      {loading ? (
        <div className="mx-auto flex max-w-3xl flex-col items-center">
          <Skeleton className="mb-3 h-12 w-64 sm:h-14 sm:w-80" />
          <Skeleton className="h-5 w-56 sm:w-72" />
        </div>
      ) : (
        <h1 className="text-2xl sm:text-5xl mb-3 text-primary">
          Welcome Back, {firstName}
        </h1>
      )}
      {loading ? (
        <div className="mx-auto mt-4 space-y-3">
          <Skeleton className="h-4 w-72 sm:w-[32rem]" />
          <Skeleton className="h-4 w-56 sm:w-80" />
        </div>
      ) : (
        <p className="text-md sm:text-xl text-gray-100 font-bricolage max-w-2xl mx-auto">
          Your skills are battle-ready. Sharpen your expertise and conquer the digital realm.
        </p>
      )}
    </motion.div>
  );
}
