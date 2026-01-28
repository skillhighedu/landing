import Header from "@/components/common/Header";
import TestimonialsMarquee from "./components/TestimonialsMarquee";
import TestimonialsFooter from "./components/TestimonialsFooter";
import Container from "@/layouts/Container";

export default function TestimonialsSection() {
  return (
    <section className="bg-neutral-950 py-20 overflow-hidden">
      <Container size="full">
        <Header
          title="Loved by Many"
          subline="Their journey wasn’t easy. The right skills made the difference."
        />

        <TestimonialsMarquee />
        <TestimonialsFooter />
      </Container>
    </section>
  );
}
