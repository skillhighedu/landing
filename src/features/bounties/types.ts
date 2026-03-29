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
  applicationCount: string;
}

export interface AppliedBounty {
  id: string;
  bountyId: string;
  name: string;
  description: string;
  link: string | null;
  amount: number;
  type: string;
  expiryDate: string;
  isBountyAwarded?: boolean | null;
  submittedLink?: string | null;
  status?: string | null;
  notes?: string | null;
}

export interface BountyMeta {
  demo: boolean;
  totalBounties: number;
  unlockedBounties: number;
}

export interface BountiesResponseData {
  courseId: string;
  bounties: Bounty[];
  meta: BountyMeta;
}

export interface ApplyBountyPayload {
  bountyId: string;
  courseId: string;
}

export interface CancelBountyApplicationPayload {
  applicationId: string;
  bountyId: string;
}

export interface SubmitBountyPayload {
  bountyId: string;
  applicationId: string;
  submittedLink: string;
  notes: string;
}
