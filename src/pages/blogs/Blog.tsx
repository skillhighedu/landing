
import { useMemo, useState } from "react";

import { blogPosts } from "@/constants/blogData";
import { cn } from "@/lib/utils";
import { SEO } from "@/components/common/SEO";
import BlogCard from "@/features/blog/components/BlogCard";
import BlogSearch from "@/features/blog/components/BlogSearch";
export default function Blog() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories = useMemo(() => {
    const set = new Set<string>();
    blogPosts.forEach((p) => (p.categories ?? []).forEach((c) => set.add(c)));
    return Array.from(set).sort();
  }, []);

  const filteredPosts = useMemo(() => {
    const text = query.trim().toLowerCase();
    const base = activeCategory
      ? blogPosts.filter((p) => (p.categories ?? []).includes(activeCategory))
      : blogPosts;
    if (!text) return base;

    return base.filter((post) => {
      const haystack = `${post.title} ${post.description} ${(post.content ?? "").toLowerCase()}`;
      return haystack.includes(text);
    });
  }, [query, activeCategory]);

  return (
    <section className="min-h-screen bg-neutral-950 text-gray-200 py-20 px-6 sm:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 space-y-6">
          <SEO
            title="SkillHigh Blog - Learn Faster, Grow Your Career"
            description="Read the latest insights, tips, and stories from SkillHigh to accelerate your learning and career growth."
            url={`${window.location.origin}/blogs`}
          />
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white ">
              Latest from the SkillHigh Blogs
            </h1>
            <p className="mt-3 text-sm sm:text-base font-bricolage text-gray-400 max-w-2xl">
              Insights, tips, and stories to help you learn faster and grow your career.
            </p>
          </div>

         <BlogSearch query={query} setQuery={setQuery}/>
        </header>

        {categories.length > 0 && (
          <div className="flex gap-2 sm:gap-3 flex-wrap mb-8">
            <button
              type="button"
              onClick={() => setActiveCategory(null)}
              className={cn(
                "px-3 py-1.5 rounded-full border text-xs sm:text-sm transition-colors",
                activeCategory === null
                  ? "border-primary/70 bg-primary/15 text-primary"
                  : "border-neutral-700 text-gray-300 hover:border-primary/60 hover:text-white",
              )}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory((prev) => (prev === cat ? null : cat))}
                className={cn(
                  "px-3 py-1.5 rounded-full border text-xs sm:text-sm transition-colors",
                  activeCategory === cat
                    ? "border-primary/70 bg-primary/15 text-primary"
                    : "border-neutral-700 text-gray-300 hover:border-primary/60 hover:text-white",
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

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
