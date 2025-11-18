import { useParams, useNavigate } from "react-router-dom";
import { blogPosts } from "@/constants/blogData";
import { useEffect, type HTMLAttributes } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import BackButton from "../ui/BackButton";
import BlogShare from "./BlogShare";
import { cn } from "@/lib/utils";
import { SEO } from "@/components/Seo/SEO";

type MarkdownElementProps<T extends HTMLElement = HTMLElement> = HTMLAttributes<T> & {
  node?: unknown;
};

type MarkdownCodeProps = MarkdownElementProps<HTMLElement> & {
  inline?: boolean;
};

const markdownComponents: Components = {
  h2: ({ className, ...props }: MarkdownElementProps<HTMLHeadingElement>) => (
    <h2
      className={cn(
        "text-2xl sm:text-3xl font-semibold tracking-tight text-white mt-12 mb-4",
        className,
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: MarkdownElementProps<HTMLHeadingElement>) => (
    <h3
      className={cn(
        "text-xl sm:text-2xl font-semibold tracking-tight text-white mt-10 mb-4",
        className,
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }: MarkdownElementProps<HTMLHeadingElement>) => (
    <h4
      className={cn(
        "text-lg sm:text-xl font-semibold tracking-tight text-gray-100 mt-8 mb-3",
        className,
      )}
      {...props}
    />
  ),
  p: ({ className, ...props }: MarkdownElementProps<HTMLParagraphElement>) => (
    <p
      className={cn(
        "text-base sm:text-lg leading-relaxed text-gray-300 my-5",
        className,
      )}
      {...props}
    />
  ),
  a: ({ className, ...props }: MarkdownElementProps<HTMLAnchorElement>) => (
    <a
      target="_blank"
      rel="noopener noreferrer"
      className={cn("text-primary hover:text-white underline-offset-4 hover:underline", className)}
      {...props}
    />
  ),
  hr: () => null,
  blockquote: ({ className, ...props }: MarkdownElementProps<HTMLQuoteElement>) => (
    <blockquote
      className={cn(
        "border-l-4 border-primary/40 bg-neutral-900/60 px-6 py-4 text-gray-200 italic rounded-r-xl my-6",
        className,
      )}
      {...props}
    />
  ),
  ul: ({ className, ...props }: MarkdownElementProps<HTMLUListElement>) => (
    <ul
      className={cn(
        "list-disc list-outside pl-6 space-y-2 text-gray-300 my-5 marker:text-primary",
        className,
      )}
      {...props}
    />
  ),
  ol: ({ className, ...props }: MarkdownElementProps<HTMLOListElement>) => (
    <ol
      className={cn(
        "list-decimal list-outside pl-6 space-y-2 text-gray-300 my-5 marker:text-primary",
        className,
      )}
      {...props}
    />
  ),
  li: ({ className, ...props }: MarkdownElementProps<HTMLLIElement>) => (
    <li
      className={cn("leading-relaxed text-gray-300", className)}
      {...props}
    />
  ),
  img: ({ className, ...props }: MarkdownElementProps<HTMLImageElement>) => (
    // eslint-disable-next-line jsx-a11y/alt-text
    <img
      loading="lazy"
      className={cn(
        "rounded-xl border border-neutral-800 shadow-lg shadow-black/30 my-6 w-full h-auto object-cover",
        className,
      )}
      {...props}
    />
  ),
  code: ({ inline, className, children, ...props }: MarkdownCodeProps) => {
    return inline ? (
      <code className={cn("rounded bg-neutral-900/80 px-1.5 py-0.5 text-sm", className)} {...props}>
        {children}
      </code>
    ) : (
      <pre className="!bg-neutral-900 !rounded-xl !p-5 !text-sm sm:!text-base overflow-x-auto mb-6 border border-neutral-800">
        <code className={className} {...props}>{children}</code>
      </pre>
    );
  },
  table: ({ className, ...props }: MarkdownElementProps<HTMLTableElement>) => (
    <div className="overflow-x-auto my-6 rounded-xl border border-neutral-800 bg-neutral-900/60">
      <table
        className={cn(
          "min-w-full divide-y divide-neutral-800 text-sm sm:text-base",
          className,
        )}
        {...props}
      />
    </div>
  ),
  thead: ({ className, ...props }: MarkdownElementProps<HTMLTableSectionElement>) => (
    <thead
      className={cn("bg-neutral-900/80 text-gray-200", className)}
      {...props}
    />
  ),
  tbody: ({ className, ...props }: MarkdownElementProps<HTMLTableSectionElement>) => (
    <tbody
      className={cn("divide-y divide-neutral-800 text-gray-300", className)}
      {...props}
    />
  ),
  th: ({ className, ...props }: MarkdownElementProps<HTMLTableCellElement>) => (
    <th
      className={cn("px-4 py-3 text-left font-semibold uppercase tracking-wide text-xs sm:text-sm", className)}
      {...props}
    />
  ),
  td: ({ className, ...props }: MarkdownElementProps<HTMLTableCellElement>) => (
    <td
      className={cn("px-4 py-3 align-top", className)}
      {...props}
    />
  ),
};

export default function BlogDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  

  const post = blogPosts.find((b) => b.slug === slug);

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

  return (
    <div className="min-h-screen bg-neutral-950 text-gray-200 py-20 px-6 sm:px-10 lg:px-16">
      <article className="max-w-3xl mx-auto space-y-6 sm:space-y-8">
        <SEO
          title={`${post.title} | SkillHigh Blog`}
          description={post.description}
          image={post.image}
          url={`${window.location.origin}/blogs/${post.slug}`}
          meta={[{ property: "og:type", content: "article" }]}
        />
         {/* Back Button */}
         <BackButton to="/blogs" label="Back to all blogs" />

        {/* Blog Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-white font-sans tracking-tight">
          {post.title}
        </h1>

        {/* Date + Read Time */}
        <div className="flex flex-wrap items-center gap-3 text-gray-500 text-sm">
          <span>{post.date}</span>•<span>{post.readTime}</span>
          {(post.categories ?? []).length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              {(post.categories ?? []).map((cat) => (
                <span
                  key={cat}
                  className="inline-flex items-center rounded-full border border-primary/40 bg-primary/10 px-2.5 py-0.5 text-[11px] font-medium text-primary"
                >
                  {cat}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Blog Image */}
        {post.image && (
          <div className="w-full rounded-xl overflow-hidden border border-neutral-800 bg-neutral-900">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        <BlogShare title={post.title} slug={post.slug} className="mt-6" />

        {/* Blog Content (Markdown-rendered) */}
        <div className="prose prose-invert font-serif max-w-none text-gray-300 leading-relaxed lg:prose-lg
                        prose-headings:scroll-mt-20 prose-headings:text-white prose-headings:mt-10 prose-headings:mb-4
                        prose-p:text-gray-300 prose-p:my-5
                        prose-ul:my-5 prose-ol:my-5 prose-li:my-2
                        prose-a:text-primary hover:prose-a:text-white
                        prose-strong:text-white
                        prose-img:rounded-lg prose-img:my-6
                        prose-blockquote:border-l-primary/40 prose-blockquote:text-gray-300 prose-blockquote:my-6
                        prose-code:text-primary
                        prose-pre:bg-neutral-900 prose-pre:text-gray-200 prose-pre:my-6
                        prose-hr:border-neutral-800 prose-hr:my-10">
           <ReactMarkdown
             remarkPlugins={[remarkGfm]}
             components={markdownComponents}
           >
             {post.content || ""}
           </ReactMarkdown>
        </div>

        <BlogShare title={post.title} slug={post.slug} className="mt-10" />
      </article>
    </div>
  );
}
