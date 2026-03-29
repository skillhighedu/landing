import {
  ArrowUpRight,
  BadgeIndianRupee,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileUp,
  Link2,
  XCircle,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import CustomButton from "@/components/common/Button";
import type { AppliedBounty } from "../types";

interface Props {
  bounty: AppliedBounty;
  locked?: boolean;
  onSubmit: (bounty: AppliedBounty) => void;
  onCancel: (bounty: AppliedBounty) => void;
}

const getStatusLabel = (bounty: AppliedBounty) => {
  if (bounty.isBountyAwarded) return "AWARDED";
  if (bounty.status) return bounty.status;
  return "APPLIED";
};

export default function AppliedBountyCard({
  bounty,
  locked,
  onSubmit,
  onCancel,
}: Props) {
  const statusLabel = getStatusLabel(bounty);
  const hasSubmission = Boolean(bounty.submittedLink);

  return (
    <Card className="flex h-full flex-col rounded-[1.5rem] border border-border p-5 shadow-sm sm:p-6">
      <div className="flex flex-1 flex-col space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-primary/70">
              Applied Bounty
            </p>
            <h3 className="mt-2 font-mono text-lg leading-snug text-foreground">
              {bounty.name}
            </h3>
          </div>

          <span
            className={`shrink-0 rounded-full px-3 py-1 font-mono text-[11px] uppercase tracking-[0.16em] ${
              statusLabel === "AWARDED"
                ? "bg-emerald-100 text-emerald-700"
                : statusLabel === "REVIEWING"
                  ? "bg-amber-100 text-amber-700"
                  : "bg-primary/10 text-primary"
            }`}
          >
            {statusLabel}
          </span>
        </div>

        <p className="font-mono text-sm font-normal leading-7 text-muted-foreground line-clamp-3">
          {bounty.description}
        </p>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-border bg-background px-4 py-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
              Reward
            </p>
            <div className="mt-2 flex items-center gap-2 text-sm font-semibold text-primary">
              <BadgeIndianRupee size={16} /> {bounty.amount}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-background px-4 py-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
              Deadline
            </p>
            <div className="mt-2 flex items-center gap-2 text-sm text-foreground">
              <CalendarDays size={16} />
              {new Date(bounty.expiryDate).toLocaleDateString()}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-dashed border-border bg-muted/20 px-4 py-3">
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
            <Clock3 className="h-4 w-4" />
            Submission State
          </div>

          <p className="mt-2 text-sm text-foreground">
            {hasSubmission
              ? "Your work is attached for this bounty."
              : "You have applied. Submit your work when ready."}
          </p>

          {bounty.submittedLink && (
            <a
              href={bounty.submittedLink}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-1 font-mono text-sm text-primary hover:underline"
            >
              <Link2 size={16} /> View submission <ArrowUpRight size={16} />
            </a>
          )}

          {bounty.notes && (
            <div className="mt-3 rounded-xl border border-border bg-background px-3 py-3">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                Notes
              </p>
              <p className="mt-2 font-mono text-sm font-normal leading-6 text-foreground">
                {bounty.notes}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <CustomButton
          title={hasSubmission ? "Submitted" : "Submit Work"}
          disabled={locked || hasSubmission}
          onClick={() => onSubmit(bounty)}
          icon={<FileUp size={16} />}
          className="w-full justify-center font-mono sm:flex-1"
        />

        {!hasSubmission && !locked && (
          <CustomButton
            title="Cancel Application"
            variant="outline"
            onClick={() => onCancel(bounty)}
            icon={<XCircle size={16} />}
            className="w-full justify-center font-mono sm:flex-1"
          />
        )}

        {bounty.isBountyAwarded && (
          <div className="inline-flex items-center justify-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 font-mono text-sm text-emerald-700 sm:flex-1">
            <CheckCircle2 size={16} />
            Rewarded
          </div>
        )}
      </div>
    </Card>
  );
}
