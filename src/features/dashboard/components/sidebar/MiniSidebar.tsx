import DesktopSidebar from "./DesktopSidebar";
import MobileBottomNav from "./MobileBottomNav";
import { NAV_ITEMS } from "./navItems";
import { useDashboardRouteStore } from "@/store/dashboardRoute.store";

export default function MiniSidebar() {
  const { slug, mode } = useDashboardRouteStore();

  if (!slug) return null; // safety during initial render

  return (
    <>
      <DesktopSidebar slug={slug} mode={mode} items={NAV_ITEMS} />
      <MobileBottomNav slug={slug} mode={mode} items={NAV_ITEMS} />
    </>
  );
}
