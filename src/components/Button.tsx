import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { type ReactNode, type ButtonHTMLAttributes } from "react";

type CustomButtonProps = {
  title: string;
  icon?: ReactNode;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>; // 👈 Inherit all valid button props

export default function CustomButton({
  title,
  icon = <ArrowRight size={20} />,
  className,
  ...props // 👈 Catch all unknown props like data-cal-link
}: CustomButtonProps) {
  return (
    <Button
      className={`bg-green-800 text-white text-base sm:text-md py-3 px-6 sm:py-4 sm:px-8 hover:bg-primary pixel-border shadow-[4px_4px_0_#000] hover:shadow-[6px_6px_0_#000] transition-all duration-300 transform hover:-translate-y-1 focus:outline-none flex items-center gap-2 cursor-pointer ${className}`}
      aria-label={title}
      {...props} // 👈 Forward all props
    >
      {title}
      {icon}
    </Button>
  );
}
