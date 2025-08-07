import { Quote } from 'lucide-react'

interface BlockQuoteProps {
  quote: string;
}

export default function BlockQuote({ quote }: BlockQuoteProps) {
  return (
    <blockquote className="text-white text-lg italic text-center sm:text-left font-bricolage flex items-center gap-2">
      <Quote className="w-5 h-5 text-white opacity-60 -rotate-180" />
      {quote}
      <Quote className="w-5 h-5 text-white opacity-60" />
    </blockquote>
  );
}
