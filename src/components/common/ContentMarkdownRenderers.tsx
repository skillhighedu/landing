
import { cn } from "@/lib/utils";
import type { Components } from "react-markdown";

export const lessonMarkdownComponents: Components = {
  h2: ({ className, ...props }) => (
    <h2
      className={cn("text-xl sm:text-2xl font-semibold text-white mt-8 mb-3", className)}
      {...props}
    />
  ),
  h3: ({ className, ...props }) => (
    <h3
      className={cn("text-lg sm:text-xl font-semibold text-white mt-6 mb-2", className)}
      {...props}
    />
  ),
  p: ({ className, ...props }) => (
    <p
      className={cn("text-sm sm:text-base text-white/70 leading-relaxed my-4", className)}
      {...props}
    />
  ),
  blockquote: ({ className, ...props }) => (
    <blockquote
      className={cn(
        "border-l-4 border-primary/40 bg-neutral-900/60 px-4 py-3 italic text-white/80 rounded-r-lg my-4",
        className,
      )}
      {...props}
    />
  ),
  code: ({ inline, className, children, ...props }: any) =>
    inline ? (
      <code
        className={cn(
          "rounded bg-neutral-900 px-1.5 py-0.5 text-sm text-primary",
          className,
        )}
        {...props}
      >
        {children}
      </code>
    ) : (
      <pre className="bg-neutral-900 rounded-xl p-4 text-sm overflow-x-auto border border-neutral-800 my-4">
        <code className={className} {...props}>
          {children}
        </code>
      </pre>
    ),
  ul: ({ className, ...props }) => (
    <ul
      className={cn("list-disc pl-5 space-y-2 text-white/70 my-4", className)}
      {...props}
    />
  ),
  li: ({ className, ...props }) => (
    <li className={cn("leading-relaxed", className)} {...props} />
  ),
};  