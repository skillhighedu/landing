import { useEffect, type ReactNode } from "react";
import { useLocation, useParams } from "react-router-dom";
import MiniSidebar from "@/features/dashboard/components/Sidebar";
import { useDashboardRouteStore } from "@/store/dashboardRoute.store";
import HeaderSection from "@/components/common/HeaderSection";

interface DashboardLayoutProps {
  children: ReactNode;
  title?: string;
}

export default function DashboardLayout({ children, title }: DashboardLayoutProps) {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();

  const setRoute = useDashboardRouteStore((s) => s.setRoute);

  const mode: "demo" | "real" = location.pathname.includes("/demo")
    ? "demo"
    : "real";

  useEffect(() => {
    if (slug) setRoute(slug, mode);
  }, [slug, mode, setRoute]);

  return (
    <div className="min-h-screen flex bg-background text-foreground">
      {/* Sidebar */}
      <MiniSidebar />

      {/* Main */}
      <main
        className="
          flex-1
          transition-[padding] duration-300 ease-in-out
          pl-0 lg:pl-16
          lg:peer-hover:pl-56
          pb-16 lg:pb-0
        "
      >
        {/* Dynamic header (centralized) */}
        {title && (
          <div className="px-4 sm:px-8 lg:px-12 pt-20">
            <HeaderSection title={title} />
          </div>
        )}

        {/* Page content */}
        <div className="px-4 sm:px-8 lg:px-12 py-6">
          {children}
        </div>
      </main>
    </div>
  );
}
