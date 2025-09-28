import { useEffect, useState } from "react";
import BookingModal from "./BookingModal";

type CountdownProps = {
  targetDate?: string; // Format: '2025-08-07T23:59:59'
  showEvent?: boolean;
  event?: {
    title: string;
    description: string;
    buttonText: string;
    formLink: string;
  };
};

export default function CountdownBanner({
  targetDate,
  showEvent = false,
  event,
}: CountdownProps) {
  const calculateTimeLeft = () => {
    const difference =
      targetDate ? +new Date(targetDate) - +new Date() : 0;
    let timeLeft = { days: "00", hours: "00", minutes: "00", seconds: "00" };

    if (difference > 0) {
      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      const h = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const m = Math.floor((difference / 1000 / 60) % 60);
      const s = Math.floor((difference / 1000) % 60);

      timeLeft = {
        days: String(d).padStart(2, "0"),
        hours: String(h).padStart(2, "0"),
        minutes: String(m).padStart(2, "0"),
        seconds: String(s).padStart(2, "0"),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full mt-18 bg-gradient-to-r from-primary via-primary/40 to-primary/80 text-white shadow-lg py-4 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none" />
      <div className="relative max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        
        {/* --- Event / Discount Content --- */}
        {showEvent && event ? (
          <>
            <div className="flex flex-col gap-2">
              <h3 className="text-lg sm:text-xl tracking-tight">
                🚀 {event.title}
              </h3>
              <p className="text-sm sm:text-sm font-bricolage text-white/90">
                {event.description}
              </p>
            </div>

            {/* Timer for Event */}
            <div className="flex items-center gap-3 text-xs sm:text-sm font-bricolage text-white tracking-wide bg-black/30 backdrop-blur-md rounded-lg px-4 py-2 shadow-md">
              <TimeBox label="Days" value={timeLeft.days} />
              <TimeBox label="Hours" value={timeLeft.hours} />
              <TimeBox label="Minutes" value={timeLeft.minutes} />
              <TimeBox label="Seconds" value={timeLeft.seconds} />
            </div>

            <a
              href={event.formLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-black font-semibold px-5 py-2 rounded-lg shadow-md hover:scale-105 transition-transform animate-pulse"
            >
              {event.buttonText}
            </a>
          </>
        ) : (
          /* --- Discount Countdown --- */
          <>
            {timeLeft.days !== "00" ? (
              <>
                <p className="text-sm sm:text-base font-medium tracking-tight">
                  🎉 Use code{" "}
                  <span className="bg-black/30 px-2 py-0.5 rounded font-bold animate-pulse">
                    LEVELUP
                  </span>{" "}
                  and save big – Offer ends soon!
                </p>
                <div className="flex items-center gap-3 text-xs sm:text-sm font-bricolage text-white tracking-wide bg-black/30 backdrop-blur-md rounded-lg px-4 py-2 shadow-md">
                  <TimeBox label="Days" value={timeLeft.days} />
                  <TimeBox label="Hours" value={timeLeft.hours} />
                  <TimeBox label="Minutes" value={timeLeft.minutes} />
                  <TimeBox label="Seconds" value={timeLeft.seconds} />
                </div>
              </>
            ) : (
              <div className="flex items-center justify-between gap-4 w-full max-w-7xl mx-auto">
  <span className=" text-white">
    Book a free consultation from our experts
  </span>
  <BookingModal
    title="Book a meet"
    icon=""
      className="w-full sm:w-auto bg-neutral-900 hover:bg-neutral-900 font-normal"
  />
</div>

            )}
          </>
        )}
      </div>
    </div>
  );
}


function TimeBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center min-w-[55px]">
      <span className="text-lg font-extrabold">{value}</span>
      <span className="text-[10px] uppercase text-white/70 tracking-wider">
        {label}
      </span>
    </div>
  );
}
