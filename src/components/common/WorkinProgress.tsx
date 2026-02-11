
export default function WorkinProgress() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div
        className="
          text-center
          max-w-md w-full
          rounded-2xl
          border
          border-neutral-200 dark:border-neutral-800
          bg-white dark:bg-neutral-900
          shadow-sm
          p-10
        "
      >
        <div className="text-4xl mb-4">🚧</div>

        <h2 className="text-xl  text-neutral-900 dark:text-white mb-2">
          Work in Progress
        </h2>

        <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed font-sans">
          This section is currently under development. We’re working hard to
          bring this feature to you soon. Please check back later.
        </p>
      </div>
    </div>
  );
}
