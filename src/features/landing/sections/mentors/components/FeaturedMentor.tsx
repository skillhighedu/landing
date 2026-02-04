import { motion } from "framer-motion";
import type { Mentor } from "../types";

export default function FeaturedMentor({ mentor }: { mentor: Mentor }) {
  return (
    <motion.div
      key={mentor.id}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="
        relative mt-14 rounded-3xl overflow-hidden

        /* Light */
        bg-white text-neutral-900
        border border-neutral-200

        /* Dark */
        dark:bg-neutral-900 dark:text-white
        dark:border-neutral-800
      "
    >
      <img
        src={mentor.photo}
        alt={mentor.name}
        className="
          absolute inset-0 w-full h-full object-cover
          opacity-30 dark:opacity-40
        "
      />

      {/* Overlay */}
      <div
        className="
          absolute inset-0
          bg-gradient-to-r
          from-white/90 via-white/70 to-transparent
          dark:from-black/80 dark:via-black/50 dark:to-transparent
        "
      />

      <div className="relative z-10 p-10 grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-3xl font-semibold">
            {mentor.name}
          </h3>
          <p className="mt-3 max-w-md text-neutral-600 dark:text-neutral-300">
            {mentor.qualification}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
