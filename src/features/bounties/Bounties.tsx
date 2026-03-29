import { useEffect, useMemo, useState } from "react";
import DashboardLayout from "@/features/dashboard/layout/DashboardLayout";
import DemoNotice from "@/features/dashboard/components/common/DemoNotice";
import { useDashboardRouteStore } from "@/store/dashboardRoute.store";
import {
  useDemoBounties,
  useBounties,
} from "./hooks/useBounties";
import BountyCard from "./components/BountyCard";
import EmptyBountyState from "./components/EmptyBountyState";
import {
  BadgeIndianRupee,
  BriefcaseBusiness,
  Clock3,
  Sparkles,
  Target,
} from "lucide-react";

type TabType = "available" | "applied";

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
  const demoAvailable = useDemoBounties(slug);
  const realAvailable = useBounties(slug);
  const availableQuery = mode === "demo" ? demoAvailable : realAvailable;
  const locked = mode === "demo";
  const bounties = availableQuery.data?.bounties ?? [];
  const totalBounties = availableQuery.data?.meta?.totalBounties ?? bounties.length;
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
  const closingSoon = useMemo(
    () =>
      bounties.filter((bounty) => {
        const diff = new Date(bounty.expiryDate).getTime() - Date.now();
        return diff > 0 && diff <= 1000 * 60 * 60 * 24 * 3;
      }).length,
    [bounties],
  );

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    document.documentElement.scrollTo({ top: 0, left: 0, behavior: "auto" });
    document.body.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [mode, slug]);

  return (
    <DashboardLayout title="Bounties">
      <div className="space-y-8">
        {mode === "demo" && <DemoNotice />}

        <section className="space-y-6">
          <div className="overflow-hidden rounded-[2rem] border border-border bg-gradient-to-br from-primary/10 via-background to-background shadow-sm">
            <div className="grid gap-6 px-5 py-6 sm:px-6 lg:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.95fr)] lg:px-8 lg:py-8">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 font-mono text-xs uppercase tracking-[0.18em] text-primary">
                  <Sparkles className="h-4 w-4" />
                  Bounty Board
                </div>

                <h2 className="mt-4 max-w-2xl font-mono text-2xl font-semibold leading-tight text-foreground sm:text-3xl">
                  Explore time-bound challenges, apply fast, and earn for solving real tasks.
                </h2>

                <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
                  Keep an eye on deadlines, open slots, and payout values. The best bounties usually move quickly.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-border bg-background/80 px-4 py-4">
                  <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    <BriefcaseBusiness className="h-4 w-4" />
                    Total
                  </div>
                  <div className="mt-3 text-2xl font-semibold text-foreground">{totalBounties}</div>
                  <p className="mt-1 text-sm text-muted-foreground">Bounties currently listed</p>
                </div>

                <div className="rounded-2xl border border-border bg-background/80 px-4 py-4">
                  <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    <Target className="h-4 w-4" />
                    Open
                  </div>
                  <div className="mt-3 text-2xl font-semibold text-foreground">{openBounties}</div>
                  <p className="mt-1 text-sm text-muted-foreground">Accepting applications now</p>
                </div>

                <div className="rounded-2xl border border-border bg-background/80 px-4 py-4">
                  <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    <BadgeIndianRupee className="h-4 w-4" />
                    Reward Pool
                  </div>
                  <div className="mt-3 text-2xl font-semibold text-foreground">Rs. {totalReward}</div>
                  <p className="mt-1 text-sm text-muted-foreground">Combined listed reward value</p>
                </div>

                <div className="rounded-2xl border border-border bg-background/80 px-4 py-4">
                  <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    <Clock3 className="h-4 w-4" />
                    Closing Soon
                  </div>
                  <div className="mt-3 text-2xl font-semibold text-foreground">{closingSoon}</div>
                  <p className="mt-1 text-sm text-muted-foreground">Ending within the next 3 days</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3 border-b border-border pb-4">
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
              ) : availableQuery.data?.bounties.length === 0 ? (
                <EmptyBountyState title="No bounties available right now" />
              ) : (
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {availableQuery.data?.bounties.map((bounty) => (
                    <BountyCard
                      key={bounty.id}
                      bounty={bounty}
                      locked={locked}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </DashboardLayout>
  );
}
