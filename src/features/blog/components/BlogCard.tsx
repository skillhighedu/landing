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
  category = [],
}) => {
  return (
    <Link
      to={`/blogs/${slug}`}
      aria-label={`Read blog: ${title}`}
      className="group rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 hover:border-neutral-700 hover:bg-neutral-800 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary block"
    >
      {thumbnail && (
        <div className="overflow-hidden aspect-video bg-neutral-800">
          <img
            src={thumbnail}
            alt={title}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </div>
      )}

      <div className="p-5 space-y-3">
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 3).map((cat) => (
              <span
                key={cat}
                className="inline-flex items-center rounded-full border border-primary/40 bg-primary/10 px-2.5 py-0.5 text-[11px] font-medium text-primary"
              >
                {cat}
              </span>
            ))}
          </div>
        )}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>{(publishedAt)}</span>
          <span>{readingTime}min</span>
        </div>

        <h3 className="text-base sm:text-lg font-bricolage text-white group-hover:text-primary transition-colors duration-200">
          {title}
        </h3>

        <p className="text-sm text-gray-400 font-sans leading-relaxed line-clamp-3">
          {content}
        </p>

        <span className="mt-3 inline-block text-sm font-medium text-primary group-hover:text-white transition-colors">
          Read More 
        </span>
      </div>
    </Link>
  );
};

export default BlogCard;
