import Header from "@/components/common/Header";
import Container from "@/layouts/Container";
import ComparisonTable from "./components/ComparisonTable";
import { comparisonData } from "./data";

export default function ComparisonSection() {
  return (
    <section
      className="
        py-24

        /* Light */
        bg-neutral-50 text-neutral-900

        /* Dark */
        dark:bg-neutral-950 dark:text-white
      "
    >
      <Container size="xl">
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <Header
            title="Why SkillHigh is Different"
            subline="Most platforms teach topics. SkillHigh helps you build real products, from start to finish."
          />
        </div>

        <ComparisonTable items={comparisonData} />
      </Container>
    </section>
  );
}
