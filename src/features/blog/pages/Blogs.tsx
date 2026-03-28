import { useMemo, useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { SEO } from "@/components/common/SEO";
import BlogCard from "../components/BlogCard";
import BlogSearch from "../components/BlogSearch";
import { useBlogs } from "../hooks/useBlogs";
import Container from "@/layouts/Container";
import HeaderSection from "@/components/common/HeaderSection";

// ─── Skeleton loader for individual cards ────────────────────────────────────
function CardSkeleton({ large = false }: { large?: boolean }) {
  return (
    <div
      className={cn(
        "rounded-2xl overflow-hidden animate-pulse bg-muted/50",
        large ? "col-span-1 lg:col-span-2 h-[420px]" : "h-[320px]"
      )}
    >
      <div className="h-3/5 bg-muted" />
      <div className="p-5 space-y-3">
        <div className="h-3 w-1/4 bg-muted rounded-full" />
        <div className="h-5 w-3/4 bg-muted rounded-full" />
        <div className="h-4 w-full bg-muted rounded-full" />
        <div className="h-4 w-2/3 bg-muted rounded-full" />
      </div>
    </div>
  );
}

// ─── Animated count badge ────────────────────────────────────────────────────
function CountBadge({ count }: { count: number }) {
  return (
    <span
      key={count}
      className="inline-flex items-center justify-center min-w-[22px] h-[22px] px-1.5 rounded-full bg-primary/15 text-primary text-[11px] font-semibold tabular-nums transition-all duration-300"
    >
      {count}
    </span>
  );
}

// ─── Main Blog page ──────────────────────────────────────────────────────────
export default function Blog() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  const { data: blogPosts = [], isError, isLoading } = useBlogs();

  // Fade-in on mount
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  // Derive unique categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    blogPosts.forEach((p: any) => {
      if (p.category?.name) set.add(p.category.name);
      (p.categories ?? []).forEach((c: string) => set.add(c));
    });
    return Array.from(set).sort();
  }, [blogPosts]);

  // Filter posts
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

  // ── Loading state ────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <Container size="full">
        <section className="min-h-screen py-20">
          <HeaderSection title="Blogs" />
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <CardSkeleton large />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </div>
        </section>
      </Container>
    );
  }

  // ── Error state ──────────────────────────────────────────────────────────
  if (isError) {
    return (
      <Container>
        <section className="min-h-screen py-20 flex items-center justify-center">
          <div className="text-center space-y-3">
            <div className="text-5xl">⚠️</div>
            <p className="text-lg font-semibold text-foreground">
              Couldn't load posts
            </p>
            <p className="text-sm text-muted-foreground">
              Please check your connection and try refreshing.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition"
            >
              Retry
            </button>
          </div>
        </section>
      </Container>
    );
  }

  // ── Happy path ───────────────────────────────────────────────────────────
  const hasResults = filteredPosts.length > 0;
  const isFiltered = !!query.trim() || !!activeCategory;

  return (
    <Container size="xl">
      <SEO
        title="SkillHigh Blog - Learn Faster, Grow Your Career"
        description="Read the latest insights, tips, and stories from SkillHigh to accelerate your learning and career growth."
        url="/blogs"
      />

      <section
        className={cn(
          "min-h-screen py-20 transition-all duration-700",
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
        )}
      >
        {/* ── Back / breadcrumb ─────────────────────────────────────────── */}
        <HeaderSection title="Blogs" />

        {/* ── Hero header ───────────────────────────────────────────────── */}
        <header ref={headerRef} className="mt-10 mb-10">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            {/* Title block */}
            <div className="max-w-lg">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/8 border border-primary/20 mb-3">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-xs font-medium text-primary tracking-wide uppercase">
                  SkillHigh Journal
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl  leading-snug text-foreground">
                Latest from the Blog
              </h1>
              <p className="mt-2 text-sm sm:text-base font-sans text-muted-foreground max-w-md leading-relaxed">
                Insights, tips, and stories to help you learn faster and grow
                your career.
              </p>
            </div>

            {/* Search — right-aligned on desktop */}
            <div className="w-full sm:w-auto sm:min-w-[260px]">
              <BlogSearch query={query} setQuery={setQuery } />
            </div>
          </div>
        </header>

        {/* ── Category filter bar ───────────────────────────────────────── */}
        {categories.length > 0 && (
          <div className="mb-8">
            <div className="flex gap-2 flex-wrap py-1">
              {/* "All" pill */}
              <button
                onClick={() => setActiveCategory(null)}
                className={cn(
                  "inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-xs font-medium transition-all duration-200",
                  activeCategory === null
                    ? "border-primary bg-primary text-primary-foreground shadow-sm shadow-primary/20"
                    : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                )}
              >
                All
                <CountBadge count={blogPosts.length} />
              </button>

              {categories.map((cat) => {
                const catCount = blogPosts.filter((p: any) => {
                  const name = p.category?.name;
                  const arr = p.categories ?? [];
                  return name === cat || arr.includes(cat);
                }).length;

                return (
                  <button
                    key={cat}
                    onClick={() =>
                      setActiveCategory((prev) => (prev === cat ? null : cat))
                    }
                    className={cn(
                      "inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-xs font-medium transition-all duration-200",
                      activeCategory === cat
                        ? "border-primary bg-primary text-primary-foreground shadow-sm shadow-primary/20"
                        : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                    )}
                  >
                    {cat}
                    <CountBadge count={catCount} />
                  </button>
                );
              })}
            </div>

            {/* Thin separator below pills */}
            <div className="mt-4 h-px bg-border/50" />
          </div>
        )}

        {/* ── Results meta ──────────────────────────────────────────────── */}
        {isFiltered && (
          <div className="flex items-center justify-between mb-5 text-sm text-muted-foreground">
            <span>
              {hasResults ? (
                <>
                  Showing{" "}
                  <strong className="text-foreground font-semibold">
                    {filteredPosts.length}
                  </strong>{" "}
                  {filteredPosts.length === 1 ? "post" : "posts"}
                  {activeCategory && (
                    <>
                      {" "}
                      in{" "}
                      <strong className="text-foreground font-semibold">
                        {activeCategory}
                      </strong>
                    </>
                  )}
                  {query.trim() && (
                    <>
                      {" "}
                      for &ldquo;
                      <strong className="text-foreground font-semibold">
                        {query.trim()}
                      </strong>
                      &rdquo;
                    </>
                  )}
                </>
              ) : (
                "No results"
              )}
            </span>

            {/* Clear filters */}
            {(query || activeCategory) && (
              <button
                onClick={() => {
                  setQuery("");
                  setActiveCategory(null);
                }}
                className="text-xs text-primary hover:underline underline-offset-2 transition"
              >
                Clear filters
              </button>
            )}
          </div>
        )}

        {/* ── Posts grid ────────────────────────────────────────────────── */}
        {!hasResults ? (
          <EmptyState
            query={query}
            category={activeCategory}
            onClear={() => {
              setQuery("");
              setActiveCategory(null);
            }}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredPosts.map((post: any, i: number) => (
              <div
                key={post.slug}
                className="transition-all duration-500"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <BlogCard {...post} />
              </div>
            ))}
          </div>
        )}

        {/* ── Footer stat bar ───────────────────────────────────────────── */}
        {hasResults && !isFiltered && (
          <div className="mt-16 pt-6 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
            <span>
              {blogPosts.length} articles · {categories.length} categories
            </span>
            <span className="hidden sm:block">
              SkillHigh Journal · Stay curious.
            </span>
          </div>
        )}
      </section>
    </Container>
  );
}

// ─── Empty state component ───────────────────────────────────────────────────
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
    <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 rounded-2xl border border-dashed border-border bg-muted/20">
    
     

      <div>
        <p className=" text-foreground text-base">
          Blogs avalbile soon
        </p>
        <p className="text-sm text-muted-foreground mt-1 max-w-xs">
          {query.trim() ? (
            <>
              Nothing matched &ldquo;<strong>{query.trim()}</strong>&rdquo;
              {category && ` in ${category}`}.
            </>
          ) : (
            category && <>No posts in the &ldquo;{category}&rdquo; category yet.</>
          )}
        </p>
      </div>

    {query && 
        <button
        onClick={onClear}
        className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-medium hover:opacity-90 transition"
      >
        Clear filters
      </button>
    }
    </div>
  );
}