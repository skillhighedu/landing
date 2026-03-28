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
        placeholder="Search by title, keyword, or topic"
        className={cn(
          "w-full rounded-[1.25rem] border px-12 py-3.5 font-mono text-sm transition sm:text-base",
          "bg-white border-neutral-200 text-neutral-900 placeholder:text-neutral-400 dark:bg-neutral-950 dark:border-neutral-800 dark:text-white dark:placeholder:text-neutral-500",
          "focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/15"
        )}
      />

      <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
    </div>
  );
}
