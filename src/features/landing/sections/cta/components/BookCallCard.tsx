import { easeOut, motion } from "framer-motion";
import BookingModal from "@/components/common/BookingModal";
import { Icon, CalendarDays } from "@/components/icons";
import type { BookCallCardData } from "../types";

type Props = BookCallCardData;

export default function BookCallCard({
  title,
  description,
  buttonText,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.4, ease: easeOut }}
      className="
        relative w-full mx-auto my-8 rounded-2xl p-6 sm:p-10
        backdrop-blur-md transition-all

        /* Light mode */
        bg-gradient-to-br from-white to-neutral-100
        text-neutral-900
        border border-neutral-200
        shadow-lg

        /* Dark mode */
        dark:bg-gradient-to-br dark:from-neutral-800 dark:to-neutral-900
        dark:text-white
        dark:border-neutral-700/40
        dark:shadow-xl
      "
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
        {/* Left */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <div
            className="
              mb-4 p-3 rounded-full
              bg-primary/10 ring-1 ring-primary/40
            "
          >
            <Icon icon={CalendarDays} className="w-6 h-6 text-primary" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-semibold mb-3 tracking-tight">
            {title}
          </h2>

          <p className="text-sm sm:text-base leading-relaxed max-w-md
                        text-neutral-600 dark:text-neutral-300 font-bricolage">
            {description}
          </p>
        </div>

        {/* Right */}
        <div className="flex justify-center lg:justify-end">
          <BookingModal
            title={buttonText}
            icon={<Icon icon={CalendarDays} />}
            className="
              w-full sm:w-auto font-normal

              bg-neutral-900 text-white hover:bg-neutral-800
              dark:bg-neutral-900 dark:hover:bg-neutral-800
            "
          />
        </div>
      </div>
    </motion.div>
  );
}
