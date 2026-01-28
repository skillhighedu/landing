import { Counter } from "./Counter";
import { GridPatternDashed } from "@/components/ui/DashedStroke";
import { stats } from "./data/state";
import Container from "@/layouts/Container";

export default function StatsSection() {
  return (
    <section className="relative w-full py-20 bg-neutral-950 text-white overflow-hidden">
      {/* Background pattern – full bleed */}
      <GridPatternDashed />

      {/* Content container */}
      <Container size="xl">
        {/* Badge */}
        <div className="text-center mb-8">
          <div className="inline-block text-sm sm:text-xl text-neutral-400 border border-neutral-800 rounded-xl px-4 py-2 bg-neutral-900 shadow-[4px_4px_0_#000] hover:shadow-[6px_6px_0_#000] transition-shadow">
            Join our Skillhigh community
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 text-center">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-neutral-900 rounded-2xl py-6 px-4 border border-neutral-800 pixel-border shadow-[4px_4px_0_#000] hover:shadow-[6px_6px_0_#000]"
            >
              <Counter
                to={stat.value}
                suffix={stat.suffix}
                color={stat.color}
              />
              <div className="text-sm text-neutral-400 mt-1 font-bricolage">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
