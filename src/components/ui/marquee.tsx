import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";
import { Linkedin } from "lucide-react";
import { useTestimonialStore } from "@/store/testimonial.store";


const ReviewCard = ({
  name,
  link,
  review,
}: {
  name: string;
  link: string;
  review: string;
}) => {
  return (
  <figure
  className={cn(
    "relative h-full w-fit sm:w-full cursor-pointer overflow-hidden",
    "rounded-xl pixel-border border border-gray-800 bg-neutral-900/90",
    "shadow-[4px_4px_0_#000] hover:shadow-[6px_6px_0_#000] transition-all duration-300",
    "p-5 flex flex-col justify-between"
  )}
>
  {/* Header: Name + LinkedIn */}
  <div className="flex items-center justify-between mb-3">
    <figcaption className="text-base   text-primary truncate">
      {name}
    </figcaption>
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${name}'s LinkedIn profile`}
      className="p-1 rounded-full bg-neutral-700 hover:bg-blue-500/20 transition-colors"
    >
      <Linkedin size={18} className="text-blue-400 hover:text-blue-300" />
    </a>
  </div>

  {/* Review Text */}
  <blockquote className="text-sm leading-relaxed text-gray-300 relative font-bricolage ">
    <span className="absolute -left-3 top-0 text-primary text-lg font-bricolage ">“</span>
    {review}
    <span className="absolute -right-3 bottom-0 text-primary text-lg">”</span>
  </blockquote>
</figure>

  );
};

export function MarqueeDemoVertical() {
  const testimonials = useTestimonialStore((state) => state.testimonials);

  if (!testimonials.length) {
    return <p className="text-center text-gray-400">Loading testimonials...</p>;
  }

  const half = Math.ceil(testimonials.length / 2);
  const firstRow = testimonials.slice(0, half);
  const secondRow = testimonials.slice(half);

  return (
    <div className="relative flex h-[500px] w-full flex-row items-center justify-center overflow-hidden">
      <Marquee pauseOnHover vertical className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.name} {...review} />
        ))}
      </Marquee>
      <Marquee
        reverse
        pauseOnHover
        vertical
        className="[--duration:20s] hidden sm:flex"
      >
        {secondRow.map((review) => (
          <ReviewCard key={review.name} {...review} />
        ))}
      </Marquee>

      {/* Fade masks
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-neutral-900" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-neutral-900" /> */}
    </div>
  );
}
