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
            "linear-gradient(306deg, rgba(0,0,0,0.08), rgba(0,0,0,0.02))",
        }}
        className="dark:opacity-50"
      />

      <motion.div
        style={cardStyle}
        variants={cardVariants}
        className="
          bg-card text-card-foreground
          border border-border
          shadow-[4px_4px_0_#000] dark:shadow-[4px_4px_0_rgba(255,255,255,0.18)]
          hover:shadow-[6px_6px_0_#000] dark:hover:shadow-[6px_6px_0_rgba(255,255,255,0.22)]
          transition-shadow
        "
      >
        {/* Step number */}
        <div
          className="
            w-10 h-10 rounded-sm mb-8
            flex items-center justify-center
            bg-primary text-primary-foreground
            border border-border
            font-semibold
          "
        >
          {index + 1}
        </div>

        <div className="text-4xl mb-4 text-primary">{step.emoji}</div>

        <p className="text-card-foreground/80 leading-relaxed text-center font-bricolage">
          {step.description}
        </p>
      </motion.div>
    </motion.div>
  );
}
