import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import AppTooltip from "@/components/common/AppTooltip";
import { Button } from "../ui/button";

interface HeaderSectionProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
}

export default function HeaderSection({
  title,
  showBack = true,
  onBack,
}: HeaderSectionProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    onBack ? onBack() : navigate(-1);
  };

  return (
    <header className="w-full ">
      <div className="relative flex items-center  justify-center min-h-[44px] ">
        {/* Back Button */}
        {showBack && (
          <AppTooltip label="Go back">
            <Button
              onClick={handleBack}
              aria-label="Go back"
              className="
                absolute left-0
                inline-flex items-center justify-center
                h-9 w-9 sm:h-10 sm:w-10
                rounded-full
                border
                transition active:scale-95
                  shadow-[0_4px_10px_rgba(0,0,0,0.10)]
    backdrop-blur-md
                bg-black/5 text-neutral-700 border-black/10
                hover:bg-black/10 hover:text-black

                dark:bg-white/5 dark:text-white/70 dark:border-white/10
                dark:hover:bg-white/10 dark:hover:text-white
              "
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          </AppTooltip>
        )}

        {/* Title */}
        {title && (
          <motion.h1
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="
              text-base sm:text-xl md:text-3xl
              font-medium
              truncate text-center
              max-w-[70%]
              text-neutral-900 dark:text-white
              
            "
          >
            {title}
          </motion.h1>
        )}
      </div>
    </header>
  );
}
