import { useParams } from "react-router-dom";
import DashboardLayout from "@/layouts/DashboardLayout";
import HeaderSection from "@/components/common/HeaderSection";
import { bounties } from "./bounty.data";

export default function BountyDetails() {
  const { id } = useParams();
  const bounty = bounties.find((b) => b.id === id);

  if (!bounty) return null;

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-neutral-950 text-white py-10 px-4">
        <div className="max-w-5xl mx-auto mb-6">
          <HeaderSection title={bounty.title} />
        </div>

        <div className="max-w-3xl mx-auto bg-neutral-900 border border-neutral-800 rounded-2xl p-8">
          <p className="text-neutral-400 leading-relaxed">
            {bounty.description}
          </p>

          <div className="mt-6 flex gap-6">
            <span className="text-sm text-green-400">
              Reward: {bounty.reward}
            </span>
            <span className="text-sm text-neutral-500">
              Difficulty: {bounty.difficulty}
            </span>
          </div>

          <button className="mt-10 w-full bg-green-600 hover:bg-green-500 text-black py-3 rounded-xl font-semibold">
            Submit Work
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
