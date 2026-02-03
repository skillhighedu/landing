'use client';

import Header from "@/components/common/Header";
import JourneyCard from "../components/JourneyCard";
import { journeySteps } from "../data";

export default function LearningJourneySection() {
  return (
    <section
      className="
        relative w-full overflow-hidden
        py-20 sm:py-32

        /* Light mode */
        bg-neutral-50
        bg-[radial-gradient(rgba(0,0,0,0.08)_1px,transparent_0)]
        [background-size:12px_12px]

        /* Dark mode */
        dark:bg-neutral-900
        dark:bg-[radial-gradient(#3d3d3d_1px,transparent_0)]
      "
    >
      <div className="text-center mb-16">
        <Header
          title="From Beginner to Pro"
          subline="See how each step takes you closer to mastery."
        />
      </div>

      <div className="mx-auto max-w-[500px] w-full">
        {journeySteps.map((step, index) => (
          <JourneyCard key={step.id} step={step} index={index} />
        ))}
      </div>
    </section>
  );
}
