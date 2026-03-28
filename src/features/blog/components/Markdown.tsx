import { Children, isValidElement, type HTMLAttributes, type ReactNode } from "react";
import { type Components } from "react-markdown";
import { cn } from "@/lib/utils";

type MarkdownElementProps<T extends HTMLElement = HTMLElement> = HTMLAttributes<T> & {
  node?: unknown;
};

type MarkdownCodeProps = MarkdownElementProps<HTMLElement> & {
  inline?: boolean;
  children?: ReactNode;
};

function isImageOnlyParagraph(children: ReactNode) {
  const nodes = Children.toArray(children).filter(Boolean);

  if (nodes.length !== 1) return false;

  const onlyNode = nodes[0];
  return isValidElement(onlyNode) && onlyNode.type === "img";
}

export const markdownComponents: Components = {
  h1: ({ className, ...props }: MarkdownElementProps<HTMLHeadingElement>) => (
    <h1 className={cn("mt-12 font-mono text-4xl leading-tight text-neutral-950 dark:text-white", className)} {...props} />
  ),
  h2: ({ className, ...props }: MarkdownElementProps<HTMLHeadingElement>) => (
    <h2 className={cn("mt-14 font-mono text-3xl leading-tight text-neutral-950 dark:text-white", className)} {...props} />
  ),
  h3: ({ className, ...props }: MarkdownElementProps<HTMLHeadingElement>) => (
    <h3 className={cn("mt-12 font-mono text-2xl leading-tight text-neutral-950 dark:text-white", className)} {...props} />
  ),
  h4: ({ className, ...props }: MarkdownElementProps<HTMLHeadingElement>) => (
    <h4 className={cn("mt-10 font-mono text-xl leading-tight text-neutral-950 dark:text-white", className)} {...props} />
  ),
  h5: ({ className, ...props }: MarkdownElementProps<HTMLHeadingElement>) => (
    <h5 className={cn("mt-8 font-mono text-lg leading-tight text-neutral-950 dark:text-white", className)} {...props} />
  ),
  h6: ({ className, ...props }: MarkdownElementProps<HTMLHeadingElement>) => (
    <h6 className={cn("mt-8 font-mono text-base uppercase tracking-[0.14em] text-neutral-700 dark:text-neutral-300", className)} {...props} />
  ),
  p: ({ className, children, ...props }: MarkdownElementProps<HTMLParagraphElement>) => {
    if (isImageOnlyParagraph(children)) {
      return <div className="my-8">{children}</div>;
    }

    return (
      <p
        className={cn("my-6 font-sans text-[1.05rem] leading-8 text-neutral-700 dark:text-neutral-300", className)}
        {...props}
      >
        {children}
      </p>
    );
  },
  strong: ({ className, ...props }: MarkdownElementProps<HTMLElement>) => (
    <strong className={cn("font-semibold text-neutral-950 dark:text-white", className)} {...props} />
  ),
  em: ({ className, ...props }: MarkdownElementProps<HTMLElement>) => (
    <em className={cn("italic text-neutral-700 dark:text-neutral-300", className)} {...props} />
  ),
  del: ({ className, ...props }: MarkdownElementProps<HTMLElement>) => (
    <del className={cn("text-neutral-500 decoration-neutral-400 dark:text-neutral-400", className)} {...props} />
  ),
  a: ({ className, ...props }: MarkdownElementProps<HTMLAnchorElement>) => (
    <a
      target="_blank"
      rel="noopener noreferrer"
      className={cn("text-primary underline underline-offset-4 transition hover:opacity-80", className)}
      {...props}
    />
  ),
  hr: () => <div className="my-10 h-px bg-neutral-200 dark:bg-neutral-800" />,
  blockquote: ({ className, ...props }: MarkdownElementProps<HTMLQuoteElement>) => (
    <blockquote
      className={cn(
        "my-8 rounded-r-2xl border-l-4 border-primary bg-primary/5 px-6 py-4 font-sans text-neutral-700 dark:text-neutral-300",
        className,
      )}
      {...props}
    />
  ),
  ul: ({ className, ...props }: MarkdownElementProps<HTMLUListElement>) => (
    <ul className={cn("my-6 list-disc space-y-3 pl-6 font-sans text-neutral-700 marker:text-primary dark:text-neutral-300", className)} {...props} />
  ),
  ol: ({ className, ...props }: MarkdownElementProps<HTMLOListElement>) => (
    <ol className={cn("my-6 list-decimal space-y-3 pl-6 font-sans text-neutral-700 marker:text-primary dark:text-neutral-300", className)} {...props} />
  ),
  li: ({ className, ...props }: MarkdownElementProps<HTMLLIElement>) => (
    <li className={cn("leading-8 [&>input]:mr-3 [&>input]:translate-y-[1px]", className)} {...props} />
  ),
  input: ({ className, type, checked, disabled, ...props }: MarkdownElementProps<HTMLInputElement>) => (
    <input
      type={type}
      checked={checked}
      disabled={disabled ?? true}
      readOnly
      className={cn("h-4 w-4 rounded border-neutral-300 text-primary accent-primary dark:border-neutral-700", className)}
      {...props}
    />
  ),
  img: ({ className, alt, ...props }: MarkdownElementProps<HTMLImageElement>) => (
    // eslint-disable-next-line jsx-a11y/alt-text
    <img
      loading="lazy"
      alt={alt}
      className={cn(
        "h-auto w-full rounded-[1.5rem] border border-neutral-200 object-contain dark:border-neutral-800",
        className,
      )}
      {...props}
    />
  ),
  code: ({ inline, className, children, ...props }: MarkdownCodeProps) => {
    if (inline) {
      return (
        <code
          className={cn(
            "rounded-md border border-neutral-200 bg-neutral-50 px-1.5 py-0.5 font-mono text-[0.92em] text-neutral-700 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200",
            className,
          )}
          {...props}
        >
          {children}
        </code>
      );
    }

    return (
      <div className="my-8 overflow-hidden rounded-[1.5rem] border border-neutral-200 dark:border-neutral-800">
        <pre className="overflow-x-auto bg-neutral-50 p-5 font-mono text-sm dark:bg-neutral-900">
          <code className={className} {...props}>
            {children}
          </code>
        </pre>
      </div>
    );
  },
  pre: ({ className, ...props }: MarkdownElementProps<HTMLPreElement>) => (
    <pre className={cn("my-8 overflow-x-auto rounded-[1.5rem] border border-neutral-200 bg-neutral-50 p-5 font-mono text-sm dark:border-neutral-800 dark:bg-neutral-900", className)} {...props} />
  ),
  table: ({ className, ...props }: MarkdownElementProps<HTMLTableElement>) => (
    <div className="my-8 overflow-x-auto rounded-[1.5rem] border border-neutral-200 dark:border-neutral-800">
      <table className={cn("min-w-full border-collapse text-left", className)} {...props} />
    </div>
  ),
  thead: ({ className, ...props }: MarkdownElementProps<HTMLTableSectionElement>) => (
    <thead className={cn("bg-neutral-100 dark:bg-neutral-900", className)} {...props} />
  ),
  tbody: ({ className, ...props }: MarkdownElementProps<HTMLTableSectionElement>) => (
    <tbody className={cn("divide-y divide-neutral-200 dark:divide-neutral-800", className)} {...props} />
  ),
  tr: ({ className, ...props }: MarkdownElementProps<HTMLTableRowElement>) => (
    <tr className={cn("align-top", className)} {...props} />
  ),
  th: ({ className, ...props }: MarkdownElementProps<HTMLTableCellElement>) => (
    <th className={cn("px-4 py-3 font-mono text-xs uppercase tracking-[0.16em] text-neutral-700 dark:text-neutral-300", className)} {...props} />
  ),
  td: ({ className, ...props }: MarkdownElementProps<HTMLTableCellElement>) => (
    <td className={cn("px-4 py-3 font-sans text-sm text-neutral-700 dark:text-neutral-300", className)} {...props} />
  ),
};
