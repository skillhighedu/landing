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
        bg-neutral-50 text-neutral-900
        dark:bg-neutral-900 dark:text-white
      "
    >
      {/* Sidebar */}
      <MiniSidebar slug={slug!} />

      {/* Main */}
      <main
        className="
          flex-1
          transition-[padding] duration-300 ease-in-out

          /* Sidebar spacing */
          pl-0 lg:pl-16
          lg:peer-hover:pl-56

          /* Mobile bottom nav spacing */
          pb-16 lg:pb-0
        "
      >
        {children}
      </main>
    </div>
  );
}
