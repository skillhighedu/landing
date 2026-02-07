import OptionButton from "./OptionButton";

export default function QuestionCard({ question, selected, onSelect }: any) {
  return (
    <div className="text-foreground">
      <h2 className="text-lg sm:text-xl font-sans mb-5">
        {question.question}
      </h2>

      <div className="grid gap-3">
        {question.options.map((opt: string, i: number) => (
          <OptionButton
            key={i}
            text={opt}
            active={selected.includes(i)}
            onClick={() => onSelect(i)}
          />
        ))}
      </div>
    </div>
  );
}
