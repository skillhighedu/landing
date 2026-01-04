import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import CustomButton from "@/components/common/Button";;
import { NotebookPen, Sparkles, Folder, TrendingUp } from "lucide-react";

const learnInPublicBullets = [
  "Log a short update after each study session to cement the lesson.",
  "Share blockers, fixes, or wins so others can follow your roadmap.",
  "Build an authentic proof-of-work timeline employers can skim.",
];

const shareIdeas = [
  "What you built or debugged today",
  "A new concept or API you explored",
  "Next action you are planning tomorrow",
];

const helpBenefits = [
  "Makes progress visible even when certificates are pending",
  "Attracts collaborators and accountability buddies",
  "Turns your curiosity into a searchable knowledge base",
];


export default function LearnInPublic() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3, ease: "easeInOut" }}
      className="bg-neutral-900 border border-neutral-700 rounded-2xl shadow-lg p-6 md:p-8"
    >
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold tracking-[0.3em] uppercase">
            <NotebookPen size={16} /> Learn In Public
          </div>
          <h2 className="text-2xl font-bold text-white">
            Turn daily lessons into a visible portfolio
          </h2>
          <p className="text-sm text-gray-300">
            Share short progress notes on SkillHigh social channels with
            built-in hashtags and mentions. Consistency compounds even if you
            only have five minutes.
          </p>
          <ul className="space-y-3 text-sm text-gray-200 font-normal">
            {learnInPublicBullets.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <Sparkles className="mt-1 h-4 w-4 text-white" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-3">
            <Link to="/learn-in-public">
              <CustomButton 
                title="Go to Learn In Public"
                className="rounded-lg text-white flex items-center gap-2"
              >
                <NotebookPen size={16} />
                Go to Learn In Public
              </CustomButton>
            </Link>

            <blockquote className="w-full text-sm italic text-gray-300 border-l-4 mt-2 border-white/40 pl-4">
              "People learn quietly all the time. But the ones who show their
              process get the invites, the mentorship, the opportunities."
            </blockquote>
          </div>
        </div>

        <div className="bg-neutral-800 rounded-xl border border-neutral-700 p-6 space-y-6 shadow-inner">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-gray-400">
              What to share
            </p>
            <ul className="mt-3 space-y-3 text-sm text-gray-200 font-normal">
              {shareIdeas.map((idea) => (
                <li key={idea} className="flex items-start gap-2">
                  <Folder className="mt-0.5 h-4 w-4 text-white" />
                  {idea}
                </li>
              ))}
            </ul>
          </div>
          <div className="border-t border-dashed border-gray-700 pt-4">
            <p className="text-xs uppercase tracking-[0.4em] text-gray-400">
              How it helps
            </p>
            <ul className="mt-3 space-y-3 text-sm text-gray-200 font-normal">
              {helpBenefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-2">
                  <TrendingUp className="mt-0.5 h-4 w-4 text-white" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl bg-neutral-950 text-white p-4 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] opacity-70">
                New
              </p>
              <p className="text-lg ">For X & LinkedIn</p>
            </div>
            <Link to="/learn-in-public">
              <CustomButton
                title="Log today"
                className="bg-white text-slate-900 rounded-lg hover:bg-gray-100"
              >
                Log today
              </CustomButton>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}