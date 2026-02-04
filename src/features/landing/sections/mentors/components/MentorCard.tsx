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
        y: isActive ? -6 : 0,
        scale: isActive ? 1 : 0.96,
        opacity: isActive ? 1 : 0.55,
      }}
      transition={{ type: "spring", stiffness: 140, damping: 22 }}
      className="h-full"
    >
      <Card
        className="
          relative h-[420px] overflow-hidden rounded-2xl

          /* Light */
          bg-neutral-50 text-neutral-900
          shadow-sm

          /* Dark */
          dark:bg-neutral-900 dark:text-white
          dark:ring-1 dark:ring-neutral-800

          transition-shadow
        "
      >
        {/* Image */}
        <img
          src={mentor.photo}
          alt={mentor.name}
          className="
            absolute inset-0 h-full w-full object-cover
            grayscale-[30%]
            opacity-80
            transition-transform duration-700
            group-hover:scale-105
          "
        />

        {/* Soft overlay */}
        <div
          className="
            absolute inset-0
           
          "
        />

        {/* Content panel */}
        <CardContent
          className="
            relative z-10 mt-auto
            p-6

            backdrop-blur-md
            bg-primary/70

            dark:bg-primary/40
          "
        >
          <h3 className="text-lg ">
            {mentor.name}
          </h3>

          <p className="mt-1 font-sans text-sm text-white dark:text-white line-clamp-2">
            {mentor.qualification}
          </p>
        </CardContent>

        {/* Active highlight */}
        {isActive && (
          <div
            className="
              pointer-events-none absolute inset-0
              ring-2 ring-primary/40
              rounded-2xl
            "
          />
        )}
      </Card>
    </motion.div>
  );
}
