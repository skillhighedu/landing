import BountyCard from "./BountyCard";
import type { Bounty } from "../types";

interface Props {
  bounties: Bounty[];
  locked?: boolean;
}

export default function BountiesGrid({ bounties, locked }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {bounties.map((bounty) => (
        <BountyCard key={bounty.id} bounty={bounty} locked={locked} />
      ))}
    </div>
  );
}
