import { CalendarDays } from "lucide-react";
import { easeOut, motion } from "framer-motion";

import BookingModel from "@/components/common/BookingModal"

interface BookCallCardProps {
  title: string;
  description: string;
  buttonText: string;
  bgColor?: string; // optional, default provided
}

export default function BookCallCard({
  title,
  description,
  buttonText,
  bgColor = "bg-gradient-to-br from-neutral-800 to-neutral-900 ",
}: BookCallCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.1 }} 
      transition={{ duration: 0.4, ease: easeOut }}
      className={`relative w-full mx-auto my-8  rounded-2xl shadow-lg border border-neutral-700/30 p-6 sm:p-10 ${bgColor} backdrop-blur-md`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center ">
        {/* Left Content */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <div className="mb-4 p-3 rounded-full bg-primary-500/10 ring-1 ring-primary-500/50">
            <CalendarDays className="w-6 h-6 text-primary-400" />
          </div>
          <h2 className="text-2xl sm:text-3xl text-white mb-3 tracking-tight">
            {title}
          </h2>
          <p className="text-gray-300 text-sm sm:text-base font-sans font-bricolage leading-relaxed max-w-md">
            {description}
          </p>
        </div>

        {/* Right Content */}
        <div className="flex justify-center lg:justify-end">
          <BookingModel
            title={buttonText}
            icon={<CalendarDays />}
            className="w-full sm:w-auto bg-neutral-900 hover:bg-neutral-900 font-normal"
          />
        </div>
      </div>
    </motion.div>
  );
}
