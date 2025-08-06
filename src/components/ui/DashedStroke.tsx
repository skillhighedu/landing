

import { cn } from "@/lib/utils";
import { GridPattern } from "@/components/magicui/grid-pattern";

export function GridPatternDashed() {
  return (
    <div   className={cn("absolute inset-0 z-0 pointer-events-none",
      
          "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] ",
        )}>
      <GridPattern
        width={20}
        height={20}
        x={-1}
        y={-1}
       
      />
    </div>
  );
}
