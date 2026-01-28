import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { SEO } from "@/components/common/SEO";
import BlogShare from "@/features/blog/components/BlogShare";
import { markdownComponents } from "./Markdown";
import { useSpecifyBlog } from "../hooks/useBlogs";
import { BlogDetailSkeleton } from "../skeleton/BlogDetailSkeleton";
import BackButton from "@/components/common/BackButton";

export default function BlogDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const { data: post, isLoading } = useSpecifyBlog(slug!);

  /* ---------------- Scroll to top ---------------- */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  /* ---------------- Markdown Fix (MUST be above returns) ---------------- */
  const markdownContent = useMemo(() => {
    if (!post?.content) return "";
    // Remove accidental wrapping backticks from backend
    return post.content.replace(/^`+|`+$/g, "").trim();
  }, [post?.content]);

  /* ---------------- Loading ---------------- */
  if (isLoading) {
    return <BlogDetailSkeleton />;
  }

  /* ---------------- Not Found ---------------- */
  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white">
        <h2 className="text-2xl font-semibold mb-4">Blog not found</h2>
        <button
          onClick={() => navigate("/blogs")}
          className="text-primary hover:text-white transition-colors"
        >
          Back to Blog
        </button>
      </div>
    );
  }

  /* ---------------- Absolute URL for SEO ---------------- */
  const absoluteUrl = `${window.location.origin}/blogs/${post.slug}`;

  return (
    <div className="min-h-screen bg-neutral-950 text-gray-200 py-20 px-6 sm:px-10 lg:px-16">
      <BackButton />

      <article className="max-w-5xl mx-auto space-y-6 mt-10 sm:space-y-8">

        <SEO
          title={`${post.title} | SkillHigh Blog`}
          description={post.excerpt}
          image={post.thumbnail}
          url={absoluteUrl}
          meta={[{ property: "og:type", content: "article" }]}
        />

        {/* ---------------- Title ---------------- */}
        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-3 text-gray-500 text-sm">
          <span>
            {new Date(post.publishedAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>

          • <span>{post.readingTime} min read</span>

     
          <div className="flex flex-wrap items-center gap-2">
            {post.category?.name && (
              <span className="inline-flex items-center rounded-full border border-primary/40 bg-primary/10 px-2.5 py-0.5 text-[11px] font-medium text-primary">
                {post.category.name}
              </span>
            )}

            {(post.tags ?? []).map((tag: string) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full border border-neutral-700 px-2.5 py-0.5 text-[11px] text-gray-400"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* ---------------- Thumbnail ---------------- */}
        {post.thumbnail && (
          <div className="w-full rounded-xl overflow-hidden border border-neutral-800 bg-neutral-900">
            <img
              src={post.thumbnail}
              alt={post.title}
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        {/* ---------------- Share ---------------- */}
        <BlogShare title={post.title} slug={post.slug} className="mt-6" />

        {/* ---------------- Markdown Content ---------------- */}
        <div
          className="
            prose prose-invert max-w-none
            prose-headings:scroll-mt-24
            prose-headings:text-white
            prose-p:text-gray-300
            prose-a:text-primary hover:prose-a:text-white
            prose-strong:text-white
            prose-img:rounded-lg
            prose-blockquote:border-l-primary/40
            prose-blockquote:text-gray-300
            prose-code:text-primary
            prose-pre:bg-neutral-900
            prose-pre:text-gray-200
            prose-hr:border-neutral-800
            lg:prose-lg
          "
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={markdownComponents}
          >
            {markdownContent}
          </ReactMarkdown>
        </div>


        <BlogShare title={post.title} slug={post.slug} className="mt-10" />
      </article>
    </div>
  );
}
