import type { Bounty } from "../types";

type DashboardMode = "demo" | "real";

export interface BountyNotificationCache {
  hasActiveBounties: boolean;
  updatedAt: number;
}

export const BOUNTY_NOTIFICATION_TTL_MS = 1000 * 60 * 15;

const getCacheKey = (slug: string, mode: DashboardMode) =>
  `skillhigh-bounty-notification:${mode}:${slug}`;

export const hasNonExpiredBounties = (bounties: Bounty[]) => {
  const now = Date.now();

  return bounties.some((bounty) => {
    const isExpired = new Date(bounty.expiryDate).getTime() < now;
    return !isExpired;
  });
};

export const readBountyNotificationCache = (
  slug: string,
  mode: DashboardMode,
): BountyNotificationCache | null => {
  if (typeof window === "undefined") return null;

  const raw = window.localStorage.getItem(getCacheKey(slug, mode));
  if (!raw) return null;

  try {
    return JSON.parse(raw) as BountyNotificationCache;
  } catch {
    return null;
  }
};

export const writeBountyNotificationCache = (
  slug: string,
  mode: DashboardMode,
  bounties: Bounty[],
) => {
  if (typeof window === "undefined") return;

  const payload: BountyNotificationCache = {
    hasActiveBounties: hasNonExpiredBounties(bounties),
    updatedAt: Date.now(),
  };

  window.localStorage.setItem(getCacheKey(slug, mode), JSON.stringify(payload));
};

export const isBountyNotificationCacheStale = (
  cache: BountyNotificationCache | null,
) => {
  if (!cache) return true;
  return Date.now() - cache.updatedAt > BOUNTY_NOTIFICATION_TTL_MS;
};
