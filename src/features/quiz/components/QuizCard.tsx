import { motion } from "framer-motion";
import CustomButton from "@/components/common/Button";
import type { QuizCardProps } from "../types";
import { ArrowUpRight, Lock, TimerReset } from "lucide-react";

export default function QuizCard({
  index,
  title,
  description,
  questions,
  onStart,
  locked = false,
}: QuizCardProps & { locked?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: index * 0.04 }}
      className="
        flex h-full flex-col gap-5 rounded-[1.75rem] border border-border bg-card
        p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg
        sm:p-6
      "
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div
            className="
              flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl
              border border-primary/20 bg-primary/10 font-mono text-sm font-semibold text-primary
            "
          >
            {String(index + 1).padStart(2, "0")}
          </div>

          <div className="min-w-0">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
              <TimerReset className="h-3.5 w-3.5" />
              Quick quiz
            </div>

            <h3 className="mt-3 text-base leading-snug text-foreground sm:text-lg">
              <span className="font-mono">{title}</span>
            </h3>
          </div>
        </div>

        <div
          className={`
            inline-flex shrink-0 items-center gap-1 rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-[0.16em]
            ${
              locked
                ? "border-border bg-muted text-muted-foreground"
                : "border-primary/20 bg-primary/10 text-primary"
            }
          `}
        >
          {locked ? "Locked" : "Ready"}
        </div>
      </div>

      <p className="text-sm leading-7 font-mono text-muted-foreground line-clamp-3">
        {description}
      </p>

      <div className="mt-auto grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-border bg-background px-4 py-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
            Questions
          </p>
          <p className="mt-1 text-lg  text-foreground">{questions}</p>
        </div>

        <div className="rounded-2xl border border-border bg-background px-4 py-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
            Status
          </p>
          <p className="mt-1 text-lg  text-foreground">
            {locked ? "Wait" : "Start"}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-border pt-5">
        <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
          {locked ? "Complete earlier lessons first" : "Open and begin"}
        </span>

        <CustomButton
          title={locked ? "Locked" : "Open quiz"}
          onClick={!locked ? onStart : undefined}
          disabled={locked}
          icon={locked ? <Lock size={14} /> : <ArrowUpRight size={14} />}
          className="px-4 py-2 font-mono text-sm"
        />
      </div>
    </motion.div>
  );
}
