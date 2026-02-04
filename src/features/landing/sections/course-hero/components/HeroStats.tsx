import { HERO_STATS } from "../data";

export default function HeroStats() {
  return (
    <div className="flex flex-wrap gap-x-6 gap-y-3">
      {HERO_STATS.map(({ label, icon: Icon }) => (
        <div
          key={label}
          className="flex items-center gap-2 text-sm text-neutral-400"
        >
          <Icon className="h-4 w-4 text-neutral-300" />
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}
