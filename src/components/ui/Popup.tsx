import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Trees from "@/assets/images/water.jpg";
import { Calendar, MessageCircleQuestion } from 'lucide-react';
import BookingMeet from '../BookingModal';
import CustomButton from '../Button';
import { useNavigate } from 'react-router-dom';

const POPUP_INTERVAL_MINUTES = 10; // Show popup every 10 minutes
const POPUP_LAST_CLOSED_KEY = 'popupLastClosedTime';

const Popup = () => {
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate()

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

  const handleContactUs = () => {
    handleClose()
    navigate("/contact-us")
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 flex items-center justify-center p-2 sm:p-4 z-50 mt-16 sm:mt-0"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl shadow-xl w-full max-w-[1200px] h-[70vh] md:h-[70vh] overflow-hidden flex flex-col md:flex-row bg-neutral-900"
          >
            {/* Left Section - Image (hidden on xs) */}
            <div className="relative w-full md:w-1/2 block h-64 sm:h-full">
              <img
                src={Trees}
                alt="Career guidance background"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/20 to-transparent flex items-center p-6 sm:p-8">
                <div className="text-white max-w-md">
                  <h2 className="text-2xl sm:text-3xl font-bold mb-2">Let's Connect</h2>
                  <p className="text-sm sm:text-base">
                    Book a free meeting and clear your doubts about your career!
                  </p>
                </div>
              </div>
            </div>

            {/* Right Section - CTA */}
           {/* Right Section - CTA */}
<div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-center items-center text-center relative overflow-y-auto">
  <button
    onClick={handleClose}
    className="absolute top-3 right-3 text-white hover:text-gray-400 text-xl sm:text-2xl transition cursor-pointer"
    aria-label="Close popup"
  >
    ✕
  </button>

  <h3 className="text-2xl sm:text-3xl text-primary mb-4 font-bold">
    Book a Free Career Session
  </h3>
  <p className="text-white mb-6 text-base sm:text-lg max-w-md">
    Have questions about your career? Let’s clear them together!
  </p>

  {/* Buttons */}
  <div className="flex flex-col sm:flex-col gap-4">
    <BookingMeet title="Book Now" icon={<Calendar />} />
    or
  <CustomButton title='Contact Us' onClick={()=>handleContactUs()} icon={<MessageCircleQuestion></MessageCircleQuestion>}/>
  </div>
</div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Popup;
