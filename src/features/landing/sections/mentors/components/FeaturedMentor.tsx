import { motion } from "framer-motion";
import type { Mentor } from "../types";

export default function FeaturedMentor({ mentor }: { mentor: Mentor }) {
    console.log(mentor)
  return (
    <motion.div
      key={mentor.id}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative mt-14 rounded-3xl overflow-hidden bg-neutral-900"
    >
      <img
        src={mentor.photo}
        alt={mentor.name}
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      />

      <div className="relative z-10 p-10 grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-3xl font-semibold text-white">
            {mentor.name}
          </h3>
          <p className="mt-3 text-neutral-300 max-w-md">
            {mentor.qualification}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
