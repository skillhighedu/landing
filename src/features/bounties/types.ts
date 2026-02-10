/* ---------- SINGLE BOUNTY ---------- */
export interface Bounty {
  id: string;
  name: string;
  description: string;
  slots: number;
  isSlotsAvailable: boolean;
  amount: number;
  status: string;
  type: string;
  expiryDate: string;
  createdAt: string;
  link: string | null;
  locked: boolean;
  applicationCount:string
}

/* ---------- META ---------- */
export interface BountyMeta {
  demo: boolean;
  totalBounties: number;
  unlockedBounties: number;
}

/* ---------- RESPONSE DATA ---------- */
export interface BountiesResponseData {
  courseId: string;
  bounties: Bounty[];
  meta: BountyMeta;
}
