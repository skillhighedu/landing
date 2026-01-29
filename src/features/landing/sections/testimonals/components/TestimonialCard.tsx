import { Linkedin } from "lucide-react";
import type { Testimonial } from "../types";

type Props = Testimonial;

export default function TestimonialCard({ name, link, review }: Props) {
  return (
    <figure
      className="
        relative w-full max-w-xl
        rounded-xl
        border border-border
        bg-card/80 backdrop-blur
        px-5 py-4
        transition-all
        hover:bg-card
      "
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <figcaption className="text-sm font-medium text-primary truncate">
          {name}
        </figcaption>

        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${name} on LinkedIn`}
          className="text-foreground/60 hover:text-primary transition-colors"
        >
          <Linkedin size={16} />
        </a>
      </div>

      {/* Review */}
      <blockquote className="text-sm text-card-foreground/75 leading-relaxed font-bricolage">
        “{review}”
      </blockquote>
    </figure>
  );
}
