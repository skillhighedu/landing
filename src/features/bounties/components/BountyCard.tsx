import { CalendarDays, ClipboardList, Link2, Clock, Lock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import type { Bounty } from "../types";
import CustomButton from "@/components/common/Button";

interface Props {
  bounty: Bounty;
  locked?: boolean;
}

const getRemainingTime = (expiry: string) => {
  const diff = new Date(expiry).getTime() - Date.now();

  if (diff <= 0) return "Expired";

  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const m = Math.floor((diff / (1000 * 60)) % 60);

  return `${d}d ${h}h ${m}m`;
};

export default function BountyCard({ bounty, locked }: Props) {
  const [timeLeft, setTimeLeft] = useState(
    getRemainingTime(bounty.expiryDate)
  );

  useEffect(() => {
    const t = setInterval(() => {
      setTimeLeft(getRemainingTime(bounty.expiryDate));
    }, 60000);

    return () => clearInterval(t);
  }, [bounty.expiryDate]);

  /* STATUS LOGIC */
  const isExpired = new Date(bounty.expiryDate).getTime() < Date.now();
  const isClosed = bounty.slots === 0 || !bounty.isSlotsAvailable;

  let displayStatus = bounty.status;
  if (isExpired) displayStatus = "EXPIRED";
  else if (isClosed) displayStatus = "CLOSED";

  return (
    <Card className="p-6 flex flex-col justify-between rounded-2xl border hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="space-y-4">
        <div className="flex justify-between items-start gap-3">
          <h3 className="text-lg leading-snug">{bounty.name}</h3>

          <span
            className={`text-xs px-2 py-1 rounded-full
              ${
                displayStatus === "EXPIRED"
                  ? "bg-gray-200 text-gray-700"
                  : displayStatus === "CLOSED"
                  ? "bg-red-100 text-red-600"
                  : "bg-green-100 text-green-700"
              }
            `}
          >
            {displayStatus}
          </span>
        </div>

        <p className="text-sm text-muted-foreground font-sans">
          {bounty.description}
        </p>

        <div className="space-y-2 text-sm font-sans">
          <div className="flex items-center gap-2">
            <ClipboardList size={16} /> Slots: {bounty.slots}
          </div>

          <div className="flex items-center gap-2">
            <CalendarDays size={16} />
            {new Date(bounty.expiryDate).toLocaleDateString()}
          </div>

          {!isExpired && (
            <div className="flex items-center gap-2 text-primary font-medium">
              <Clock size={16} />
              Ends in {timeLeft}
            </div>
          )}
        </div>

        {bounty.link && (
          <a
            href={bounty.link}
            target="_blank"
            className="text-primary flex items-center gap-1 text-sm hover:underline"
          >
            <Link2 size={16} /> View Details
          </a>
        )}
      </div>

      <div className="mt-6 flex justify-between items-center">
        <span className="text-lg text-primary font-semibold">
          ₹ {bounty.amount}
        </span>

        <CustomButton
          title={
            locked
              ? "Locked"
              : isExpired
              ? "Expired"
              : isClosed
              ? "Closed"
              : "Apply"
          }
          disabled={locked || isExpired || isClosed}
          icon={locked ? <Lock size={16} /> : undefined}
        />
      </div>
    </Card>
  );
}
