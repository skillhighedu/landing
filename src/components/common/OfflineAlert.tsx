
import { motion, AnimatePresence } from "framer-motion";
import { WifiOff } from "lucide-react";
import { useNetworkStatus } from "@/hooks/useNetworkStatus";

export default function OfflineAlert() {
  const isOnline = useNetworkStatus();

  return (
    <AnimatePresence>
      {!isOnline && (
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="
            fixed top-0 inset-x-0 z-50
            flex items-center justify-center
            bg-red-600 text-white
            px-4 py-2
          "
        >
          <div className="flex items-center gap-2 text-sm font-medium">
            <WifiOff size={16} />
            No internet connection. Please check your network.
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
