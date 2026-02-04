import * as motion from "motion/react-client";
import type { JourneyStep } from "../types";
import {
  cardVariants,
  cardContainerStyle,
  splashStyle,
  cardStyle,
} from "../animations";

type Props = {
  step: JourneyStep;
  index: number;
};

export default function JourneyCard({ step, index }: Props) {
  return (
    <motion.div
      style={cardContainerStyle}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ amount: 0.8 }}
    >
      {/* Splash */}
      <div
        style={{
          ...splashStyle,
          background:
            "linear-gradient(306deg, rgba(0,0,0,0.15), rgba(0,0,0,0.05))",
        }}
        className="dark:[background:linear-gradient(306deg,#000,#0a0a0a)]"
      />

      <motion.div
        style={cardStyle}
        variants={cardVariants}
        className="
          rounded-xl p-6 text-center transition-all

          /* Light mode */
          bg-white text-neutral-900
          border border-neutral-200
          shadow-[4px_4px_0_rgba(0,0,0,0.15)]
          hover:shadow-[6px_6px_0_rgba(0,0,0,0.2)]

          /* Dark mode */
          dark:bg-neutral-900 dark:text-neutral-100
          dark:border-neutral-800
          dark:shadow-[4px_4px_0_#000]
          dark:hover:shadow-[6px_6px_0_#000]
        "
      >
        {/* Step number */}
        <div
          className="
            mb-8 w-10 h-10 flex items-center justify-center rounded-sm
            font-semibold

            bg-primary/90 text-white
            dark:bg-green-800
          "
        >
          {index + 1}
        </div>

        {/* Emoji */}
        <div className="text-4xl mb-4">{step.emoji}</div>

        {/* Description */}
        <p className="leading-relaxed text-sm sm:text-base font-bricolage
                      text-neutral-700 dark:text-neutral-200">
          {step.description}
        </p>
      </motion.div>
    </motion.div>
  );
}
