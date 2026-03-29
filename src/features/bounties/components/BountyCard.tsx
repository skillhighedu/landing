import {
  ArrowUpRight,
  BadgeIndianRupee,
  CalendarDays,
  ClipboardList,
  Clock,
  Link2,
  Lock,
  Target,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import type { Bounty } from "../types";
import CustomButton from "@/components/common/Button";

interface Props {
  bounty: Bounty;
  locked?: boolean;
  onOpen?: () => void;
}

const getRemainingTime = (expiry: string) => {
  const diff = new Date(expiry).getTime() - Date.now();

  if (diff <= 0) return "Expired";

  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const m = Math.floor((diff / (1000 * 60)) % 60);

  return `${d}d ${h}h ${m}m`;
};

export default function BountyCard({
  bounty,
  locked,
  onOpen,
}: Props) {
  const [timeLeft, setTimeLeft] = useState(getRemainingTime(bounty.expiryDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getRemainingTime(bounty.expiryDate));
    }, 60000);

    return () => clearInterval(timer);
  }, [bounty.expiryDate]);

  const isExpired = new Date(bounty.expiryDate).getTime() < Date.now();
  const isClosed = bounty.slots === 0 || !bounty.isSlotsAvailable;

  let displayStatus = bounty.status;
  if (isExpired) displayStatus = "EXPIRED";
  else if (isClosed) displayStatus = "CLOSED";

  return (
    <Card
      onClick={onOpen}
      className="flex h-full cursor-pointer flex-col rounded-[1.75rem] border p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
    >
      <div className="flex flex-1 flex-col space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
              <Target className="h-3.5 w-3.5" />
              Bounty
            </div>

            <h3 className="mt-3 font-mono text-lg leading-snug">{bounty.name}</h3>
          </div>

          <span
            className={`rounded-full px-3 py-1 font-mono text-[11px] uppercase tracking-[0.16em] ${
              displayStatus === "EXPIRED"
                ? "bg-gray-200 text-gray-700"
                : displayStatus === "CLOSED"
                  ? "bg-red-100 text-red-600"
                  : "bg-green-100 text-green-700"
            }`}
          >
            {displayStatus}
          </span>
        </div>

        <p className="min-h-[84px] text-sm leading-7 text-muted-foreground font-mono line-clamp-3">
          {bounty.description}
        </p>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-border bg-background px-4 py-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
              Slots
            </p>
            <div className="mt-2 flex items-center gap-2 text-sm">
              <ClipboardList size={16} /> {bounty.slots}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-background px-4 py-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
              Reward
            </p>
            <div className="mt-2 flex items-center gap-2 text-sm font-semibold text-primary">
              <BadgeIndianRupee size={16} /> {bounty.amount}
            </div>
          </div>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 font-mono text-muted-foreground">
            <CalendarDays size={16} />
            {new Date(bounty.expiryDate).toLocaleDateString()}
          </div>

          {!isExpired && (
            <div className="flex items-center gap-2 font-mono font-medium text-primary">
              <Clock size={16} />
              Ends in {timeLeft}
            </div>
          )}
        </div>

        {bounty.link && (
          <a
            href={bounty.link}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 font-mono text-sm text-primary hover:underline"
          >
            <Link2 size={16} /> View Details <ArrowUpRight size={16} />
          </a>
        )}
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-border pt-5">
        <span className="font-mono text-lg font-semibold text-primary">
          Rs. {bounty.amount}
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
          className="font-mono text-sm"
        />
      </div>
    </Card>
  );
}
