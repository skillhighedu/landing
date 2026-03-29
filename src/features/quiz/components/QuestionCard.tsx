import type { QuestionDTO } from "../types";
import OptionButton from "./OptionButton";

interface QuestionCardProps {
  question: QuestionDTO | null | undefined;
  selected: number[];
  onSelect: (index: number) => void;
}

export default function QuestionCard({
  question,
  selected,
  onSelect,
}: QuestionCardProps) {
  if (!question) return null;

  return (
    <div className="text-foreground">
      <div className="grid gap-3 sm:gap-4">
        {question.answers?.map((opt, i) => (
          <OptionButton
            key={opt.id}
            index={i}
            text={opt.text}
            active={selected.includes(i)}
            onClick={() => onSelect(i)}
          />
        ))}
      </div>
    </div>
  );
}
