import { motion } from "framer-motion";

interface ProfileHeroProps {
  name?: string;
  loading: boolean;
}

const Skeleton = ({ className }: { className?: string }) => (
  <div className={`animate-pulse bg-neutral-700/50 ${className}`}></div>
);

export default function ProfileHero({ name, loading }: ProfileHeroProps) {
  const firstName = name?.split(" ")[0] || "Student";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-r from-neutral-900 via-zinc-800 to-neutral-900 p-8 mt-6 rounded-2xl shadow-xl mb-12 text-center mx-auto border border-neutral-700"
    >
      {loading ? (
        <Skeleton className="h-12 w-60 mx-auto mb-3 rounded-md" />
      ) : (
        <h1 className="text-2xl sm:text-5xl mb-3 text-primary">
          Welcome Back, {firstName}
        </h1>
      )}
      {loading ? (
        <Skeleton className="h-6 w-80 mx-auto rounded-md" />
      ) : (
        <p className="text-md sm:text-xl text-gray-100 font-bricolage max-w-2xl mx-auto">
          Your skills are battle-ready. Sharpen your expertise and conquer the digital realm.
        </p>
      )}
    </motion.div>
  );
}
