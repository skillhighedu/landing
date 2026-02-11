import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../dashboard/layout/DashboardLayout";
import HeaderSection from "@/components/common/HeaderSection";
import BountyCard from "./BountyCard";
import { bounties } from "./bounty.data";

export default function BountyList() {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-neutral-950 text-white py-10 px-4">
        <div className="max-w-6xl mx-auto mb-10">
          <HeaderSection title="Bounties" />
        </div>

        <div className="max-w-6xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {bounties.map((bounty, index) => (
            <BountyCard
              key={bounty.id}
              index={index}
              bounty={bounty}
              onOpen={() => navigate(`/bounties/${bounty.id}`)}
            />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
