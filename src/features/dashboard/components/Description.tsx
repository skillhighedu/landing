import { lessonMarkdownComponents } from "@/components/common/ContentMarkdownRenderers";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Description() {
  const LESSON_MARKDOWN = `
## Lesson Objective

In this lesson, you’ll understand how **React components** are structured and how data flows inside an application.

---

## Topics Covered

- Component anatomy
- Props vs State
- Controlled vs uncontrolled components
- Common beginner mistakes

---

## Component Example

\`\`\`tsx
type ButtonProps = {
  label: string;
  onClick: () => void;
};

export function Button({ label, onClick }: ButtonProps) {
  return (
    <button onClick={onClick}>
      {label}
    </button>
  );
}
\`\`\`

---

## Key Notes

> Keep components **small and focused**.  
> If a component exceeds ~200 lines, split it.

---

## Summary

After completing this lesson, you should be comfortable with:
- Writing clean components
- Passing data via props
- Avoiding unnecessary state
`;

  return (
    <div className="w-full">
      <div
        className="
          rounded-2xl
          border border-border
          bg-card
          shadow-sm
          p-3 sm:p-6 lg:p-2
        "
      >
        <div className="prose dark:prose-invert max-w-none font-sans">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={lessonMarkdownComponents}
          >
            {LESSON_MARKDOWN}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
