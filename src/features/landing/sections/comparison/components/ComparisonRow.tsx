import type { ComparisonItem } from "../types";
import Logo from "@/assets/logo.png";

type Props = {
  item: ComparisonItem;
};

export default function ComparisonRow({ item }: Props) {
  return (
    <div
      className={`
        grid grid-cols-1 md:grid-cols-3 gap-4
        rounded-2xl p-5 transition-all

        /* Light */
        bg-neutral-50 text-neutral-900
        hover:bg-neutral-100

        /* Dark */
        dark:bg-neutral-900/60 dark:text-white
        dark:hover:bg-neutral-900

        ${item.highlight ? "shadow-sm" : ""}
      `}
    >
      {/* Feature */}
      <div className="font-medium text-sm">
        {item.feature}
      </div>

      {/* Others */}
      <div className="text-sm text-neutral-600 dark:text-neutral-400">
        {item.others}
      </div>

      {/* SkillHigh */}
      <div
        className={`
          flex items-center gap-2
          text-sm font-semibold text-primary
          rounded-xl px-3 py-2

          bg-primary/10
        `}
      >
        <img
          src={Logo}
          alt="SkillHigh"
          className="h-4 w-auto"
        />
        <span>{item.skillhigh}</span>
      </div>
    </div>
  );
}
