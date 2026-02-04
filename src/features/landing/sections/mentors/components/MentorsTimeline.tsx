import { motion } from "framer-motion";
import type { Mentor } from "../types";

export default function MentorsTimeline({ mentors }: { mentors: Mentor[] }) {
  return (
    <div className="mt-16 space-y-12">
      {mentors.map((mentor, index) => (
        <motion.div
          key={mentor.id}
          initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-2 gap-8 items-center"
        >
          <img
            src={mentor.photo}
            className="rounded-2xl w-full h-[280px] object-cover"
          />

          <div>
            <h3 className="text-2xl font-semibold text-white">
              {mentor.name}
            </h3>
            <p className="text-neutral-400 mt-2">
              {mentor.qualification}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
