import React from "react";
import { Link } from "react-router-dom";
import type { BlogCardProps } from "../types/types";

const BlogCard: React.FC<BlogCardProps> = ({
  slug,
  title,
  publishedAt,
  readingTime,
  content,
  thumbnail,
  tags,
}) => {
  return (
    <Link
      to={`/blogs/${slug}`}
      aria-label={`Read blog: ${title}`}
      className="
        group block overflow-hidden rounded-2xl border transition-all duration-300
        focus:outline-none focus-visible:ring-2 focus-visible:ring-primary

        bg-card text-card-foreground border-border
        hover:bg-muted/50 hover:border-border
      "
    >
      {thumbnail && (
        <div className="overflow-hidden aspect-video bg-muted">
          <img
            src={thumbnail}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      )}

      <div className="p-5 space-y-3">
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="
                  inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium
                  border-primary/40 bg-primary/10 text-primary
                "
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{publishedAt}</span>
          <span>{readingTime}min</span>
        </div>

        <h3 className="text-base sm:text-lg font-bricolage transition-colors duration-200 group-hover:text-primary">
          {title}
        </h3>

        <p className="text-sm text-muted-foreground font-sans leading-relaxed line-clamp-3">
          {content}
        </p>

        <span className="mt-3 inline-block text-sm font-medium text-primary group-hover:text-foreground transition-colors">
          Read More
        </span>
      </div>
    </Link>
  );
};

export default BlogCard;
