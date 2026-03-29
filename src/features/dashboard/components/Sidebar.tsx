
import MiniSidebar from "./sidebar/MiniSidebar";

interface SidebarProps {
  slug?: string;
  mode?: "demo" | "real";
}

export default function Sidebar({ slug, mode }: SidebarProps) {
  return <MiniSidebar slug={slug} mode={mode} />;
}
