
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  MessageSquare,
  X,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const POPUP_INTERVAL_MINUTES = 30;
const POPUP_LAST_CLOSED_KEY = 'popupLastClosedTime';

export default function Popup() {
  const [open, setOpen] = useState(false);

  const checkPopup = () => {
    const lastClosed = localStorage.getItem(POPUP_LAST_CLOSED_KEY);
    const now = Date.now();

    if (
      !lastClosed ||
      now - Number(lastClosed) > POPUP_INTERVAL_MINUTES * 60 * 1000
    ) {
      setOpen(true);
    }
  };

  useEffect(() => {
    checkPopup();
    const interval = setInterval(checkPopup, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const closePopup = () => {
    setOpen(false);
    localStorage.setItem(
      POPUP_LAST_CLOSED_KEY,
      Date.now().toString()
    );
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="
            fixed inset-0 z-50
            flex items-center justify-center p-4
            bg-black/60 dark:bg-black/70
            backdrop-blur-sm
          "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closePopup}
        >
          <motion.div
            initial={{ scale: 0.96, opacity: 0, y: 24 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: 24 }}
            transition={{ type: 'spring', damping: 24, stiffness: 260 }}
            onClick={(e) => e.stopPropagation()}
            className="
              relative w-full max-w-md
              rounded-2xl p-7
              bg-white dark:bg-neutral-900
              border border-neutral-200 dark:border-neutral-800
              shadow-xl
            "
          >
            {/* Accent Badge */}
            <div
              className="
                mb-6 inline-flex items-center gap-2
                rounded-full px-3 py-1
                bg-primary/10 text-primary
                border border-primary/30
              "
            >
              <Sparkles size={14} />
              <span className="text-xs font-medium">
                Free guidance session
              </span>
            </div>

            {/* Close */}
            <button
              onClick={closePopup}
              aria-label="Close"
              className="
                absolute right-3 top-3 p-2 rounded-md
                text-neutral-400
                hover:text-neutral-900 dark:hover:text-white
                hover:bg-neutral-100 dark:hover:bg-neutral-800
                transition
              "
            >
              <X size={18} />
            </button>

            {/* Title */}
            <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-3">
              Need career clarity?
            </h2>

            {/* Description */}
            <p className="text-sm leading-relaxed mb-7 text-neutral-600 dark:text-neutral-400">
              Talk to a mentor, ask your questions, and get honest guidance —
              no pressure, no sales pitch.
            </p>

            {/* Value points */}
            <div className="space-y-4 mb-7">
              <div className="flex items-start gap-3">
                <Calendar size={18} className="text-primary mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-neutral-900 dark:text-white">
                    30-minute call
                  </p>
                  <p className="text-xs text-neutral-500">
                    Book at a time that works for you
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MessageSquare size={18} className="text-primary mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-neutral-900 dark:text-white">
                    1-on-1 guidance
                  </p>
                  <p className="text-xs text-neutral-500">
                    Real advice from experienced mentors
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Button
                onClick={closePopup}
                className="
                  w-full h-11
                  bg-primary text-primary-foreground
                  hover:bg-primary/90
                  rounded-md
                  flex items-center justify-center gap-2
                "
              >
                Book free session
                <ArrowRight size={16} />
              </Button>

              <button
                onClick={closePopup}
                className="
                  w-full text-sm font-medium
                  text-neutral-500
                  hover:text-neutral-900 dark:hover:text-white
                  transition
                "
              >
                Maybe later
              </button>
            </div>

            {/* Footer note */}
            <p className="mt-6 text-center text-xs text-neutral-500">
              Trusted by 500+ learners and professionals
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
