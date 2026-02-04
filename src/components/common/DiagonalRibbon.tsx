'use client';

type RibbonType = 'FIRE' | 'HOT' | 'WAVE' | 'RISING' | 'ACTIVE' | 'NEW';

type Props = {
  label: RibbonType;
};

const ribbonStyles: Record<RibbonType, string> = {
  FIRE: "bg-red-500",
  HOT: "bg-amber-400",
  WAVE: "bg-pink-500",
  RISING: "bg-indigo-500",
  ACTIVE: "bg-emerald-500",
  NEW: "bg-sky-500",
};

export default function DiagonalRibbon({ label }: Props) {
  return (
    <div className="absolute -left-16 top-8 z-20 pointer-events-none">
      <div
        className={`
          relative
          -rotate-45
          ${ribbonStyles[label]}
          bg-gradient-to-r
          px-20 py-2.5
          text-[15px] uppercase tracking-[0.22em]
          text-white
          shadow-[0_10px_20px_rgba(0,0,0,0.45),_0_25px_45px_rgba(0,0,0,0.35)]
ring-1 ring-black/20

          overflow-hidden
        `}
      >
        {label}

        {/* continuous subtle shine */}
        <span
  className="
    pointer-events-none
    absolute top-0 left-[-60%]
    h-full w-[40%]
    bg-gradient-to-r
    from-transparent via-white/25 to-transparent
    skew-x-[-20deg]
    animate-[ribbon-shine_2s_linear_infinite]
    will-change-transform
  "
/>

      </div>
    </div>
  );
}
