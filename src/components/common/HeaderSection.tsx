import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

interface HeaderSectionProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void; // allow parent to control behavior
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
    <header className="w-full px-4 sm:px-6 py-3">
      <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3">
        {/* Back Button */}
        <div>
          {showBack && (
            <button
              onClick={handleBack}
              aria-label="Go back"
              className="
                inline-flex items-center gap-2
                px-3 py-2 rounded-lg
                bg-white/5 border border-white/10
                text-white/80
                hover:bg-white/10 hover:text-white
                active:scale-95 transition
              "
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline text-sm font-medium">
                Back
              </span>
            </button>
          )}
        </div>

        {/* Title */}
        <div className="text-center">
          {title && (
            <motion.h1
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="
                text-base sm:text-xl md:text-2xl
                font-semibold text-white
                truncate
              "
            >
              {title}
            </motion.h1>
          )}
        </div>

        {/* Right spacer (future actions / avatar) */}
        <div />
      </div>
    </header>
  );
}
