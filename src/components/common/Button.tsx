import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { type ReactNode, type ButtonHTMLAttributes } from "react";

type CustomButtonProps = {
  title: string;
  icon?: ReactNode;
  className?: string;
  isBack?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>; // 👈 Inherit all valid button props

export default function CustomButton({
  title,
  icon = <ArrowRight size={20} />,
  className,
  isBack = false,
  ...props // 👈 Forward extra props like data-cal-link
}: CustomButtonProps) {
  return (
    <Button
      className={`bg-green-800 text-white text-base sm:text-md px-4 py-5 hover:bg-primary pixel-border shadow-[4px_4px_0_#000] hover:shadow-[6px_6px_0_#000] transition-all duration-300 transform hover:-translate-y-1 focus:outline-none flex items-center gap-2 cursor-pointer ${className}`}
      aria-label={title}
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
