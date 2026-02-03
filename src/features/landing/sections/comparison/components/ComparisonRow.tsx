import type { ComparisonItem } from "../types";

type Props = {
  item: ComparisonItem;
};

export default function ComparisonRow({ item }: Props) {
  return (
    <div
      className={`
        grid grid-cols-1 md:grid-cols-3 gap-4
        rounded-xl p-5 transition-all

        /* Light mode */
        bg-white text-neutral-900
        border border-neutral-200

        /* Dark mode */
        dark:bg-neutral-900/80 dark:text-white
        dark:border-neutral-800

        ${item.highlight ? "ring-1 ring-primary/40" : ""}
      `}
    >
      {/* Feature */}
      <div className="font-medium">
        {item.feature}
      </div>

      {/* Others */}
      <div className="text-sm text-neutral-600 dark:text-neutral-400">
        {item.others}
      </div>

      {/* SkillHigh */}
      <div className="text-sm font-medium text-primary">
        {item.skillhigh}
      </div>
    </div>
  );
}
