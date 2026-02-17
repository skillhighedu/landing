import { useState } from "react";
import DashboardLayout from "@/features/dashboard/layout/DashboardLayout";
import DemoNotice from "@/features/dashboard/components/common/DemoNotice";
import { useDashboardRouteStore } from "@/store/dashboardRoute.store";

import {
//   useDemoBounties,
//   useBounties,
//   useAppliedBounties,
  useCourseBounties,
} from "./hooks/useBounties";

import BountyCard from "./components/BountyCard";
// import AppliedBountyCard from "./components/AppliedBountyCard";
import EmptyBountyState from "./components/EmptyBountyState";
// import WorkInProgress from "@/components/common/WorkinProgress";

type TabType = "available" | "applied";

export default function Bounties( ) {
  const { slug, mode} = useDashboardRouteStore();
  const [tab, setTab] = useState<TabType>("available");

  /* REAL MODE → feature not live yet */
//   if (mode === "real") {
//     return (
//       <DashboardLayout title="Bounties">
//         <WorkInProgress />
//       </DashboardLayout>
//     );
//   }

/* DEMO MODE */



// const demoQuery = useDemoBounties(slug);
// const realQuery = useBounties(slug);
const availableQuery = useCourseBounties(slug, mode);
// console.log("availableQuery", availableQuery)


  const locked = true;

  return (
    <DashboardLayout title="Bounties">
      <div className="space-y-8">
        {mode === "demo" && <DemoNotice />}

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
      </div>
    </DashboardLayout>
  );
}
