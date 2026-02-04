import type { ReactNode } from "react";
import { useParams } from "react-router-dom";
import MiniSidebar from "@/features/dashboard/components/Sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { slug } = useParams<{ slug: string }>();

  return (
    <div
      className="
        min-h-screen flex

        /* Light */
        bg-neutral-50 text-neutral-900

        /* Dark */
        dark:bg-neutral-900 dark:text-white
      "
    >
      {/* ===== Sidebar / Bottom Nav ===== */}
      <MiniSidebar slug={slug!} />

      {/* ===== Main Content ===== */}
      <main
        className="
          flex-1
          transition-all duration-300 ease-in-out

          /* Desktop sidebar spacing */
          lg:pl-16 lg:peer-hover:pl-56

          /* Mobile spacing (for bottom nav) */
          pb-16 lg:pb-0
        "
      >
        {children}
      </main>
    </div>
  );
}
