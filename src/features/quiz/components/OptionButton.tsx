import { CheckCircle2 } from "lucide-react";

interface OptionButtonProps {
  index: number;
  text: string;
  active: boolean;
  onClick: () => void;
}

export default function OptionButton({
  index,
  text,
  active,
  onClick,
}: OptionButtonProps) {
  const optionLabel = String.fromCharCode(65 + index);

  return (
    <button
      onClick={onClick}
      type="button"
      className={`
        w-full rounded-2xl border px-4 py-4 text-left text-sm sm:px-5 sm:py-5 sm:text-base
        transition-all duration-200 font-mono
        flex items-start gap-3 sm:gap-4
        ${
          active
            ? "border-primary bg-primary/10 text-foreground shadow-sm ring-2 ring-primary/10"
            : "border-border bg-background text-foreground hover:border-primary/30 hover:bg-muted/60"
        }
      `}
    >
      <span
        className={`mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs font-semibold ${
          active
            ? "border-primary bg-primary text-primary-foreground"
            : "border-border bg-muted text-muted-foreground"
        }`}
      >
        {optionLabel}
      </span>

      <span className="min-w-0 flex-1 leading-6">{text}</span>

      <span className="shrink-0 pt-1">
        <CheckCircle2
          className={`h-5 w-5 transition-opacity ${active ? "opacity-100 text-primary" : "opacity-20 text-muted-foreground"}`}
        />
      </span>
    </button>
  );
}
