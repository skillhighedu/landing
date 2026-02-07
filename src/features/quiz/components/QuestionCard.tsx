import OptionButton from "./OptionButton";

export default function QuestionCard({ question, selected, onSelect }: any) {
  if (!question) return null;

  return (
    <div className="text-foreground">

      <div className="grid gap-3">
        {question.answers?.map((opt: any, i: number) => (
          <OptionButton
            key={opt.id}
            text={opt.text}
            active={selected.includes(i)}
            onClick={() => onSelect(i)}
          />
        ))}
      </div>
    </div>
  );
}
