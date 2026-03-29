import { useMemo, useState } from "react";

import { SEO } from "@/components/common/SEO";
import Container from "@/layouts/Container";
import BlogCard from "../components/BlogCard";
import BlogSearch from "../components/BlogSearch";
import { useBlogs } from "../hooks/useBlogs";
import { cn } from "@/lib/utils";
import HeaderSection from "@/components/common/HeaderSection";

function EmptyState({
  query,
  category,
  onClear,
}: {
  query: string;
  category: string | null;
  onClear: () => void;
}) {
  return (
    <div className="rounded-[1.5rem] border border-dashed border-neutral-300 px-6 py-16 text-center dark:border-neutral-700">
      <p className="font-mono text-xl text-neutral-900 dark:text-white">No matching articles</p>
      <p className="mt-3 font-sans text-sm text-neutral-600 dark:text-neutral-300">
        {query.trim()
          ? `No results for "${query.trim()}"${category ? ` in ${category}` : ""}.`
          : category
            ? `No posts are available in ${category} right now.`
            : "Articles will appear here soon."}
      </p>
      {(query || category) && (
        <button
          type="button"
          onClick={onClear}
          className="mt-5 inline-flex rounded-full border border-neutral-300 px-4 py-2 font-mono text-sm text-neutral-700 transition hover:border-primary hover:text-primary dark:border-neutral-700 dark:text-neutral-200"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}

export default function Blog() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const { data: blogPosts = [], isError, isLoading } = useBlogs();

  const categories = useMemo(() => {
    const values = new Set<string>();

    blogPosts.forEach((post: any) => {
      if (post.category?.name) values.add(post.category.name);
      (post.tags ?? []).forEach((tag: string) => values.add(tag));
    });

    return Array.from(values).sort();
  }, [blogPosts]);

  const filteredPosts = useMemo(() => {
    const text = query.trim().toLowerCase();

    const byCategory = activeCategory
      ? blogPosts.filter((post: any) => {
          const categoryName = post.category?.name;
          const tags = post.tags ?? [];
          return categoryName === activeCategory || tags.includes(activeCategory);
        })
      : blogPosts;

    if (!text) return byCategory;

    return byCategory.filter((post: any) => {
      const haystack = `${post.title ?? ""} ${post.excerpt ?? ""} ${post.content ?? ""}`.toLowerCase();
      return haystack.includes(text);
    });
  }, [activeCategory, blogPosts, query]);

  return (
    <Container size="xl">
   
      <SEO
        title="SkillHigh Blog - Ideas, Notes, and Career Growth"
        description="Read practical articles from SkillHigh on coding, careers, projects, and learning in public."
        url="/blogs"
      />

      <section className="min-h-screen bg-white py-20 text-neutral-950 dark:bg-neutral-900 dark:text-white">
         <HeaderSection />
        <div className="mx-auto max-w-7xl pt-10">
            
          <div className="border-b border-neutral-200 pb-8 dark:border-neutral-800">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary">SkillHigh Blog</p>
            <h1 className="mt-4 font-mono text-4xl leading-tight sm:text-5xl">
              Practical writing for builders and learners.
            </h1>
            <p className="mt-4 max-w-2xl font-sans text-base leading-8 text-neutral-600 dark:text-neutral-300">
              Clean articles on learning, projects, careers, and showing your work in public.
            </p>

            <div className="mt-6 max-w-md">
              <BlogSearch query={query} setQuery={setQuery} />
            </div>
          </div>

          {categories.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setActiveCategory(null)}
                className={cn(
                  "rounded-full border px-4 py-2 font-mono text-sm transition",
                  activeCategory === null
                    ? "border-primary bg-primary text-white"
                    : "border-neutral-300 text-neutral-700 hover:border-primary hover:text-primary dark:border-neutral-700 dark:text-neutral-200",
                )}
              >
                All
              </button>

              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory((prev) => (prev === category ? null : category))}
                  className={cn(
                    "rounded-full border px-4 py-2 font-mono text-sm transition",
                    activeCategory === category
                      ? "border-primary bg-primary text-white"
                      : "border-neutral-300 text-neutral-700 hover:border-primary hover:text-primary dark:border-neutral-700 dark:text-neutral-200",
                  )}
                >
                  {category}
                </button>
              ))}
            </div>
          )}

          {(query || activeCategory) && (
            <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-sans text-sm text-neutral-600 dark:text-neutral-300">
                Showing {filteredPosts.length} {filteredPosts.length === 1 ? "article" : "articles"}.
              </p>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setActiveCategory(null);
                }}
                className="font-mono text-sm text-primary transition hover:opacity-80"
              >
                Reset
              </button>
            </div>
          )}

          {isLoading ? (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="min-h-[320px] animate-pulse rounded-[1.5rem] border border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900" />
              ))}
            </div>
          ) : isError ? (
            <div className="mt-10 rounded-[1.5rem] border border-neutral-200 px-6 py-12 text-center dark:border-neutral-800">
              <p className="font-mono text-xl text-neutral-900 dark:text-white">Unable to load articles</p>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="mt-5 inline-flex rounded-full bg-primary px-4 py-2 font-mono text-sm text-white transition hover:opacity-90"
              >
                Retry
              </button>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="mt-10">
              <EmptyState
                query={query}
                category={activeCategory}
                onClear={() => {
                  setQuery("");
                  setActiveCategory(null);
                }}
              />
            </div>
          ) : (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filteredPosts.map((post: any) => (
                <BlogCard key={post.slug} {...post} />
              ))}
            </div>
          )}
        </div>
      </section>
    </Container>
  );
}
