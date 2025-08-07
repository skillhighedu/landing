

import { useEffect, useState } from "react";

type CountdownProps = {
  targetDate: string; // Format: '2025-08-07T23:59:59'
};

export default function CountdownBanner({ targetDate }: CountdownProps) {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {
      days: "00",
      hours: "00",
      minutes: "00",
      seconds: "00",
    };

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
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full bg-gradient-to-r from-primary mt-18 via-neutral-900/10 to-primary text-white shadow-md py-4 px-6 sm:px-10">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <p className="text-sm sm:text-base font-medium tracking-tight">
          🎉 Use code <span className=" text-yellow-400">LEVELUP</span> and save big – Offer ends soon!
        </p>
        <div className="flex items-center gap-2 text-xs sm:text-sm font-mono text-neutral-100 tracking-wide bg-neutral-800 rounded-md px-3 py-1.5">
          <TimeBox label="Days" value={timeLeft.days} />
          <TimeBox label="Hours" value={timeLeft.hours} />
          <TimeBox label="Minutes" value={timeLeft.minutes} />
          <TimeBox label="Seconds" value={timeLeft.seconds} />
        </div>
      </div>
    </div>
  );
}

function TimeBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center min-w-[50px]">
      <span className="text-lg font-semibold text-white">{value}</span>
      <span className="text-[10px] uppercase text-neutral-400 tracking-wide">{label}</span>
    </div>
  );
}
