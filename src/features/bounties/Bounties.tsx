import { useState } from "react";
import DashboardLayout from "@/features/dashboard/layout/DashboardLayout";
import DemoNotice from "@/features/dashboard/components/common/DemoNotice";
import { useDashboardRouteStore } from "@/store/dashboardRoute.store";

import {
  useDemoBounties,
  useBounties,
  // useAppliedBounties,
} from "./hooks/useBounties";

import BountyCard from "./components/BountyCard";
// import AppliedBountyCard from "./components/AppliedBountyCard";
import EmptyBountyState from "./components/EmptyBountyState";

type TabType = "available" | "applied";

function BountyCardSkeleton() {
  return (
    <div className="animate-pulse space-y-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-2">
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

      <div className="space-y-3">
        <div className="h-4 w-24 rounded bg-muted/40" />
        <div className="h-4 w-32 rounded bg-muted/40" />
        <div className="h-4 w-28 rounded bg-muted/40" />
      </div>

      <div className="mt-6 flex items-center justify-between">
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

  return (
    <DashboardLayout title="Bounties">
      <div className="space-y-8">
        {mode == "demo" && <DemoNotice />}

        {/* TAB SWITCH */}
        <div className="flex gap-3 border-b border-border pb-6">
          <button
            onClick={() => setTab("available")}
            className={`px-4 py-2 rounded-lg text-sm font-sans ${
              tab === "available"
                ? "bg-primary text-white"
                : "hover:bg-muted"
            }`}
          >
            Available Bounties
          </button>
        </div>

        {/* AVAILABLE TAB */}
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
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
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
      </div>
    </DashboardLayout>
  );
}
