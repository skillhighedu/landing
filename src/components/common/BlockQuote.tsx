import { Quote } from "lucide-react";

interface BlockQuoteProps {
  quote: string;
}

export default function BlockQuote({ quote }: BlockQuoteProps) {
  return (
    <blockquote
      className="
        relative max-w-xl
        pl-6
        font-serif italic
        text-lg sm:text-xl
        text-white/90
        leading-relaxed
      "
    >
      {/* Decorative quote mark */}
      <Quote
        className="
          absolute -left-1 top-0
          w-5 h-5
          text-white/30
          -rotate-180
        "
      />

      {quote}

      {/* Closing quote (subtle) */}
      <Quote
        className="
          inline-block ml-1
          w-4 h-4
          text-white/30
          translate-y-1
        "
      />
    </blockquote>
  );
}
