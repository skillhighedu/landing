import { Linkedin } from "lucide-react";
import type { Testimonial } from "../types";

type Props = Testimonial;

export default function TestimonialCard({ name, link, review }: Props) {
  return (
    <figure
      className="
        relative w-full max-w-xl rounded-xl px-5 py-4
        transition-all

        /* Surface */
        bg-white/90 text-neutral-900
        dark:bg-neutral-900/80 dark:text-white

        /* Border */
        border border-neutral-200
        dark:border-neutral-800

        /* Hover */
        hover:border-neutral-400
        dark:hover:border-neutral-600

        /* Subtle depth */
        shadow-sm
      "
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3 gap-3">
        <figcaption className="text-sm font-medium text-primary truncate">
          {name}
        </figcaption>

        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${name} on LinkedIn`}
          className="
            text-neutral-400 transition-colors
            hover:text-blue-500
          "
        >
          <Linkedin size={16} />
        </a>
      </div>

      {/* Review */}
      <blockquote className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300 font-bricolage">
        “{review}”
      </blockquote>
    </figure>
  );
}
