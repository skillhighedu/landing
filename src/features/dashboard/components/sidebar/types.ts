import type { LucideIcon } from "lucide-react";

export interface NavItem {
  label: string;
  icon: any;
  path?: string;
  action?: "logout";
}



export interface MobileSidebarProps {
  slug: string;
  mode: "demo" | "real";
  items: NavItem[];
}