export default function OptionButton({ text, active, onClick }: any) {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`
        w-full rounded-lg border px-4 py-3 text-left text-sm sm:text-base
        transition-colors font-sans
        ${
          active
            ? "bg-primary/10 border-primary text-foreground"
            : "bg-background border-border text-foreground hover:bg-muted"
        }
      `}
    >
      {text}
    </button>
  );
}
