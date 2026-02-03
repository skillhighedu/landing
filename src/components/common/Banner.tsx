import { useEffect, useState } from "react";
import BookingModal from "@/components/common/BookingModal";
import Container from "@/layouts/Container";

type CountdownProps = {
  targetDate?: string;
};

export default function CountdownBanner({ targetDate }: CountdownProps) {
  const calculateTimeLeft = () => {
    if (!targetDate) return null;

    const diff = +new Date(targetDate) - +new Date();
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
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const expired = !timeLeft;

  return (
    <div className="fixed top-[72px] left-0 w-full z-40 pointer-events-none ">
      <Container size="full">
        <div className="pointer-events-auto max-w-7xl mx-auto px-4 ">
          <div
            className="
              relative
              flex flex-col sm:flex-row
              items-center justify-between
              gap-4
              rounded-xl
              backdrop-blur-xl
              bg-primary/80
              text-white
              px-6 py-4
              shadow-lg
              border border-white/20 
            "
          >
            {/* LEFT */}
            <div className="text-center sm:text-left">
              {!expired ? (
                <>
                  <p className="text-sm font-medium tracking-wide">
                    Limited-time offer
                  </p>
                  <p className="text-xs text-white/80">
                    Use code <span className="font-semibold">LEVELUP</span> before it ends
                  </p>
                </>
              ) : (
                <p className="text-sm font-medium">
                  Book a free consultation with our experts
                </p>
              )}
            </div>

            {/* TIMER */}
            {!expired && timeLeft && (
              <div className="flex items-center gap-2 bg-black/20 rounded-lg px-4 py-2 text-sm">
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
                bg-white text-neutral-900
                hover:bg-neutral-100
                font-medium
                px-5 py-2
              "
            />
          </div>
        </div>
      </Container>
    </div>
  );
}

/* ------------------ Helpers ------------------ */

function TimeBox({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center min-w-[32px]">
      <span className="font-semibold tabular-nums">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-[10px] text-white/70">{label}</span>
    </div>
  );
}

function Colon() {
  return <span className="opacity-50">:</span>;
}
