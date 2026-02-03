import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import type { Mentor } from "../types";

interface MentorCardProps {
  mentor: Mentor;
  index: number;
  isActive: boolean;
}

export default function MentorCard({
  mentor,
  isActive,
}: MentorCardProps) {
  return (
    <motion.div
      animate={{
        scale: isActive ? 1 : 0.94,
        opacity: isActive ? 1 : 0.6,
      }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
      className="h-full"
    >
      <Card
        className="
          relative h-[420px] overflow-hidden rounded-2xl

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
          className={`
            absolute inset-0 h-full w-full object-cover
            transition-transform duration-700
            ${isActive ? "scale-105" : "scale-100"}
          `}
        />

        {/* Gradient overlay */}
        <div
          className="
            absolute inset-0
            bg-gradient-to-t
            from-white/90 via-white/40 to-transparent
            dark:from-black/90 dark:via-black/40 dark:to-transparent
          "
        />

        {/* Content */}
        <CardContent className="relative z-10 flex h-full flex-col justify-end p-6">
          <h3 className="text-lg font-semibold">
            {mentor.name}
          </h3>
          <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300 line-clamp-2">
            {mentor.qualification}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
