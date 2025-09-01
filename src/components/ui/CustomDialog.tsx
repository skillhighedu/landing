import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface CustomDialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export function CustomDialog({ isOpen, onClose, children, className = "" }: CustomDialogProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-[9999]"
            onClick={onClose}
          />
          
          {/* Dialog Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[10000] bg-neutral-900 border border-neutral-800 rounded-3xl shadow-2xl max-w-[95vw] overflow-hidden ${className}`}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-neutral-800 hover:bg-neutral-700 transition-colors text-white hover:text-neutral-300"
            >
              <X size={20} />
            </button>
            
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export function CustomDialogHeader({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`p-6 pb-0 ${className}`}>
      {children}
    </div>
  );
}

export function CustomDialogTitle({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={`text-2xl font-semibold text-white ${className}`}>
      {children}
    </h2>
  );
}

export function CustomDialogDescription({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`text-neutral-400 mt-2 ${className}`}>
      {children}
    </p>
  );
}

export function CustomDialogContent({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`px-6 ${className}`}>
      {children}
    </div>
  );
}

export function CustomDialogFooter({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`p-6 pt-0 ${className}`}>
      {children}
    </div>
  );
}
