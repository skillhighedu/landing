import { Lock } from "lucide-react";
import FakeCard from "./FakeCard";

export default function DemoPreviewCard() {
  return (
    <div className="relative flex justify-center">
      <div
        className="
          relative w-full max-w-md
          overflow-hidden
          rounded-2xl
          border border-neutral-200 dark:border-neutral-800
          bg-neutral-100 dark:bg-neutral-900
        "
      >
        {/* Fake top bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-neutral-200 dark:border-neutral-800">
          <div className="h-3 w-3 rounded-full bg-red-400" />
          <div className="h-3 w-3 rounded-full bg-yellow-400" />
          <div className="h-3 w-3 rounded-full bg-green-400" />
        </div>

        {/* Fake dashboard */}
        <div className="p-4 space-y-4">
          <FakeCard />
          <div className="grid grid-cols-2 gap-4">
            <FakeCard />
            <FakeCard />
          </div>
        </div>

        {/* Locked overlay */}
        <div className="absolute inset-0 bg-white/60 dark:bg-black/60 backdrop-blur-[2px] flex items-center justify-center">
          <div className="flex items-center gap-2 text-sm font-medium text-neutral-700 dark:text-neutral-200">
            <Lock size={16} />
            Demo preview
          </div>
        </div>
      </div>
    </div>
  );
}
