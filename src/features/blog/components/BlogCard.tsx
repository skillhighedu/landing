import React from "react";
import { Clock3 } from "lucide-react";
import { Link } from "react-router-dom";

import type { BlogCardProps } from "../types/types";

function formatBlogDate(date: string) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function getSummary(excerpt: string, content: string) {
  const fallback = content
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/[#>*_\-\[\]()`]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return excerpt.trim() || fallback;
}

const BlogCard: React.FC<BlogCardProps> = ({
  slug,
  title,
  publishedAt,
  readingTime,
  excerpt,
  content,
  thumbnail,
  tags,
  category,
}) => {
  const summary = getSummary(excerpt, content);

  return (
    <Link
      to={`/blogs/${slug}`}
      aria-label={`Read blog: ${title}`}
      className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-neutral-200 bg-white transition-all duration-200 hover:-translate-y-1 hover:border-primary/20 hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900"
    >
      {thumbnail && (
        <div className="aspect-[16/10] overflow-hidden bg-neutral-100 dark:bg-neutral-800">
          <img
            src={thumbnail}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            loading="lazy"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-2">
          {category?.name && (
            <span className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.16em] text-primary">
              {category.name}
            </span>
          )}

          {tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-neutral-300 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-neutral-500 dark:border-neutral-700 dark:text-neutral-300"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-3 font-sans text-xs text-neutral-500 dark:text-neutral-400">
          <span>{formatBlogDate(publishedAt)}</span>
          <span>&bull;</span>
          <span className="inline-flex items-center gap-1.5">
            <Clock3 className="h-3.5 w-3.5" />
            {readingTime} min read
          </span>
        </div>

        <h3 className="mt-4 font-mono text-2xl leading-tight text-neutral-950 transition-colors group-hover:text-primary dark:text-white">
          {title}
        </h3>

        <p className="mt-4 line-clamp-3 font-sans text-sm leading-7 text-neutral-600 dark:text-neutral-300">
          {summary}
        </p>

        <span className="mt-6 font-mono text-sm text-neutral-900 transition-colors group-hover:text-primary dark:text-white">
          Read article
        </span>
      </div>
    </Link>
  );
};

export default BlogCard;
