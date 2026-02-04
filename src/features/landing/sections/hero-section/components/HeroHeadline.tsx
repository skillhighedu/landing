import { motion } from "framer-motion";
import Balancer from "react-wrap-balancer";
import { headlineContainer, wordAnim } from "../animations";

const heading = "Skills Build Futures. We Help You Build Them.";

export default function HeroHeadline() {
  return (
    <>
      <motion.h1
        variants={headlineContainer}
        initial="hidden"
        animate="show"
        className="
          text-3xl sm:text-4xl md:text-5xl lg:text-6xl
          pixel-shadow tracking-tight leading-tight
        "
      >
        <Balancer>
          {heading.split(" ").map((word, i) => (
            <motion.span
              key={i}
              variants={wordAnim}
              className="inline-block mr-2"
            >
              {word}
            </motion.span>
          ))}
        </Balancer>
      </motion.h1>

      <p className="mt-4 text-base sm:text-lg md:text-xl text-neutral-200 font-bricolage max-w-3xl mx-auto">
        <Balancer>
          SkillHigh helps you grow what matters — real skills, real projects, real outcomes.
        </Balancer>
      </p>
    </>
  );
}
