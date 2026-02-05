import { cn } from "@/lib/utils";
import type { Components } from "react-markdown";

export const lessonMarkdownComponents: Components = {
  h2: ({ className, ...props }) => (
    <h2
      className={cn(
        "mt-8 mb-3 text-xl sm:text-2xl font-semibold text-neutral-900 dark:text-white",
        className
      )}
      {...props}
    />
  ),

  h3: ({ className, ...props }) => (
    <h3
      className={cn(
        "mt-6 mb-2 text-lg sm:text-xl font-semibold text-neutral-900 dark:text-white",
        className
      )}
      {...props}
    />
  ),

  p: ({ className, ...props }) => (
    <p
      className={cn(
        "my-4 text-sm sm:text-base leading-relaxed text-neutral-700 dark:text-white/70",
        className
      )}
      {...props}
    />
  ),

  blockquote: ({ className, ...props }) => (
    <blockquote
      className={cn(
        `
        my-4 rounded-r-lg border-l-4 px-4 py-3 italic
        border-primary/40
        bg-neutral-100 text-neutral-800
        dark:bg-neutral-900/60 dark:text-white/80
        `,
        className
      )}
      {...props}
    />
  ),

  code: ({ inline, className, children, ...props }: any) =>
    inline ? (
      <code
        className={cn(
          `
          rounded px-1.5 py-0.5 text-sm font-mono
          bg-neutral-100 text-primary
          dark:bg-neutral-800 dark:text-primary
          `,
          className
        )}
        {...props}
      >
        {children}
      </code>
    ) : (
      <pre
        className="
          my-4 overflow-x-auto rounded-xl border
          bg-neutral-900 text-neutral-100
          border-neutral-800
          p-4 text-sm
        "
      >
        <code className={className} {...props}>
          {children}
        </code>
      </pre>
    ),

  ul: ({ className, ...props }) => (
    <ul
      className={cn(
        "my-4 list-disc space-y-2 pl-5 text-neutral-700 dark:text-white/70",
        className
      )}
      {...props}
    />
  ),

  li: ({ className, ...props }) => (
    <li
      className={cn(
        "leading-relaxed",
        className
      )}
      {...props}
    />
  ),
};
