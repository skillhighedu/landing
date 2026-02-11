import { lessonMarkdownComponents } from "@/components/common/ContentMarkdownRenderers";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Props {
  description?: string | null;
}

export default function Description({ description }: Props) {
  const markdownContent =
    description && description.trim().length > 0
      ? description
      : "### Notes will be updated soon.";

  return (
    <div className="w-full">
      <div
        className="
          rounded-2xl
          border border-border
          bg-card
          shadow-sm
          p-3 sm:p-6 lg:p-6
        "
      >
        <div className="prose dark:prose-invert max-w-none font-sans">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={lessonMarkdownComponents}
          >
            {markdownContent}
          </ReactMarkdown>

          Notes will be updated soon.
        </div>
      </div>
    </div>
  );
}
