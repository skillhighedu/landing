import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  CreditCard,
  Wallet,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

import CustomButton from "@/components/common/Button";
import type { PricingModalProps } from "../types";

export default function PricingModal({
  open,
  onClose,
  registrationAmount,
  fullAmount,
  onPay,
}: PricingModalProps) {


  const [isFullPayment, setIsFullPayment] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handlePay = async () => {
    try {
      setLoading(true);
      await onPay(isFullPayment);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ y: 30, scale: 0.96, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 30, scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="
              relative w-full max-w-lg rounded-3xl
              bg-white dark:bg-neutral-900
              text-neutral-900 dark:text-white
              shadow-2xl
            "
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-6">
              <div>
                <h2 className="text-xl sm:text-2xl ">
                  Complete your enrollment
                </h2>
                <p className="text-sm text-neutral-600 font-sans dark:text-neutral-400 mt-1">
                  Choose how you want to pay
                </p>
              </div>

              <button
                onClick={onClose}
                aria-label="Close"
                className="
                  rounded-lg p-2
                  text-neutral-500 hover:text-neutral-900
                  dark:hover:text-white
                "
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Options */}
            <div className="px-6 py-6 space-y-4">
              {/* Pre-registration */}
              <button
                onClick={() => setIsFullPayment(false)}
                className={`
                  relative w-full rounded-2xl p-5 text-left transition
                  border
                  ${
                    !isFullPayment
                      ? "border-primary bg-primary/10"
                      : "border-neutral-200 dark:border-neutral-700 hover:border-primary/60"
                  }
                `}
              >
                {!isFullPayment && (
                  <span className="absolute top-3 right-3 flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-primary text-white">
                    <CheckCircle2 className="w-3 h-3" />
                    Recommended
                  </span>
                )}

                <div className="flex items-start gap-4">
                  <Wallet className="w-6 h-6 text-primary mt-1" />

                  <div className="flex-1">
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">
                      Pre-registration fee
                    </p>
                    <p className="text-2xl sm:text-3xl font-bold text-primary mt-1">
  ₹{Number(registrationAmount || 0).toLocaleString()}
</p>

                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2">
                      Pay the remaining amount later after onboarding
                    </p>
                  </div>
                </div>
              </button>

              {/* Full payment */}
              <button
                onClick={() => setIsFullPayment(true)}
                className={`
                  w-full rounded-2xl p-5 text-left transition
                  border
                  ${
                    isFullPayment
                      ? "border-primary bg-primary/10"
                      : "border-neutral-200 dark:border-neutral-700 hover:border-primary/60"
                  }
                `}
              >
                <div className="flex items-start gap-4">
                  <CreditCard className="w-6 h-6 text-primary mt-1" />

                  <div className="flex-1">
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">
                      Full course fee
                    </p>
                    <p className="text-2xl sm:text-3xl font-bold text-primary mt-1">
                      ₹{fullAmount.toLocaleString()}
                    </p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2">
                      One-time payment. No further charges.
                    </p>
                  </div>
                </div>
              </button>
            </div>

            {/* CTA */}
            <div className="px-6 pb-6 space-y-4">
              <CustomButton
                title={loading ? "Processing…" : "Secure my seat"}
                onClick={handlePay}
                disabled={loading}
                className="w-full text-base"
              />

              <div className="flex items-center justify-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
                <ShieldCheck className="w-4 h-4" />
                Secure payment • Instant confirmation
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
