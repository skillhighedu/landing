import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import AppTooltip from "@/components/common/AppTooltip";
import { Button } from "../ui/button";
import Container from "@/layouts/Container";

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
   <Container size="full">
     <header className="w-full px-4 ">
      <div className="relative flex items-center justify-center">

        {/* Back Button with Tooltip */}
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
                bg-white/5 border border-white/10
                text-white/70
                hover:bg-white/10 hover:text-white
                active:scale-95 cursor-pointer
                transition
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
              text-white
              truncate text-center
              max-w-[70%]
            "
          >
            {title}
          </motion.h1>
        )}
      </div>
    </header>
   </Container>
  );
}
