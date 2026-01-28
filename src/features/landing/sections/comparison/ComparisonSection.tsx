import Header from "@/components/common/Header";
import Container from "@/layouts/Container";
import ComparisonTable from "./components/ComparisonTable";
import { comparisonData } from "./data";

export default function ComparisonSection() {
  return (
    <section className="bg-neutral-950 py-24">
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
