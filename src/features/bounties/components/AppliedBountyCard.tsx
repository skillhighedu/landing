import { CalendarDays, ClipboardList } from "lucide-react";
import { Card } from "@/components/ui/card";
import CustomButton from "@/components/common/Button";
import type {  Bounty } from "../types";

interface Props {
  bounty: Bounty;
  locked?: boolean;
}

export default function AppliedBountyCard({ bounty, locked }: Props) {
  return (
    <Card className="p-6 rounded-2xl space-y-4">
      <h3 className="text-lg font-semibold">{bounty.name}</h3>

      <div className="text-sm space-y-2">
        <div className="flex items-center gap-2">
          <ClipboardList size={16} /> {bounty.type}
        </div>

        <div className="flex items-center gap-2">
          <CalendarDays size={16} />
          {new Date(bounty.expiryDate).toLocaleDateString()}
        </div>
      </div>

      <div className="flex justify-between items-center">
        <span className="font-semibold">₹ {bounty.amount}</span>

        <CustomButton
          title="Submit Work"
          disabled={locked}
          className="w-auto"
        />
      </div>
    </Card>
  );
}
