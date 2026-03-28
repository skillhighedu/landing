import type { LucideIcon } from "lucide-react";
export interface NavItem {
  label: string;
  icon: LucideIcon;
  path?: string;
  action?: "logout";
  comingSoon?: boolean; 
}



export interface MobileSidebarProps {
  slug: string;
  mode: "demo" | "real";
  items: NavItem[];
}
