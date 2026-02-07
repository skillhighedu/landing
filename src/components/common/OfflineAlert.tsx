import { motion, AnimatePresence } from "framer-motion";
import { WifiOff } from "lucide-react";
import { useNetworkStatus } from "@/hooks/useNetworkStatus";

export default function OfflineAlert() {
  const isOnline = useNetworkStatus();

  return (
    <AnimatePresence>
      {!isOnline && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.96 }}
          transition={{ duration: 0.25 }}
          className="
            fixed top-20 left-1/2 -translate-x-1/2
            z-[100]
          "
        >
          <div
            className="
              flex items-center gap-2
              rounded-full
              bg-red-600 text-white
              px-4 py-2
              text-sm font-medium
              shadow-lg
              backdrop-blur
            "
          >
            <WifiOff size={16} />
            No internet connection
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
