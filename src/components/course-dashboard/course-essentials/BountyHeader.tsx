import { motion } from "framer-motion";
import { BadgeDollarSign, Target, Trophy, Info } from "lucide-react";

export default function BountyHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center max-w-3xl mx-auto mb-10"
    >
      <h1 className="text-4xl font-normal text-green-500 mb-4">
        Skill-Based Bounties
      </h1>
      <p className="text-lg text-gray-300 font-normal">
        Take on real-world challenges, apply your skills, and earn exciting
        rewards.
      </p>

      <div className="mt-6 flex flex-wrap justify-center gap-4">
        {[
          {
            icon: <BadgeDollarSign size={18} />,
            label: "Get Paid for Your Skills",
            bg: "bg-green-600/20 text-green-400 border border-green-500/30",
          },
          {
            icon: <Target size={18} />,
            label: "Apply What You Learn",
            bg: "bg-purple-600/20 text-purple-400 border border-purple-500/30",
          },
          {
            icon: <Trophy size={18} />,
            label: "Stand Out with Real Work",
            bg: "bg-yellow-600/20 text-yellow-400 border border-yellow-500/30",
          },
        ].map((item, idx) => (
          <span
            key={idx}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-normal ${item.bg}`}
          >
            {item.icon} {item.label}
          </span>
        ))}
      </div>

      {/* Rules Section */}
      <div className="mt-10 bg-neutral-800 border border-neutral-700 p-6 rounded-xl shadow text-left">
        <h2 className="text-2xl font-normal text-green-500 mb-4 flex items-center gap-2">
          <Info size={20} /> Rules & Guidelines
        </h2>
        <ul className="list-disc pl-6 text-sm text-gray-300 font-normal space-y-2">
          <li>Only apply if you can complete the task by the deadline.</li>
          <li>
            Submissions must be your own work and include proper references.
          </li>
          <li>
            Plagiarism or AI-only generated content will lead to
            disqualification.
          </li>
          <li>Submissions will be reviewed within 5 working days.</li>
        </ul>
      </div>
    </motion.div>
  );
}
