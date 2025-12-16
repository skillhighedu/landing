import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { type ReactNode, type ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type Variant = "primary" | "secondary" | "success" | "outline";

type CustomButtonProps = {
  title: string;
  icon?: ReactNode;
  isBack?: boolean;
  variant?: Variant;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function CustomButton({
  title,
  icon = <ArrowRight size={18} />,
  isBack = false,
  variant = "primary",
  className,
  ...props
}: CustomButtonProps) {
  const base =
    "text-base sm:text-md px-4 py-5 flex items-center gap-2 cursor-pointer " +
    "pixel-border transition-all duration-300 transform hover:-translate-y-1 " +
    "shadow-[4px_4px_0_#000] hover:shadow-[6px_6px_0_#000]";

  const variants: Record<Variant, string> = {
    primary:
      "bg-primary text-white hover:bg-primary/90",
    secondary:
      "bg-white/10 text-white hover:bg-white/20",
    success:
      "bg-emerald-600 text-white hover:bg-emerald-600/90",
    outline:
      "border border-white/20 text-white bg-transparent hover:bg-white/10",
  };

  return (
    <Button
      aria-label={title}
      className={clsx(base, variants[variant], className)}
      {...props}
    >
      {isBack ? (
        <>
          {icon}
          {title}
        </>
      ) : (
        <>
          {title}
          {icon}
        </>
      )}
    </Button>
  );
}
