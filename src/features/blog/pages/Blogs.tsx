import { useMemo, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { SEO } from "@/components/common/SEO";
import BlogCard from "../components/BlogCard";
import BlogSearch from "../components/BlogSearch";
import { useBlogs } from "../hooks/useBlogs";
import Container from "@/layouts/Container";
import HeaderSection from "@/components/common/HeaderSection";

export default function Blog() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const { data: blogPosts = [], isError, isLoading } = useBlogs();



  const categories = useMemo(() => {
    const set = new Set<string>();
    blogPosts.forEach((p: any) => {
      if (p.category?.name) set.add(p.category.name);
      (p.categories ?? []).forEach((c: string) => set.add(c));
    });
    return Array.from(set).sort();
  }, [blogPosts]);

  const filteredPosts = useMemo(() => {
    const text = query.trim().toLowerCase();

    const base = activeCategory
      ? blogPosts.filter((p: any) => {
          const apiCategoryName = p.category?.name;
          const categoriesArray = p.categories ?? [];
          return (
            apiCategoryName === activeCategory ||
            categoriesArray.includes(activeCategory)
          );
        })
      : blogPosts;

    if (!text) return base;

    return base.filter((post: any) => {
      const haystack = `${post.title ?? ""} ${post.excerpt ?? ""} ${
        post.content ?? ""
      }`.toLowerCase();
      return haystack.includes(text);
    });
  }, [query, activeCategory, blogPosts]);

  if (isLoading) {
    return (
      <section className="min-h-screen flex items-center justify-center text-muted-foreground">
        Loading blogs…
      </section>
    );
  }

  if (isError) {
    return (
      <section className="min-h-screen flex items-center justify-center text-red-500">
        Failed to load blogs.
      </section>
    );
  }

  return (

          <Container size="full" >
    <section className="min-h-screen  py-20">
      <SEO
        title="SkillHigh Blog - Learn Faster, Grow Your Career"
        description="Read the latest insights, tips, and stories from SkillHigh to accelerate your learning and career growth."
        url="/blogs"
      />

      {/* ✅ ONE consistent container for whole page */}

        {/* ✅ back button now aligns with content */}
        <HeaderSection title="Blogs" />

        <header className="mb-8 space-y-6 mt-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-md sm:text-md leading-normal">
                Latest from the SkillHigh Blogs
              </h1>
              <p className="mt-1 text-sm sm:text-base text-muted-foreground max-w-2xl">
                Insights, tips, and stories to help you learn faster and grow your
                career.
              </p>
            </div>

            <BlogSearch query={query} setQuery={setQuery} />
          </div>
        </header>

        {/* Categories */}
        {categories.length > 0 && (
          <div className="flex gap-2 sm:gap-3 flex-wrap mb-8">
            <button
              onClick={() => setActiveCategory(null)}
              className={cn(
                "px-3 py-1.5 rounded-full border text-xs sm:text-sm transition",
                activeCategory === null
                  ? "border-primary/70 bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:bg-muted"
              )}
            >
              All
            </button>

            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() =>
                  setActiveCategory((prev) => (prev === cat ? null : cat))
                }
                className={cn(
                  "px-3 py-1.5 rounded-full border text-xs sm:text-sm transition",
                  activeCategory === cat
                    ? "border-primary/70 bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:bg-muted"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Posts */}
        {filteredPosts.length === 0 ? (
          <div className="rounded-3xl border border-border bg-muted/40 p-8 text-center text-muted-foreground">
            No posts match “{query}”.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post: any) => (
              <BlogCard key={post.slug} {...post} />
            ))}
          </div>
        )}
 
    </section>
         </Container>
  );
}
