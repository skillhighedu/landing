import { useState } from "react";
import DashboardLayout from "@/features/dashboard/layout/DashboardLayout";
import DemoNotice from "@/features/dashboard/components/common/DemoNotice";
import { useDashboardRouteStore } from "@/store/dashboardRoute.store";

import { useDemoBounties, useBounties, useAppliedBounties } from "./hooks/useBounties";

import BountyCard from "./components/BountyCard";
import AppliedBountyCard from "./components/AppliedBountyCard";
import EmptyBountyState from "./components/EmptyBountyState";

type TabType = "available" | "applied";

export default function Bounties() {
  const { slug, mode } = useDashboardRouteStore();
  const [tab, setTab] = useState<TabType>("available");

  /* AVAILABLE */
  const demoAvailable = useDemoBounties(mode === "demo" ? slug : undefined);
  const realAvailable = useBounties(mode === "real" ? slug : undefined);

  /* APPLIED */
  const realApplied = useAppliedBounties(mode === "real" ? slug : undefined);

  const availableQuery = mode === "demo" ? demoAvailable : realAvailable;
  const appliedQuery = realApplied;

  const locked = mode === "demo";

  return (
    <DashboardLayout title="Bounties">
      <div className="space-y-8">

        {locked && <DemoNotice />}

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

          {/* Hide in demo */}
          {mode !== "demo" && (
            <button
              onClick={() => setTab("applied")}
              className={`px-4 py-2 rounded-lg text-sm font-sans ${
                tab === "applied"
                  ? "bg-primary text-white"
                  : "hover:bg-muted"
              }`}
            >
              Applied Bounties
            </button>
          )}
        </div>

        {/* AVAILABLE TAB */}
        {tab === "available" && (
          <>
            {availableQuery.isLoading ? (
              <div>Loading...</div>
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

        {/* APPLIED TAB (only real mode) */}
        {mode !== "demo" && tab === "applied" && (
          <>
            {appliedQuery.isLoading ? (
              <div>Loading...</div>
            ) : appliedQuery.data?.bounties.length === 0 ? (
              <EmptyBountyState title="You have not applied to any bounties yet" />
            ) : (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {appliedQuery.data?.bounties.map((bounty) => (
                  <AppliedBountyCard
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
