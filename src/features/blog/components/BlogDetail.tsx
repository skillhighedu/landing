import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { SEO } from "@/components/common/SEO";
import BlogShare from "@/features/blog/components/BlogShare";
import { markdownComponents } from "./Markdown";
import { useSpecifyBlog } from "../hooks/useBlogs";
import { BlogDetailSkeleton } from "../skeleton/BlogDetailSkeleton";
import CustomButton from "@/components/common/Button";
import { ArrowLeft, Share2,  } from "lucide-react";
import AppTooltip from "@/components/common/AppTooltip";
import { Button } from "@/components/ui/button";


export default function BlogDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [shareUrl, setShareUrl] = useState("");

  const navigate = useNavigate();
  const { data: post, isLoading } = useSpecifyBlog(slug!);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const baseUrl = window?.location?.origin ?? "";
    setShareUrl(`${baseUrl}/blogs/${slug}`);
  }, [slug]);

  const markdownContent = useMemo(() => {
    if (!post?.content) return "";
    return post.content.replace(/^`+|`+$/g, "").trim();
  }, [post?.content]);

  const handleCopy = async () => {
    if (!shareUrl) return;
    try {
      await navigator.clipboard.writeText(shareUrl);
    } catch (error) {
      console.error("Failed to copy link:", error);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share && shareUrl) {
      try {
        await navigator.share({
          url: shareUrl,
          title: post?.title,
        });
      } catch (error) {
        console.error("Share cancelled or failed:", error);
      }
    } else {
      handleCopy();
    }
  };

  if (isLoading) return <BlogDetailSkeleton />;

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black dark:bg-neutral-950 dark:text-white px-6 font-sans">
        <h2 className="text-2xl font-semibold mb-4">Blog not found</h2>
        <button
          onClick={() => navigate("/blogs")}
          className="text-primary hover:opacity-80 transition"
        >
          Back to Blog
        </button>
      </div>
    );
  }

  const absoluteUrl = `${window.location.origin}/blogs/${post.slug}`;

  return (
    <div className="min-h-screen bg-white text-black dark:bg-neutral-950 dark:text-gray-200 py-18 px-6 sm:px-10 lg:px-16">
      <article className="max-w-5xl mx-auto space-y-6 mt-10 sm:space-y-8">
        <SEO
          title={`${post.title} | SkillHigh Blog`}
          description={post.excerpt}
          image={post.thumbnail}
          url={absoluteUrl}
          meta={[{ property: "og:type", content: "article" }]}
        />

        {/* Title + Right button */}
        {/* Header row: Back + Title + Share */}
{/* ✅ Responsive header: mobile stacks, desktop aligns */}
<div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
  {/* Left group: Back + Title */}
  <div className="flex items-start gap-3 min-w-0 flex-1">
    <AppTooltip label="Go back">
      <Button
        onClick={() => navigate(-1)}
        aria-label="Go back"
        className="
          inline-flex items-center justify-center
          h-9 w-9 sm:h-10 sm:w-10
          rounded-full border shrink-0
          transition active:scale-95

          bg-black/5 text-neutral-700 border-black/10
          hover:bg-black/10 hover:text-black

          dark:bg-white/5 dark:text-white/70 dark:border-white/10
          dark:hover:bg-white/10 dark:hover:text-white
        "
      >
        <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
      </Button>
    </AppTooltip>

    <h1 className="min-w-0 flex-1 text-3xl sm:text-4xl tracking-tight text-black dark:text-white break-words">
      {post.title}
    </h1>
  </div>

  {/* Right: Share button (stays right on desktop, drops below on mobile) */}
  <div className="shrink-0 sm:pt-1">
    <CustomButton
      title="Share"
      icon={<Share2 className="h-4 w-4" />}
      isBack
      type="button"
      onClick={handleNativeShare}
      className="
        bg-primary/15! text-primary! border! border-primary/60!
        px-3! py-2! text-xs! sm:text-sm!
        shadow-none! hover:bg-primary/25! transition-colors
        w-full sm:w-auto
      "
    />
  </div>
</div>



        {/* Meta */}
        <div className="font-sans flex flex-wrap items-center gap-3 text-sm text-black/80 dark:text-neutral-300">
          <span>
            {new Date(post.publishedAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>

          <span className="text-black/50 dark:text-neutral-500">•</span>

          <span className="text-black/80 dark:text-neutral-200">
            {post.readingTime} min read
          </span>

          <div className="flex flex-wrap items-center gap-2">
            {post.category?.name && (
              <span className="inline-flex items-center rounded-full border border-primary/40 bg-primary/10 px-2.5 py-0.5 text-[11px] font-medium text-primary font-sans">
                {post.category.name}
              </span>
            )}

            {(post.tags ?? []).map((tag: string) => (
              <span
                key={tag}
                className="
                  inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-sans
                  border-black/20 text-black bg-white
                  dark:border-neutral-700 dark:text-neutral-200 dark:bg-neutral-900/40
                "
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Thumbnail */}
        {post.thumbnail && (
          <div className="w-full rounded-xl overflow-hidden border border-black/10 bg-white dark:border-neutral-800 dark:bg-neutral-900">
            <img
              src={post.thumbnail}
              alt={post.title}
              className="w-full h-auto object-cover font-sans"
            />
          </div>
        )}

        {/* ✅ Markdown (fix big images here) */}
        <div
          className="
            font-sans max-w-none
            text-black dark:text-gray-200

            [&_h1]:text-black [&_h2]:text-black [&_h3]:text-black [&_h4]:text-black
            dark:[&_h1]:text-white dark:[&_h2]:text-white dark:[&_h3]:text-white dark:[&_h4]:text-white

            [&_p]:text-black/90 dark:[&_p]:text-gray-200
            [&_li]:text-black/90 dark:[&_li]:text-gray-200

            [&_a]:text-primary [&_a:hover]:opacity-80

            [&_blockquote]:border-l-4 [&_blockquote]:border-primary/40
            [&_blockquote]:pl-4 [&_blockquote]:text-black/80
            dark:[&_blockquote]:text-gray-200

            [&_code]:text-primary

            [&_pre]:rounded-lg [&_pre]:p-4 [&_pre]:overflow-x-auto
            [&_pre]:bg-neutral-50 [&_pre]:border [&_pre]:border-black/10
            dark:[&_pre]:bg-neutral-900 dark:[&_pre]:border-neutral-800

            [&_table]:w-full [&_table]:border-collapse [&_table]:overflow-hidden [&_table]:rounded-xl
            [&_table]:border [&_table]:border-black/10
            dark:[&_table]:border-neutral-800

            [&_thead]:bg-neutral-900 [&_thead_th]:text-white
            dark:[&_thead]:bg-neutral-900 dark:[&_thead_th]:text-white

            [&_tbody_tr]:bg-neutral-50
            [&_tbody_tr:nth-child(even)]:bg-white
            dark:[&_tbody_tr]:bg-neutral-900/40
            dark:[&_tbody_tr:nth-child(even)]:bg-neutral-900/60

            [&_th]:text-left [&_th]:p-3 [&_th]:text-sm [&_th]:font-semibold
            [&_td]:p-3 [&_td]:text-sm
            [&_td]:text-black/90 dark:[&_td]:text-gray-200

            [&_tr]:border-b [&_tr]:border-black/10
            dark:[&_tr]:border-neutral-800

            /* ✅ IMAGE FIX */
            [&_img]:w-full
            [&_img]:max-w-full
            [&_img]:h-auto
            [&_img]:max-h-[520px]
            [&_img]:object-contain
            [&_img]:mx-auto
            [&_img]:rounded-xl
            [&_img]:border
            [&_img]:border-black/10
            dark:[&_img]:border-neutral-800
          "
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
            {markdownContent}
          </ReactMarkdown>
        </div>

        {/* Share card */}
        <div className="font-sans">
          <BlogShare title={post.title} slug={post.slug} className="mt-10" />
        </div>
      </article>
    </div>
  );
}
