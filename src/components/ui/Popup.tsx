import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Trees from "@/assets/images/water.jpg";
import { Calendar } from 'lucide-react';
import BookingMeet from '../BookingModal';

const POPUP_INTERVAL_MINUTES = 10; // Show popup every 10 minutes
const POPUP_LAST_CLOSED_KEY = 'popupLastClosedTime';

const Popup = () => {
  const [open, setOpen] = useState<boolean>(false);

  const checkPopup = () => {
    const lastClosed = localStorage.getItem(POPUP_LAST_CLOSED_KEY);
    const now = Date.now();
    if (!lastClosed || now - parseInt(lastClosed) > POPUP_INTERVAL_MINUTES * 60 * 1000) {
      setOpen(true);
    }
  };

  useEffect(() => {
    checkPopup();
    const interval = setInterval(checkPopup, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
  }, [open]);

  const handleClose = () => {
    setOpen(false);
    localStorage.setItem(POPUP_LAST_CLOSED_KEY, Date.now().toString());
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl shadow-xl w-[75vw] max-w-[1200px] h-[75vh] md:h-[70vh] overflow-hidden flex flex-col md:flex-row bg-neutral-900"
          >
            {/* Left Section - Image */}
            <div className="relative w-full md:w-1/2 hidden sm:block h-1/2 md:h-full">
              <img
                src={Trees}
                alt="Career guidance background"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center p-8">
                <div className="text-white">
                  <h2 className="text-3xl font-bold mb-2">Let's Connect</h2>
                  <p className="text-base">
                    Book a free meeting and clear your doubts about your career!
                  </p>
                </div>
              </div>
            </div>

            {/* Right Section - CTA */}
            <div className="w-full md:w-1/2 p-8 flex flex-col justify-center items-center text-center relative overflow-y-auto">
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-white hover:text-gray-400 text-2xl transition"
                aria-label="Close popup"
              >
                ✕
              </button>

              <h3 className="text-3xl text-primary mb-4 font-bold">
                Book a Free Career Session
              </h3>
              <p className="text-white mb-6 text-lg">
                Have questions about your career? Let’s clear them together!
              </p>
              <BookingMeet title='Book Now' icon={<Calendar />}  />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Popup;
