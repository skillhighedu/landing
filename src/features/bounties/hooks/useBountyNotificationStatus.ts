import { useEffect, useState } from "react";
import { fetchBounties } from "../services/bounties.service";
import {
  isBountyNotificationCacheStale,
  readBountyNotificationCache,
  writeBountyNotificationCache,
} from "../utils/bountyNotifications";

type DashboardMode = "demo" | "real";

export const useBountyNotificationStatus = (
  slug?: string,
  mode: DashboardMode = "real",
) => {
  const [hasActiveBounties, setHasActiveBounties] = useState(false);

  useEffect(() => {
    if (!slug || mode === "demo") {
      setHasActiveBounties(false);
      return;
    }

    const cached = readBountyNotificationCache(slug, mode);
    if (cached) {
      setHasActiveBounties(cached.hasActiveBounties);
    }

    if (!isBountyNotificationCacheStale(cached)) {
      return;
    }

    let cancelled = false;

    fetchBounties(slug)
      .then((data) => {
        if (cancelled) return;

        writeBountyNotificationCache(slug, mode, data.bounties);
        const nextCache = readBountyNotificationCache(slug, mode);
        setHasActiveBounties(nextCache?.hasActiveBounties ?? false);
      })
      .catch(() => {
        if (!cancelled && cached) {
          setHasActiveBounties(cached.hasActiveBounties);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [slug, mode]);

  return hasActiveBounties;
};
