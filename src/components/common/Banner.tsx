import { useEffect, useState } from "react";
import BookingModal from "@/components/common/BookingModal";
import Container from "@/layouts/Container";

type CountdownProps = {
  targetDate?: string;
};

export default function CountdownBanner({ targetDate }: CountdownProps) {
  const calculateTimeLeft = () => {
    const diff = targetDate
      ? +new Date(targetDate) - +new Date()
      : 0;

    if (diff <= 0) return null;

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / 1000 / 60) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(
      () => setTimeLeft(calculateTimeLeft()),
      1000
    );
    return () => clearInterval(timer);
  }, []);

  const expired = !timeLeft;

  return (
    <div className="relative w-full mt-18 overflow-hidden bg-gradient-to-r from-primary to-primary/50 text-white">
      
      {/* FLASH SWIPE */}
      <span
        className="
          pointer-events-none
          absolute inset-0
          bg-gradient-to-r
          from-transparent via-white/30 to-transparent
          skew-x-[-20deg]
          animate-[banner-shine_4s_ease-in-out_infinite]
        "
      />

     <Container size="full">
       <div className="relative max-w-7xl mx-auto px-3 py-3 flex flex-col sm:flex-row items-center justify-between gap-4">

        {/* LEFT */}
        <div className="text-center sm:text-left">
          {!expired ? (
            <>
              <p className="text-sm sm:text-base font-medium">
                🎯 Limited-time offer
              </p>
              <p className="text-xs sm:text-sm text-white/80">
                Use code <span className="font-semibold">LEVELUP</span> before time runs out
              </p>
            </>
          ) : (
            <p className="text-base sm:text-lg font-medium">
              Book a free consultation with our experts
            </p>
          )}
        </div>

        {/* TIMER */}
        {!expired && (
          <div className="flex items-center gap-2 sm:gap-3 bg-black/20 rounded-lg px-4 py-2 text-sm">
            <TimeBox value={timeLeft.days} label="D" />
            <Colon />
            <TimeBox value={timeLeft.hours} label="H" />
            <Colon />
            <TimeBox value={timeLeft.minutes} label="M" />
            <Colon />
            <TimeBox value={timeLeft.seconds} label="S" />
          </div>
        )}

        {/* CTA */}
        <BookingModal
          title={expired ? "Book a meet" : "Claim offer"}
          icon=""
          className="
            bg-white text-black
            hover:bg-neutral-100
            font-medium
          "
        />
      </div>
     </Container>
    </div>
  );
}

function TimeBox({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center min-w-[36px]">
      <span className="font-semibold tabular-nums">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-[10px] text-white/70">{label}</span>
    </div>
  );
}

function Colon() {
  return <span className="opacity-60">:</span>;
}
