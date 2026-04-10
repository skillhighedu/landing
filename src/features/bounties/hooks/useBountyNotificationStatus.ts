import { useQuery } from "@tanstack/react-query";
import { fetchBounties } from "../services/bounties.service";
import {
  hasNonExpiredBounties,
  isBountyNotificationCacheStale,
  readBountyNotificationCache,
  writeBountyNotificationCache,
} from "../utils/bountyNotifications";

type DashboardMode = "demo" | "real";

export const useBountyNotificationStatus = (
  slug?: string,
  mode: DashboardMode = "real",
) => {
  const cached =
    slug && mode !== "demo" ? readBountyNotificationCache(slug, mode) : null;

  const { data } = useQuery<boolean>({
    queryKey: ["bounty-notification-status", mode, slug],
    enabled: !!slug && mode !== "demo",
    queryFn: async () => {
      const data = await fetchBounties(slug!);
      if (mode !== "demo") {
        writeBountyNotificationCache(slug!, mode, data.bounties);
      }
      return hasNonExpiredBounties(data.bounties);
    },
    initialData: cached?.hasActiveBounties ?? false,
    staleTime: cached && !isBountyNotificationCacheStale(cached) ? 1000 * 60 * 15 : 0,
    refetchOnMount: true,
  });

  return data ?? false;
};
