import { useSidebarStore } from "../../store/sidebar.store";
import DesktopSidebar from "./DesktopSidebar";
import MobileBottomNav from "./MobileBottomNav";
import { NAV_ITEMS } from "./navItems";
import { useDashboardRouteStore } from "@/store/dashboardRoute.store";

interface MiniSidebarProps {
  slug?: string;
  mode?: "demo" | "real";
}

export default function MiniSidebar({
  slug: routeSlug,
  mode: routeMode,
}: MiniSidebarProps) {
  const { slug: storedSlug, mode: storedMode } = useDashboardRouteStore();
  const { open, toggle } = useSidebarStore();
  const slug = routeSlug ?? storedSlug;
  const mode = routeMode ?? storedMode;

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
