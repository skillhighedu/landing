import Header from "@/components/common/Header";
import MentorsCarousel from "./MentorsCarousel";
import MentorsCTA from "./MentorsCTA";
import { useMentors } from "../hooks/useMentors";
import Container from "@/layouts/Container";

export default function MentorsSection() {
  const { data: mentors = [], isLoading } = useMentors();

  return (
    <section className="w-full bg-background text-foreground bg-pixel-crt py-16">
      <Container size="xl">
        <div className="text-center">
          <div className="mb-12 flex flex-col gap-3">
            <Header
              title="Learn from Those Who’ve Done It"
              subline="Your mentors once started just like you. They’ve built real skills — now they’re here to help you do the same"
            />
          </div>

          {isLoading ? (
            <div className="py-20 text-foreground/70">
              Loading mentors...
            </div>
          ) : (
            <MentorsCarousel mentors={mentors} />
          )}

          <MentorsCTA />
        </div>
      </Container>
    </section>
  );
}
