import { useState } from "react";
import { CalendarDays, ClipboardList, Link2 } from "lucide-react";
import DashboardLayout from "@/features/dashboard/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { PlayGroundProps } from "@/types/dashboard/demo";
import CustomButton from "@/components/common/Button";
import DemoNotice from "../dashboard/components/common/DemoNotice";

/* ------------------ TYPES ------------------ */

type Bounty = {
  id: string;
  name: string;
  description: string;
  type: string;
  expiryDate: string;
  amount: number;
  slots: number;
  isSlotsAvailable: boolean;
  link?: string;
};

type AppliedBounty = Bounty & {
  status: string;
  submittedLink?: string;
};

/* ------------------ MOCK DATA ------------------ */

const mockAvailable: Bounty[] = [
  {
    id: "1",
    name: "Landing Page Optimization",
    description: "Improve conversion rate of the marketing page.",
    type: "Frontend",
    expiryDate: "2026-03-20",
    amount: 2000,
    slots: 5,
    isSlotsAvailable: true,
  },
  {
    id: "2",
    name: "API Performance Fix",
    description: "Reduce latency for analytics endpoint.",
    type: "Backend",
    expiryDate: "2026-03-15",
    amount: 3500,
    slots: 0,
    isSlotsAvailable: false,
  },
];

const mockApplied: AppliedBounty[] = [
  {
    id: "10",
    name: "Bug Fix Challenge",
    description: "Fix high-priority dashboard bug.",
    type: "Fullstack",
    expiryDate: "2026-02-25",
    amount: 1500,
    slots: 1,
    isSlotsAvailable: true,
    status: "IN_PROGRESS",
  },
];

/* ------------------ COMPONENT ------------------ */

export default function Bounties({ mode }: PlayGroundProps) {
  const [bounties] = useState<Bounty[]>(mockAvailable);
  const [appliedBounties] = useState<AppliedBounty[]>(mockApplied);

  const locked = mode === "demo";

  return (
    <DashboardLayout title="Bounties">
      <div className="min-h-screen p-6 md:p-10">

       {locked && <DemoNotice/>}

        {/* APPLIED */}
        {appliedBounties.length > 0 && (
          <section className="mb-12  mx-auto">
            <h2 className="text-2xl font-bold mb-6">Your Applied Bounties</h2>

            <div className="grid gap-6 md:grid-cols-2">
              {appliedBounties.map((bounty) => (
                <Card key={bounty.id} className="p-6 space-y-4">
                  <h3 className="text-xl ">{bounty.name}</h3>

                  <div className="text-sm space-y-2">
                    <div className="flex items-center gap-2">
                      <ClipboardList size={16} /> {bounty.type}
                    </div>

                    <div className="flex items-center gap-2">
                      <CalendarDays size={16} />
                      {new Date(bounty.expiryDate).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="text-lg">₹ {bounty.amount}</div>

                  <CustomButton title=" Submit Work" disabled={locked} className="w-full">
                   
                  </CustomButton>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* AVAILABLE */}
        <section className=" mx-auto">
          <h2 className="text-2xl  mb-6">Available Bounties</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {bounties.map((bounty) => (
              <Card key={bounty.id} className="p-6 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="text-lg ">{bounty.name}</h3>
                  <p className="text-sm font-sans text-muted-foreground">
                    {bounty.description}
                  </p>

                  <div className="flex items-center gap-2 text-sm">
                    <ClipboardList size={16} /> {bounty.type}
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <CalendarDays size={16} />
                    {new Date(bounty.expiryDate).toLocaleDateString()}
                  </div>

                  {bounty.link && (
                    <a
                      href={bounty.link}
                      target="_blank"
                      className="text-sm text-primary flex items-center gap-1"
                    >
                      <Link2 size={16} /> View Link
                    </a>
                  )}
                </div>

                <div className="mt-4 flex justify-between items-center">
                  <div className="font-bold">₹ {bounty.amount}</div>

                  <Button
                    disabled={!bounty.isSlotsAvailable || locked}
                  >
                    {locked
                      ? "Locked (Demo)"
                      : bounty.isSlotsAvailable
                      ? "Apply"
                      : "Slots Filled"}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </section>

      </div>
    </DashboardLayout>
  );
}
