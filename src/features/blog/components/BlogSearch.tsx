import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

export default function BlogSearch({
  query,
  setQuery,
}: {
  query: string;
  setQuery: (value: string) => void;
}) {
  return (
    <div className="relative max-w-xl">
      <label htmlFor="blog-search" className="sr-only">
        Search blog posts
      </label>

      <input
        id="blog-search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search by title, keywords, or topic..."
        className={cn(
          "w-full rounded-2xl border px-12 py-3 text-sm sm:text-base transition",
          "bg-background border-border text-foreground placeholder:text-muted-foreground",
          "focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/20"
        )}
      />

      <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
    </div>
  );
}
