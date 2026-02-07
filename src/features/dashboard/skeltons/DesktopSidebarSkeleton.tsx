export default function DesktopSidebarSkeleton() {
  return (
    <aside
      className="
        fixed left-0 top-0 z-40
        hidden lg:flex
        h-screen w-16
        flex-col
        bg-white dark:bg-neutral-900
        border-r border-neutral-200 dark:border-neutral-800
      "
    >
      <div className="flex flex-col gap-3 pt-20 px-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="h-10 w-10 rounded-md bg-neutral-200 dark:bg-neutral-800 animate-pulse"
          />
        ))}
      </div>
    </aside>
  );
}
