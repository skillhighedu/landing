import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import DashboardLayout from "@/features/dashboard/layout/DashboardLayout";
import DemoNotice from "@/features/dashboard/components/common/DemoNotice";
import { useDashboardRouteStore } from "@/store/dashboardRoute.store";
import {
  useAppliedBounties,
  useApplyBounty,
  useBounties,
  useCancelBountyApplication,
  useDemoBounties,
  useSubmitBountyWork,
} from "./hooks/useBounties";
import BountyCard from "./components/BountyCard";
import AppliedBountyCard from "./components/AppliedBountyCard";
import EmptyBountyState from "./components/EmptyBountyState";
import BountyApplyDialog from "./components/BountyApplyDialog";
import BountySubmissionDialog from "./components/BountySubmissionDialog";
import type { AppliedBounty, Bounty } from "./types";
import { writeBountyNotificationCache } from "./utils/bountyNotifications";
import {
  BadgeIndianRupee,
  BriefcaseBusiness,
  Clock3,
  Sparkles,
  Target,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type TabType = "available" | "applied";
const BOUNTY_NOTES_STORAGE_KEY = "skillhigh-bounty-notes";

const getStoredBountyNotes = (): Record<string, string> => {
  if (typeof window === "undefined") return {};

  const raw = window.sessionStorage.getItem(BOUNTY_NOTES_STORAGE_KEY);
  if (!raw) return {};

  try {
    return JSON.parse(raw) as Record<string, string>;
  } catch {
    return {};
  }
};

const setStoredBountyNote = (applicationId: string, notes: string) => {
  if (typeof window === "undefined") return;

  const current = getStoredBountyNotes();
  window.sessionStorage.setItem(
    BOUNTY_NOTES_STORAGE_KEY,
    JSON.stringify({
      ...current,
      [applicationId]: notes,
    }),
  );
};

function BountyCardSkeleton() {
  return (
    <div className="animate-pulse space-y-5 rounded-[1.75rem] border border-border bg-card p-6 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-2">
          <div className="h-6 w-24 rounded-full bg-muted/50" />
          <div className="h-5 w-40 rounded bg-muted/50" />
          <div className="h-4 w-28 rounded bg-muted/40" />
        </div>
        <div className="h-6 w-20 rounded-full bg-muted/50" />
      </div>

      <div className="space-y-2">
        <div className="h-4 w-full rounded bg-muted/40" />
        <div className="h-4 w-5/6 rounded bg-muted/40" />
        <div className="h-4 w-2/3 rounded bg-muted/40" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="h-20 rounded-2xl bg-muted/50" />
        <div className="h-20 rounded-2xl bg-muted/50" />
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-border pt-5">
        <div className="h-6 w-20 rounded bg-muted/50" />
        <div className="h-10 w-28 rounded-xl bg-muted/50" />
      </div>
    </div>
  );
}

export default function Bounties() {
  const { slug, mode } = useDashboardRouteStore();
  const [tab, setTab] = useState<TabType>("available");
  const [selectedBounty, setSelectedBounty] = useState<Bounty | null>(null);
  const [selectedAppliedBounty, setSelectedAppliedBounty] =
    useState<AppliedBounty | null>(null);
  const [cancelTarget, setCancelTarget] = useState<AppliedBounty | null>(null);
  const [storedNotes, setStoredNotes] = useState<Record<string, string>>({});
  const isDemo = mode === "demo";

  const demoAvailable = useDemoBounties(slug, { enabled: isDemo });
  const realAvailable = useBounties(slug, { enabled: !isDemo });
  const availableQuery = isDemo ? demoAvailable : realAvailable;
  const locked = isDemo;
  const courseId = availableQuery.data?.courseId;
  const appliedQuery = useAppliedBounties(isDemo ? undefined : courseId);
  const applyMutation = useApplyBounty();
  const cancelMutation = useCancelBountyApplication();
  const submitMutation = useSubmitBountyWork();

  const bounties = availableQuery.data?.bounties ?? [];
  const appliedBounties = useMemo(
    () =>
      (appliedQuery.data ?? []).map((bounty) => ({
        ...bounty,
        notes: storedNotes[bounty.id] ?? bounty.notes ?? null,
      })),
    [appliedQuery.data, storedNotes],
  );
  const appliedIds = useMemo(
    () => new Set(appliedBounties.map((bounty) => bounty.bountyId)),
    [appliedBounties],
  );
  const totalBounties =
    availableQuery.data?.meta?.totalBounties ?? bounties.length;
  const openBounties = useMemo(
    () =>
      bounties.filter((bounty) => {
        const isExpired = new Date(bounty.expiryDate).getTime() < Date.now();
        const isClosed = bounty.slots === 0 || !bounty.isSlotsAvailable;
        return !isExpired && !isClosed;
      }).length,
    [bounties],
  );
  const totalReward = useMemo(
    () => bounties.reduce((sum, bounty) => sum + Number(bounty.amount || 0), 0),
    [bounties],
  );
  const appliedCount = appliedBounties.length;
  const reviewingCount = useMemo(
    () => appliedBounties.filter((bounty) => bounty.status === "REVIEWING").length,
    [appliedBounties],
  );

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    document.documentElement.scrollTo({ top: 0, left: 0, behavior: "auto" });
    document.body.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [mode, slug]);

  useEffect(() => {
    if (!slug || mode !== "real") return;
    writeBountyNotificationCache(slug, mode, bounties);
  }, [bounties, mode, slug]);

  useEffect(() => {
    setStoredNotes(getStoredBountyNotes());
  }, []);

  const handleConfirmApply = () => {
    if (!selectedBounty || !courseId) {
      toast.error("Course information is missing. Please refresh and try again.");
      return;
    }

    applyMutation.mutate(
      {
        bountyId: selectedBounty.id,
        courseId,
      },
      {
        onSuccess: () => {
          setSelectedBounty(null);
          setTab("applied");
        },
      },
    );
  };

  const handleSubmitWork = ({
    submittedLink,
    notes,
  }: {
    submittedLink: string;
    notes: string;
  }) => {
    if (!selectedAppliedBounty || !courseId) {
      toast.error("Bounty submission is missing required details.");
      return;
    }

    if (!submittedLink.trim()) {
      toast.error("Submission link is required.");
      return;
    }

    const isValidLink = /^https?:\/\/\S+$/i.test(submittedLink.trim());
    if (!isValidLink) {
      toast.error("Enter a valid submission URL.");
      return;
    }

    if (!notes.trim() || notes.trim().length < 10) {
      toast.error("Notes should be at least 10 characters.");
      return;
    }

    submitMutation.mutate(
      {
        payload: {
          bountyId: selectedAppliedBounty.bountyId,
          applicationId: selectedAppliedBounty.id,
          submittedLink: submittedLink.trim(),
          notes: notes.trim(),
        },
        courseId,
      },
      {
        onSuccess: () => {
          setStoredBountyNote(selectedAppliedBounty.id, notes.trim());
          setStoredNotes((prev) => ({
            ...prev,
            [selectedAppliedBounty.id]: notes.trim(),
          }));
          setSelectedAppliedBounty(null);
        },
      },
    );
  };

  const handleCancelApplication = () => {
    if (!cancelTarget || !courseId) {
      toast.error("Application details are missing.");
      return;
    }

    cancelMutation.mutate(
      {
        payload: {
          applicationId: cancelTarget.id,
          bountyId: cancelTarget.bountyId,
        },
        courseId,
      },
      {
        onSuccess: () => {
          setCancelTarget(null);
          setTab("available");
        },
      },
    );
  };

  return (
    <DashboardLayout title="Bounties">
      <div className="space-y-8">
        {isDemo && <DemoNotice />}

        <section className="space-y-6">
          <div className="overflow-hidden rounded-[2rem] border border-border bg-gradient-to-br from-primary/10 via-background to-background shadow-sm">
            <div className="grid gap-6 px-5 py-6 sm:px-6 lg:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.95fr)] lg:px-8 lg:py-8">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 font-mono text-xs uppercase tracking-[0.18em] text-primary">
                  <Sparkles className="h-4 w-4" />
                  Bounty Board
                </div>

                <h2 className="mt-4 max-w-2xl font-mono text-2xl font-semibold leading-tight text-foreground sm:text-3xl">
                  Apply, track your entries, and submit work without leaving the course dashboard.
                </h2>

                <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
                  Open bounties move into your applied queue after confirmation, and completed work can be submitted directly from the applied tab.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-border bg-background/80 px-4 py-4">
                  <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    <BriefcaseBusiness className="h-4 w-4" />
                    Total
                  </div>
                  <div className="mt-3 text-2xl font-semibold text-foreground">
                    {totalBounties}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Bounties currently listed
                  </p>
                </div>

                <div className="rounded-2xl border border-border bg-background/80 px-4 py-4">
                  <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    <Target className="h-4 w-4" />
                    Open
                  </div>
                  <div className="mt-3 text-2xl font-semibold text-foreground">
                    {openBounties}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Accepting applications now
                  </p>
                </div>

                <div className="rounded-2xl border border-border bg-background/80 px-4 py-4">
                  <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    <BadgeIndianRupee className="h-4 w-4" />
                    Reward Pool
                  </div>
                  <div className="mt-3 text-2xl font-semibold text-foreground">
                    Rs. {totalReward}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Combined listed reward value
                  </p>
                </div>

                <div className="rounded-2xl border border-border bg-background/80 px-4 py-4">
                  <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    <Clock3 className="h-4 w-4" />
                    Applied
                  </div>
                  <div className="mt-3 text-2xl font-semibold text-foreground">
                    {isDemo ? 0 : appliedCount}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {isDemo
                      ? "Application flow is disabled in demo mode"
                      : `${reviewingCount} currently under review`}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
            <div className="rounded-[1.5rem] border border-border bg-card p-5 shadow-sm sm:p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-primary/70">
                How It Works
              </p>
              <h3 className="mt-2 font-mono text-xl text-foreground">
                Bounty flow
              </h3>

              <div className="mt-5 space-y-3">
                {[
                  "Review the brief, reward, deadline, and available slots before applying.",
                  "Apply once you are sure you can complete the bounty within the listed time.",
                  "After applying, move to the applied tab to track your submission state.",
                  "Submit one clean public link with notes that explain what you built.",
                ].map((item, index) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-2xl border border-border bg-background px-4 py-3"
                  >
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 font-mono text-[11px] uppercase tracking-[0.14em] text-primary">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="font-mono text-sm font-normal leading-6 text-muted-foreground">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-border bg-card p-5 shadow-sm sm:p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-primary/70">
                Rules
              </p>
              <h3 className="mt-2 font-mono text-xl text-foreground">
                Before you submit
              </h3>

              <div className="mt-5 space-y-3">
                {[
                  "Do not apply to multiple active bounties if your current one is still incomplete.",
                  "Keep your submitted link public and accessible for the reviewer.",
                  "Use the notes field to explain approach, deliverables, and anything important to check.",
                  "Once work is submitted, the card locks the submit action and moves into review flow.",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-dashed border-border bg-muted/20 px-4 py-3"
                  >
                    <p className="font-mono text-sm font-normal leading-6 text-muted-foreground">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 border-b border-border pb-4">
            <button
              onClick={() => setTab("available")}
              className={`rounded-xl px-4 py-2 font-mono text-sm ${
                tab === "available"
                  ? "bg-primary text-white"
                  : "text-foreground hover:bg-muted"
              }`}
            >
              Available Bounties
            </button>

            <button
              onClick={() => setTab("applied")}
              disabled={isDemo}
              className={`rounded-xl px-4 py-2 font-mono text-sm ${
                tab === "applied"
                  ? "bg-primary text-white"
                  : "text-foreground hover:bg-muted"
              } ${isDemo ? "cursor-not-allowed opacity-50" : ""}`}
            >
              Applied Bounties
            </button>
          </div>

          {tab === "available" && (
            <>
              {availableQuery.isLoading ? (
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <BountyCardSkeleton key={index} />
                  ))}
                </div>
              ) : availableQuery.isError ? (
                <EmptyBountyState
                  title="Unable to load bounties right now"
                  subtitle="Please refresh and try again in a moment."
                />
              ) : bounties.length === 0 ? (
                <EmptyBountyState title="No bounties available right now" />
              ) : (
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {bounties.map((bounty) => (
                    <BountyCard
                      key={bounty.id}
                      bounty={bounty}
                      locked={locked}
                      isApplied={appliedIds.has(bounty.id)}
                      onApply={(item) => setSelectedBounty(item)}
                    />
                  ))}
                </div>
              )}
            </>
          )}

          {tab === "applied" && !locked && (
            <>
              {appliedQuery.isLoading ? (
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <BountyCardSkeleton key={index} />
                  ))}
                </div>
              ) : appliedQuery.isError ? (
                <EmptyBountyState
                  title="Unable to load applied bounties"
                  subtitle="Please refresh and try again."
                />
              ) : appliedBounties.length === 0 ? (
                <EmptyBountyState
                  title="No applied bounties yet"
                  subtitle="Apply to a bounty from the available tab and it will show up here."
                />
              ) : (
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {appliedBounties.map((bounty) => (
                    <AppliedBountyCard
                      key={bounty.id}
                      bounty={bounty}
                      onSubmit={setSelectedAppliedBounty}
                      onCancel={setCancelTarget}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </section>
      </div>

      <BountyApplyDialog
        open={Boolean(selectedBounty)}
        bounty={selectedBounty}
        submitting={applyMutation.isPending}
        onClose={() => setSelectedBounty(null)}
        onConfirm={handleConfirmApply}
      />

      <BountySubmissionDialog
        open={Boolean(selectedAppliedBounty)}
        bounty={selectedAppliedBounty}
        submitting={submitMutation.isPending}
        onClose={() => setSelectedAppliedBounty(null)}
        onSubmit={handleSubmitWork}
      />

      <AlertDialog
        open={Boolean(cancelTarget)}
        onOpenChange={(open) => !open && setCancelTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="font-mono">
              Cancel this application?
            </AlertDialogTitle>
            <AlertDialogDescription className="font-sans">
              This will remove your application and return the slot to the bounty.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={cancelMutation.isPending}>
              Keep Application
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleCancelApplication}
              disabled={cancelMutation.isPending}
            >
              {cancelMutation.isPending ? "Cancelling..." : "Cancel Application"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
}
