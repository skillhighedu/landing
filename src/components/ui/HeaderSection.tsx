import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

interface HeaderSectionProps {
  title?: string;
  showBack?: boolean;
  isUser?: boolean; // new flag
}

export default function HeaderSection({
  title,
  showBack = true,
  isUser = false,
}: HeaderSectionProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (isUser) {
      navigate("/all-courses"); // safe redirect for user pages
    } else {
      navigate(-1);
    }
  };

  return (
    <header className="flex items-center justify-between w-full max-w-7xl mx-auto px-4 sm:px-6 py-3">
      {showBack ? (
        <motion.button
          onClick={handleBack}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 text-gray-700 
                     hover:bg-gray-200 hover:text-gray-900 
                     active:bg-gray-300 transition-colors shadow-sm cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="hidden sm:inline text-sm sm:text-base font-medium">Back</span>
        </motion.button>
      ) : (
        <div className="w-[76px]" /> // placeholder to center title if no back button
      )}

      {title && (
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center text-xl sm:text-2xl md:text-3xl text-white font-semibold pixel-font leading-tight flex-1"
        >
          {title}
        </motion.h1>
      )}

      <div className="w-[76px]" /> {/* placeholder for symmetry */}
    </header>
  );
}
