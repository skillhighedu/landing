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
      <div
        style={{ ...splashStyle, background: "linear-gradient(306deg, #000, #0a0a0a)" }}
      />

      <motion.div
        style={cardStyle}
        variants={cardVariants}
        className="bg-neutral-900 pixel-border shadow-[4px_4px_0_#000] hover:shadow-[6px_6px_0_#000]"
      >
        <div className="bg-green-800 w-10 h-10 rounded-sm text-white mb-8 flex items-center justify-center pixel-border">
          {index + 1}
        </div>

        <div className="text-4xl mb-4 text-primary">{step.emoji}</div>

        <p className="text-neutral-100 leading-relaxed text-center font-bricolage">
          {step.description}
        </p>
      </motion.div>
    </motion.div>
  );
}
