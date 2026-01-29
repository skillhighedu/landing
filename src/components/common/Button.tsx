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
    "border border-border rounded-md transition-all duration-300 transform hover:-translate-y-1 " +
    "shadow-[4px_4px_0_#000] dark:shadow-[4px_4px_0_rgba(255,255,255,0.18)] " +
    "hover:shadow-[6px_6px_0_#000] dark:hover:shadow-[6px_6px_0_rgba(255,255,255,0.22)]";

  const variants: Record<Variant, string> = {
    primary:
      "bg-primary text-primary-foreground hover:opacity-90",
    secondary:
      "bg-secondary text-secondary-foreground hover:opacity-90",
    success:
      "bg-emerald-600 text-white hover:opacity-90",
    outline:
      "bg-transparent text-foreground hover:bg-muted",
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
