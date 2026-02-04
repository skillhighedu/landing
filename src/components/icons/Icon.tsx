import type { LucideIcon } from "lucide-react";
import clsx from "clsx";

type IconProps = {
  icon: LucideIcon;
  size?: number;
  className?: string;
  strokeWidth?: number;
};

export default function Icon({
  icon: IconComponent,
  size = 20,
  strokeWidth = 2, // slightly thicker for pixel feel
  className,
}: IconProps) {
  return (
    <IconComponent
      size={size}
      strokeWidth={strokeWidth}
      strokeLinecap="square"
      strokeLinejoin="miter"
      className={clsx(
        "shrink-0 pixel-icon",
        className
      )}
    />
  );
}
