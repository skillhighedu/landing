import { easeOut, motion } from "framer-motion";
import BookingModal from "@/components/common/BookingModal";
import { Icon, CalendarDays } from "@/components/icons";
import type { BookCallCardData } from "../types";

type Props = BookCallCardData;

export default function BookCallCard({
  title,
  description,
  buttonText,
  bgColor,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.4, ease: easeOut }}
      className={`
        relative w-full mx-auto my-8 rounded-2xl p-6 sm:p-10 shadow-lg backdrop-blur-md
        border border-neutral-200 dark:border-white/10
        bg-white text-neutral-900
        bg-none
        dark:bg-neutral-900 dark:text-white
        ${bgColor ?? ""}
      `}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
        {/* Left */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <div className="mb-4 p-3 rounded-full bg-primary/10 ring-1 ring-primary/40">
            <Icon icon={CalendarDays} className="w-6 h-6 text-primary" />
          </div>

          <h2 className="text-2xl sm:text-3xl mb-3 tracking-tight">
            {title}
          </h2>

          <p className="text-sm sm:text-base font-bricolage leading-relaxed max-w-md text-neutral-700 dark:text-white/70">
            {description}
          </p>
        </div>

        {/* Right */}
        <div className="flex justify-center lg:justify-end">
          <BookingModal
            title={buttonText}
            icon={<Icon icon={CalendarDays} />}
            className="w-full sm:w-auto bg-primary text-primary-foreground hover:opacity-90 font-normal"
          />
        </div>
      </div>
    </motion.div>
  );
}
