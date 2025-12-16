import type { ReactNode } from "react";
import MiniSidebar from "@/features/dashboard/Sidebar";
import { useParams } from "react-router-dom";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    const { slug } = useParams<{ slug: string }>();

  return (
    <div className="min-h-screen flex text-white">
      {/* ===== Global Icon Sidebar ===== */}
      <MiniSidebar slug={slug!} />

      {/* ===== Main Content (responds to sidebar hover) ===== */}
      <main
        className="
          flex-1
          pl-4 lg:pl-16 lg:peer-hover:pl-56
          transition-all duration-300 ease-in-out mt-16
        "
      >
        {children}
      </main>
    </div>
  );
}
