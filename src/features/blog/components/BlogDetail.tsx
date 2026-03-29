import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, Clock3 } from "lucide-react";

import { SEO } from "@/components/common/SEO";
import BlogShare from "@/features/blog/components/BlogShare";
import { markdownComponents } from "./Markdown";
import { useSpecifyBlog } from "../hooks/useBlogs";
import { BlogDetailSkeleton } from "../skeleton/BlogDetailSkeleton";
import Container from "@/layouts/Container";
import HeaderSection from "@/components/common/HeaderSection";

function formatBlogDate(date: string) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function BlogDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { data: post, isLoading } = useSpecifyBlog(slug!);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    document.documentElement.scrollTo({ top: 0, left: 0, behavior: "auto" });
    document.body.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [slug]);

  const markdownContent = useMemo(() => {
    if (!post?.content) return "";
    return post.content.replace(/^`+|`+$/g, "").trim();
  }, [post?.content]);

  if (isLoading) return <BlogDetailSkeleton />;

  if (!post) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-white px-6 text-center dark:bg-neutral-950">
        <p className="font-mono text-3xl text-neutral-900 dark:text-white">Article not found</p>
        <p className="mt-3 max-w-md font-sans text-sm text-neutral-600 dark:text-neutral-300">
          The article may have been moved or removed.
        </p>
        <button
          type="button"
          onClick={() => navigate("/blogs")}
          className="mt-6 inline-flex items-center rounded-full border border-neutral-300 px-5 py-2.5 font-mono text-sm text-neutral-800 transition hover:border-primary hover:text-primary dark:border-neutral-700 dark:text-white"
        >
          Back 
        </button>
      </div>
    );
  }

  const absoluteUrl = `${window.location.origin}/blogs/${post.slug}`;

  return (
    <Container size="full">
      <SEO
        title={`${post.title} | SkillHigh Blog`}
        description={post.excerpt}
        image={post.thumbnail}
        url={absoluteUrl}
        meta={[{ property: "og:type", content: "article" }]}
      />

      <div className="min-h-screen bg-white px-6 py-16 text-neutral-950 dark:bg-neutral-900 mt-10 dark:text-white sm:px-10">
        <article className="mx-auto max-w-6xl">
          <div className="mb-8">
  
             <HeaderSection />
          </div>

          <header className="border-b border-neutral-200 pb-8 dark:border-neutral-800">
            <div className="flex flex-wrap items-center gap-2">
              {post.category?.name && (
                <span className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.16em] text-primary">
                  {post.category.name}
                </span>
              )}

              {(post.tags ?? []).map((tag: string) => (
                <span
                  key={tag}
                  className="rounded-full border border-neutral-300 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-neutral-500 dark:border-neutral-700 dark:text-neutral-300"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="mt-6 font-mono text-4xl leading-tight sm:text-5xl">{post.title}</h1>

            {post.excerpt && (
              <p className="mt-5 font-sans text-lg leading-8 text-neutral-600 dark:text-neutral-300">
                {post.excerpt}
              </p>
            )}

            <div className="mt-5 flex flex-wrap items-center gap-3 font-sans text-sm text-neutral-500 dark:text-neutral-400">
              <span>{formatBlogDate(post.publishedAt)}</span>
              <span>•</span>
              <span className="inline-flex items-center gap-1.5">
                <Clock3 className="h-4 w-4" />
                {post.readingTime} min read
              </span>
            </div>
          </header>

          {post.thumbnail && (
            <div className="mt-8 overflow-hidden rounded-[1.5rem] border border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900">
              <img
                src={post.thumbnail}
                alt={post.title}
                className="max-h-[520px] w-full object-cover"
              />
            </div>
          )}

          <div className="mt-10">
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
              {markdownContent}
            </ReactMarkdown>
          </div>

          <BlogShare title={post.title} slug={post.slug} className="mt-10" />
        </article>
      </div>
    </Container>
  );
}
