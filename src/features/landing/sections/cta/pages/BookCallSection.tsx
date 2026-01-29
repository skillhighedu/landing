import Container from "@/layouts/Container";
import BookCallCard from "../components/BookCallCard";
import { bookCallData } from "../data";

export default function BookCallSection() {
  return (
    <section className="py-6 bg-background text-foreground">
      <Container size="full">
        <BookCallCard {...bookCallData} />
      </Container>
    </section>
  );
}
