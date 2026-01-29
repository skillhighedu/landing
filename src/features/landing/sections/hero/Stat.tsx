import { Counter } from "./Counter";
import { GridPatternDashed } from "@/components/ui/DashedStroke";
import { stats } from "./data/state";
import Container from "@/layouts/Container";

export default function StatsSection() {
  return (
    <section className="relative w-full py-20 bg-background text-foreground overflow-hidden">
      {/* Background pattern – full bleed */}
      <GridPatternDashed />

      <Container size="xl">
        {/* Badge */}
        <div className="text-center mb-8">
          <div
            className="
              inline-block text-sm sm:text-xl
              text-foreground/70
              border border-border
              rounded-xl px-4 py-2
              bg-card
              shadow-[4px_4px_0_#000] dark:shadow-[4px_4px_0_rgba(255,255,255,0.18)]
              hover:shadow-[6px_6px_0_#000] dark:hover:shadow-[6px_6px_0_rgba(255,255,255,0.22)]
              transition-shadow
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
                rounded-2xl py-6 px-4
                bg-card text-card-foreground
                border border-border
                shadow-[4px_4px_0_#000] dark:shadow-[4px_4px_0_rgba(255,255,255,0.18)]
                hover:shadow-[6px_6px_0_#000] dark:hover:shadow-[6px_6px_0_rgba(255,255,255,0.22)]
                transition-shadow
              "
            >
              <Counter to={stat.value} suffix={stat.suffix} color={stat.color} />
              <div className="text-sm text-card-foreground/70 mt-1 font-bricolage">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
