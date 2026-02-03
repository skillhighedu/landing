import { Quote } from "lucide-react";

interface BlockQuoteProps {
  quote: string;
}

export default function BlockQuote({ quote }: BlockQuoteProps) {
  return (
    <blockquote
      className="
        relative max-w-xl pl-6
        font-serif italic
        text-lg sm:text-xl
        leading-relaxed

        text-neutral-800 dark:text-white/90
      "
    >
      {/* Opening quote */}
      <Quote
        className="
          absolute -left-1 top-0
          w-5 h-5 -rotate-180

          text-neutral-400 dark:text-white/30
        "
      />

      {quote}

      {/* Closing quote */}
      <Quote
        className="
          inline-block ml-1
          w-4 h-4 translate-y-1

          text-neutral-400 dark:text-white/30
        "
      />
    </blockquote>
  );
}
