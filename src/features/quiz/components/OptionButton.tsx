export default function OptionButton({ text, active, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full p-4 rounded-lg border text-left transition
        ${
          active
            ? "bg-green-800 "
            : "bg-zinc-800 border-zinc-700 hover:bg-zinc-700"
        }
      `}
    >
      {text}
    </button>
  );
}
