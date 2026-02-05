import DesktopSidebar from "./DesktopSidebar";
import MobileBottomNav from "./MobileBottomNav";
import { NAV_ITEMS } from "./navItems";

interface MiniSidebarProps {
  slug: string;
}

export default function MiniSidebar({ slug }: MiniSidebarProps) {
  return (
    <>
      <DesktopSidebar slug={slug} items={NAV_ITEMS} />
      <MobileBottomNav slug={slug} items={NAV_ITEMS} />
    </>
  );
}
