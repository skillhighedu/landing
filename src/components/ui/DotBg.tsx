import { cn } from "@/lib/utils";
import { DotPattern } from "@/components/magicui/dot-pattern";

export function DotPatternLinearGradient() {
  return (
    <div
      className={cn(
        "absolute inset-0 z-0 pointer-events-none",
        "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)]"
      )}
    >
      <DotPattern width={20} height={20} cx={1} cy={1} cr={1} />
    </div>
  );
}
