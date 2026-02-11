
export interface NavItem {
  label: string;
  icon: any;
  path?: string;
  action?: "logout";
  comingSoon?: boolean; 
}



export interface MobileSidebarProps {
  slug: string;
  mode: "demo" | "real";
  items: NavItem[];
}