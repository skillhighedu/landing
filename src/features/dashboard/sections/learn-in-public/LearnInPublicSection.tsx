import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  NotebookPen,
  Sparkles,
  Folder,
  TrendingUp,
  Lock,
} from "lucide-react";

import CustomButton from "@/components/common/Button";
import {
  WHY_LEARN_IN_PUBLIC,
  WHAT_TO_SHARE,
  BENEFITS,
} from "./LearnInPublicPoints";
import type { PlayGroundProps } from "@/types/dashboard/demo";

export default function LearnInPublicSection({ mode }: PlayGroundProps) {
  const isDemo = mode === "demo";

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="
        rounded-3xl
        border dark:border-neutral-800
        dark:bg-neutral-900
        px-6 py-10 md:px-10
        transition-colors
      "
    >
      <div className="mx-auto max-w-6xl grid gap-10 md:grid-cols-2">
        {/* LEFT */}
        <div className="space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-4 py-1 text-xs font-semibold text-primary">
            <NotebookPen size={14} />
            Learn in Public
          </span>

          <h2 className="text-2xl md:text-3xl text-primary dark:text-white">
            Turn daily learning into a visible portfolio
          </h2>

          <p className="text-sm font-sans text-neutral-800 dark:text-neutral-300 max-w-md">
            Log short learning updates directly on SkillHigh.
            Five minutes a day compounds into proof of consistency.
          </p>

          <ul className="space-y-3 text-sm font-sans text-primary dark:text-neutral-200">
            {WHY_LEARN_IN_PUBLIC.map((item) => (
              <li key={item} className="flex gap-3">
                <Sparkles size={16} className="mt-0.5 text-primary" />
                {item}
              </li>
            ))}
          </ul>

          {/* LEFT BUTTON */}
          {isDemo ? (
            <CustomButton
              disabled
              title=" Start logging"
              icon={ <Lock size={16} />}
              className="
                rounded-lg
                flex items-center gap-2
                opacity-60 cursor-not-allowed
              "
            >
             
             
            </CustomButton>
          ) : (
            <Link to="/learn-in-public">
              <CustomButton title="   Start logging" className="rounded-lg">
             
              </CustomButton>
            </Link>
          )}
        </div>

        {/* RIGHT — WHITE SLOT */}
        <div
          className="
            rounded-2xl
            bg-white font-sans text-neutral-900
            dark:bg-neutral-800 dark:text-neutral-100
            border border-neutral-200 dark:border-neutral-700
            p-6 space-y-6
            transition-colors
          "
        >
          <FeatureList
            title="What to share"
            items={WHAT_TO_SHARE}
            icon={Folder}
          />

          <FeatureList
            title="Why it helps"
            items={BENEFITS}
            icon={TrendingUp}
          />

          {/* CTA SLOT */}
          <div
            className="
              rounded-xl
              bg-neutral-100
              dark:bg-neutral-900
              p-4
              flex items-center justify-between
            "
          >
            <div>
              <p className="text-xs uppercase tracking-widest opacity-60">
                New
              </p>
              <p className="text-sm font-medium">
                Optimized for X & LinkedIn
              </p>
            </div>

            {isDemo ? (
              <CustomButton
                disabled
                title=" Log today"
                icon={ <Lock size={16} />}
                className="
                  flex items-center gap-2
                  bg-neutral-300 text-neutral-700
                  dark:bg-neutral-700 dark:text-neutral-300
                  cursor-not-allowed
                "
              >
              
               
              </CustomButton>
            ) : (
              <Link to="/learn-in-public">
                <CustomButton
                title=" Log today"
                  className="
                    bg-black text-white hover:bg-neutral-800
                    dark:bg-white dark:text-black
                  "
                >
                 
                </CustomButton>
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function FeatureList({
  title,
  items,
  icon: Icon,
}: {
  title: string;
  items: string[];
  icon: React.ElementType;
}) {
  return (
    <div>
      <p className="text-xs uppercase tracking-widest opacity-60">
        {title}
      </p>
      <ul className="mt-3 space-y-3 text-sm">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <Icon size={14} className="mt-0.5 text-primary" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
