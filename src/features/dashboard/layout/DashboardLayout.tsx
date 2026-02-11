import { useEffect, type ReactNode } from "react";
import { useLocation, useParams } from "react-router-dom";
import MiniSidebar from "@/features/dashboard/components/Sidebar";
import { useDashboardRouteStore } from "@/store/dashboardRoute.store";
import HeaderSection from "@/components/common/HeaderSection";
import { useSidebarStore } from "../store/sidebar.store";

interface DashboardLayoutProps {
  children: ReactNode;
  title?: string;
}

export default function DashboardLayout({
  children,
  title,
}: DashboardLayoutProps) {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const open = useSidebarStore((s) => s.open);

  const setRoute = useDashboardRouteStore((s) => s.setRoute);

  const mode: "demo" | "real" = location.pathname.includes("/demo")
    ? "demo"
    : "real";

  useEffect(() => {
    if (slug) setRoute(slug, mode);
  }, [slug, mode, setRoute]);

  return (
    <div className="min-h-screen flex bg-background text-foreground">
      <MiniSidebar />

     <main
  className={`
    flex-1 min-w-0
    transition-[padding] duration-300 ease-in-out
    ${open ? "lg:pl-56" : "lg:pl-16"}
    pb-16 lg:pb-0
  `}
>

        {title && (
          <div className="px-4 sm:px-8 lg:px-10 pt-24">
            <HeaderSection title={title} />
          </div>
        )}

        <div className="px-4 sm:px-8 lg:px-10 py-6">{children}</div>
      </main>
    </div>
  );
}
