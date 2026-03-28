
import { useSidebarStore } from "../../store/sidebar.store";
import DesktopSidebar from "./DesktopSidebar";
import MobileBottomNav from "./MobileBottomNav";
import { NAV_ITEMS } from "./navItems";
import { useDashboardRouteStore } from "@/store/dashboardRoute.store";

export default function MiniSidebar() {
  const { slug, mode } = useDashboardRouteStore();
  const { open, toggle } = useSidebarStore();

  if (!slug) return null;

  return (
    <>
      <DesktopSidebar
        open={open}
        toggle={toggle}
        slug={slug}
        mode={mode}
        items={NAV_ITEMS}
      />

      <MobileBottomNav slug={slug} mode={mode} items={NAV_ITEMS} />
    </>
  );
}
