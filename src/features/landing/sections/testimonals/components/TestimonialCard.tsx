import { Linkedin } from "lucide-react";
import type { Testimonial } from "../types";

type Props = Testimonial;

export default function TestimonialCard({ name, link, review }: Props) {
  return (
    <figure
      className="
        relative w-full max-w-xl
        rounded-xl border border-neutral-800
        bg-neutral-900/80
        px-5 py-4
        transition-all
        hover:border-neutral-600
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
          className="text-neutral-400 hover:text-blue-400 transition-colors"
        >
          <Linkedin size={16} />
        </a>
      </div>

      {/* Review */}
      <blockquote className="text-sm text-neutral-300 leading-relaxed font-bricolage">
        “{review}”
      </blockquote>
    </figure>
  );
}
