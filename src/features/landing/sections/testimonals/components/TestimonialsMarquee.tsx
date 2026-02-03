import { Marquee } from "@/components/magicui/marquee";
import { useTestimonialStore } from "@/store/testimonial.store";
import TestimonialCard from "./TestimonialCard";

export default function TestimonialsMarquee() {
  const testimonials = useTestimonialStore((s) => s.testimonials);

  if (!testimonials.length) {
    return (
      <p className="text-center mt-12 text-neutral-500 dark:text-neutral-400">
        Loading testimonials…
      </p>
    );
  }

  const half = Math.ceil(testimonials.length / 2);
  const first = testimonials.slice(0, half);
  const second = testimonials.slice(half);

  return (
    <div className="relative mt-14 flex h-[520px] w-full items-center justify-center overflow-hidden">
      <Marquee pauseOnHover vertical className="[--duration:28s]">
        {first.map((t) => (
          <TestimonialCard key={t.name} {...t} />
        ))}
      </Marquee>

      <Marquee
        reverse
        pauseOnHover
        vertical
        className="[--duration:28s] hidden sm:flex"
      >
        {second.map((t) => (
          <TestimonialCard key={t.name} {...t} />
        ))}
      </Marquee>
    </div>
  );
}
