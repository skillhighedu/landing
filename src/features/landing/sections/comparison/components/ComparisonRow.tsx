import type { ComparisonItem } from "../types";

type Props = {
  item: ComparisonItem;
};

export default function ComparisonRow({ item }: Props) {
  return (
    <div
      className={`
        grid grid-cols-1 md:grid-cols-3 gap-4
        rounded-xl border border-neutral-800
        bg-neutral-900/80 p-5
        ${item.highlight ? "ring-1 ring-primary/30" : ""}
      `}
    >
      {/* Feature */}
      <div className="font-medium text-white">
        {item.feature}
      </div>

      {/* Others */}
      <div className="text-sm text-neutral-400">
        {item.others}
      </div>

      {/* SkillHigh */}
      <div className="text-sm text-primary font-medium">
        {item.skillhigh}
      </div>
    </div>
  );
}
