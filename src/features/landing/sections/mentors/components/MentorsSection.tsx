import Header from "@/components/common/Header";
import MentorsCarousel from "./MentorsCarousel";
import MentorsCTA from "./MentorsCTA";
import { useMentors } from "../hooks/useMentors";
import Container from "@/layouts/Container";

export default function MentorsSection() {
  const { data: mentors = [], isLoading } = useMentors();

  return (
    <section
      className="
        w-full py-16

        /* Light */
        bg-neutral-50 text-neutral-900

        /* Dark */
        dark:bg-neutral-900 dark:text-white
        dark:bg-pixel-crt
      "
    >
      <Container size="xl">
        <div className="text-center">
          <div className="mb-12 flex flex-col gap-3">
            <Header
              title="Learn from Those Who’ve Done It"
              subline="Your mentors once started just like you. They’ve built real skills — now they’re here to help you do the same"
            />
          </div>

          {isLoading ? (
            <div className="py-20 text-sm text-neutral-500 dark:text-neutral-400">
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
