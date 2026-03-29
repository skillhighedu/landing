import CustomButton from "@/components/common/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BadgeIndianRupee, ClipboardList, Target } from "lucide-react";
import type { Bounty } from "../types";

interface Props {
  open: boolean;
  bounty: Bounty | null;
  submitting: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function BountyApplyDialog({
  open,
  bounty,
  submitting,
  onClose,
  onConfirm,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={(next) => !submitting && !next && onClose()}>
      <DialogContent className="max-w-xl rounded-[1.5rem] border-border bg-card text-foreground">
        <DialogHeader>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-primary/70">
            Confirm Application
          </p>
          <DialogTitle className="font-mono text-2xl text-foreground">
            {bounty?.name ?? "Apply to bounty"}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Review the bounty details and confirm your application.
          </DialogDescription>
        </DialogHeader>

        {bounty && (
          <div className="space-y-4">
            <div className="rounded-2xl border border-border bg-background px-4 py-4 text-sm leading-7 text-muted-foreground">
              {bounty.description}
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-background px-4 py-3">
                <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                  <BadgeIndianRupee className="h-4 w-4" />
                  Reward
                </div>
                <p className="mt-2 text-sm font-semibold text-primary">
                  Rs. {bounty.amount}
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-background px-4 py-3">
                <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                  <ClipboardList className="h-4 w-4" />
                  Slots
                </div>
                <p className="mt-2 text-sm font-semibold text-foreground">
                  {bounty.slots} available
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-dashed border-border bg-muted/20 px-4 py-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-primary/70">
                <Target className="h-4 w-4" />
                Ready To Apply
              </div>
              <p className="mt-2">
                Once applied, this bounty will move into your applied list so you
                can submit work from there.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <CustomButton
                title="Cancel"
                variant="outline"
                onClick={onClose}
                disabled={submitting}
                className="w-full justify-center font-mono sm:w-auto"
              />
              <CustomButton
                title={submitting ? "Applying..." : "Confirm Apply"}
                onClick={onConfirm}
                disabled={submitting}
                className="w-full justify-center font-mono sm:w-auto"
              />
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
