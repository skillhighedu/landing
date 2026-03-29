import { lessonMarkdownComponents } from "@/components/common/ContentMarkdownRenderers";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Props {
  description?: string | null;
}

export default function Description({ description }: Props) {
  const hasContent = description && description.trim().length > 0;

  return (
    <div className="w-full">
      {hasContent ? (
        <div className="prose prose-neutral max-w-none font-mono prose-sm dark:prose-invert md:prose-base prose-headings:font-semibold prose-headings:tracking-tight prose-p:text-neutral-600 dark:prose-p:text-neutral-300 prose-p:leading-relaxed prose-a:text-neutral-900 dark:prose-a:text-neutral-100 prose-a:no-underline hover:prose-a:underline prose-code:rounded-md prose-code:bg-neutral-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm prose-code:text-neutral-800 dark:prose-code:bg-neutral-800 dark:prose-code:text-neutral-200 prose-pre:rounded-2xl prose-pre:border prose-pre:border-neutral-800 prose-pre:bg-neutral-950 prose-blockquote:border-l-neutral-300 prose-blockquote:text-neutral-500 dark:prose-blockquote:border-l-neutral-700 prose-hr:border-neutral-100 dark:prose-hr:border-neutral-800">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={lessonMarkdownComponents}
          >
            {description}
          </ReactMarkdown>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-muted/20 px-6 py-14 text-center">
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-neutral-100 dark:bg-neutral-800">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              className="text-neutral-400"
            >
              <path
                d="M3 5h12M3 9h8M3 13h5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <p className="mb-1 text-sm font-medium text-neutral-900 dark:text-neutral-100">
            Notes coming soon
          </p>
          <p className="text-xs font-mono text-neutral-400">Check back later</p>
        </div>
      )}
    </div>
  );
}
