
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import BlogCard from "@/components/blogs/BlogCard";
import { blogPosts } from "@/constants/blogData";
import { cn } from "@/lib/utils";

export default function Blog() {
  const [query, setQuery] = useState("");

  const filteredPosts = useMemo(() => {
    const text = query.trim().toLowerCase();
    if (!text) return blogPosts;

    return blogPosts.filter((post) => {
      const haystack = `${post.title} ${post.description} ${(post.content ?? "").toLowerCase()}`;
      return haystack.includes(text);
    });
  }, [query]);

  return (
    <section className="min-h-screen bg-neutral-950 text-gray-200 py-20 px-6 sm:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 space-y-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white ">
              Latest from the SkillHigh Blog
            </h1>
            <p className="mt-3 text-sm sm:text-base font-bricolage text-gray-400 max-w-2xl">
              Insights, tips, and stories to help you learn faster and grow your career.
            </p>
          </div>

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
                "w-full rounded-2xl border border-neutral-800 bg-neutral-900/80 px-12 py-3 text-sm sm:text-base",
                "text-gray-200 placeholder:text-gray-500 focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/20",
              )}
            />
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
          </div>
        </header>

        {filteredPosts.length === 0 ? (
          <div className="rounded-3xl border border-neutral-800 bg-neutral-900/60 p-8 text-center text-gray-400">
            No posts match “{query}”. Try a different keyword.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {filteredPosts.map((post) => (
              <BlogCard key={post.slug} {...post} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
