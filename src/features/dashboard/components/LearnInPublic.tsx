export default function LearnInPublic() {
  return (
    <div
      className="
        rounded-2xl
        border border-white/10
        bg-neutral-900/80
        p-5
        space-y-3
      "
    >
      <h3 className="text-sm font-semibold text-white">
        Learn in Public
      </h3>

      <p className="text-xs text-white/60 leading-relaxed">
        Share what you learned today. Writing reinforces understanding and
        helps others learn with you.
      </p>

      <button
        className="
          w-full rounded-lg
          bg-primary text-white
          text-sm font-medium
          py-2
          hover:bg-primary/90
          transition
        "
      >
        Share Learning
      </button>
    </div>
  );
}
