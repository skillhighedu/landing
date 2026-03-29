import { useEffect, useState } from "react";
import CustomButton from "@/components/common/Button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { AppliedBounty } from "../types";

interface Props {
  open: boolean;
  bounty: AppliedBounty | null;
  submitting: boolean;
  onClose: () => void;
  onSubmit: (values: { submittedLink: string; notes: string }) => void;
}

export default function BountySubmissionDialog({
  open,
  bounty,
  submitting,
  onClose,
  onSubmit,
}: Props) {
  const [submittedLink, setSubmittedLink] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (!open || !bounty) return;

    setSubmittedLink(bounty.submittedLink ?? "");
    setNotes(bounty.notes ?? "");
  }, [open, bounty]);

  return (
    <Dialog open={open} onOpenChange={(next) => !submitting && !next && onClose()}>
      <DialogContent className="max-w-2xl rounded-[1.5rem] border-border bg-card text-foreground">
        <DialogHeader>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-primary/70">
            Submit Work
          </p>
          <DialogTitle className="font-mono text-2xl text-foreground">
            {bounty?.name ?? "Bounty submission"}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Add your submission link and a short note for review.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <label className="mb-2 block font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
              Submission Link
            </label>
            <Input
              value={submittedLink}
              onChange={(e) => setSubmittedLink(e.target.value)}
              placeholder="https://github.com/... or live project link"
              className="border-border bg-background"
            />
          </div>

          <div>
            <label className="mb-2 block font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
              Notes
            </label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Explain what you built, key decisions, and anything the reviewer should know."
              className="min-h-32 border-border bg-background"
            />
          </div>

          <div className="rounded-2xl border border-dashed border-border bg-muted/20 px-4 py-3 text-sm text-muted-foreground">
            Keep the link public and include enough notes so review is easier.
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
              title={submitting ? "Submitting..." : "Submit"}
              onClick={() => onSubmit({ submittedLink, notes })}
              disabled={submitting}
              className="w-full justify-center font-mono sm:w-auto"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
