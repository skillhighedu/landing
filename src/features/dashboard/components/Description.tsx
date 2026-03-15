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
        <div className="prose prose-neutral font-mono dark:prose-invert max-w-none prose-sm md:prose-base prose-headings:font-semibold prose-headings:tracking-tight prose-p:text-neutral-500 dark:prose-p:text-neutral-400 prose-p:leading-relaxed prose-a:text-neutral-900 dark:prose-a:text-neutral-100 prose-a:no-underline hover:prose-a:underline prose-code:text-neutral-800 dark:prose-code:text-neutral-200 prose-code:bg-neutral-100 dark:prose-code:bg-neutral-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-sm prose-code:font-mono prose-pre:bg-neutral-950 prose-pre:border prose-pre:border-neutral-800 prose-pre:rounded-2xl prose-blockquote:border-l-neutral-300 dark:prose-blockquote:border-l-neutral-700 prose-blockquote:text-neutral-500 prose-hr:border-neutral-100 dark:prose-hr:border-neutral-800">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={lessonMarkdownComponents}
          >
            {description}
          </ReactMarkdown>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-10 h-10 rounded-2xl  bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mb-4">
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
          <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100 mb-1">
            Notes coming soon
          </p>
          <p className="text-xs font-mono text-neutral-400">
            Check back later
          </p>
        </div>
      )}
    </div>
  );
}