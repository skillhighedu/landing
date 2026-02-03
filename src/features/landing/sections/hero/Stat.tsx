import { Counter } from "./Counter";
import { GridPatternDashed } from "@/components/ui/DashedStroke";
import { stats } from "./data/state";
import Container from "@/layouts/Container";

export default function StatsSection() {
  return (
    <section
      className="
        relative w-full py-20 overflow-hidden

        /* Light mode */
        bg-neutral-50 text-neutral-900

        /* Dark mode */
        dark:bg-neutral-950 dark:text-white
      "
    >
      {/* Background pattern – full bleed */}
      <GridPatternDashed />

      {/* Content container */}
      <Container size="xl">
        {/* Badge */}
        <div className="text-center mb-8">
          <div
            className="
              inline-block px-4 py-2 rounded-xl text-sm sm:text-lg
              font-medium transition-shadow

              /* Light mode */
              bg-white text-neutral-700
              border border-neutral-200
              shadow-[4px_4px_0_rgba(0,0,0,0.15)]
              hover:shadow-[6px_6px_0_rgba(0,0,0,0.2)]

              /* Dark mode */
              dark:bg-neutral-900 dark:text-neutral-300
              dark:border-neutral-800
              dark:shadow-[4px_4px_0_#000]
              dark:hover:shadow-[6px_6px_0_#000]
            "
          >
            Join our Skillhigh community
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 text-center">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="
                rounded-2xl py-6 px-4 transition-shadow

                /* Light mode */
                bg-white text-neutral-900
                border border-neutral-200
                shadow-[4px_4px_0_rgba(0,0,0,0.15)]
                hover:shadow-[6px_6px_0_rgba(0,0,0,0.2)]

                /* Dark mode */
                dark:bg-neutral-900 dark:text-white
                dark:border-neutral-800
                dark:shadow-[4px_4px_0_#000]
                dark:hover:shadow-[6px_6px_0_#000]
              "
            >
              <Counter
                to={stat.value}
                suffix={stat.suffix}
                color={stat.color}
              />

              <div className="mt-1 text-sm font-bricolage text-neutral-600 dark:text-neutral-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
