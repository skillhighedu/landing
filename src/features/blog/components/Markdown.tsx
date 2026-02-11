import { type HTMLAttributes } from "react";
import  { type Components } from "react-markdown";
import { cn } from "@/lib/utils";


type MarkdownElementProps<T extends HTMLElement = HTMLElement> = HTMLAttributes<T> & {
  node?: unknown;
};

type MarkdownCodeProps = MarkdownElementProps<HTMLElement> & {
  inline?: boolean;
};

export const markdownComponents: Components = {
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
      <pre className="bg-neutral-900! rounded-xl! p-5! text-sm! sm:text-base! overflow-x-auto mb-6 border border-neutral-800">
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