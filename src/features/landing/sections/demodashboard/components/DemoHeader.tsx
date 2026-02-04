import { LayoutDashboard } from "lucide-react";

export default function DemoHeader() {
  return (
    <>
      <span className="inline-flex items-center gap-2 text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
        <LayoutDashboard size={14} />
        Dashboard Preview
      </span>

      <h2 className="mt-6 text-3xl sm:text-4xl font-semibold leading-tight">
        This is where
        <br />
        <span className="text-primary">real learning happens</span>
      </h2>

      <p className="mt-5 font-sans text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
        Once you enroll, you don’t just watch videos.
        You get a focused learning workspace to track progress,
        build projects, and stay accountable.
      </p>
    </>
  );
}
