import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ClipboardList,
  FolderKanban,
  Trophy,
  FileText,
  Settings,
  BarChart3,
} from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface MiniSidebarProps {
  slug: string;
}

export default function MiniSidebar({ slug }: MiniSidebarProps) {
  const NAV_ITEMS = [
    { label: "Dashboard", icon: LayoutDashboard, path: "" },
    { label: "Quiz", icon: ClipboardList, path: "quiz" },
    { label: "Projects", icon: FolderKanban, path: "projects" },
    { label: "Bounties", icon: Trophy, path: "bounties" },
    { label: "Progress", icon: BarChart3, path: "progress" },
    { label: "Resume", icon: FileText, path: "resume" },
    { label: "Settings", icon: Settings, path: "settings" },
  ];

  const buildPath = (path: string) =>
    `/course-dashboard/${slug}${path ? `/${path}` : ""}`;

  return (
    <>
      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside
        className="
          fixed left-0 top-0 z-40
          h-screen w-16 hover:w-56
          hidden lg:block
          transition-all duration-300
          bg-white dark:bg-neutral-900
          border-r border-neutral-200 dark:border-neutral-800
        "
      >
        <nav className="flex flex-col gap-1 pt-20 px-2">
          {NAV_ITEMS.map(({ label, icon: Icon, path }) => (
            <NavLink
              key={label}
              to={buildPath(path)}
              end={path === ""}
              className={({ isActive }) =>
                `
                group flex items-center gap-4
                px-3 py-2 rounded-lg
                transition-all

                ${
                  isActive
                    ? "bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-white"
                    : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
                }
              `
              }
            >
              <Icon size={20} className="shrink-0" />

              <span
                className="
                  whitespace-nowrap text-sm font-medium
                  opacity-0 translate-x-2
                  group-hover:opacity-100 group-hover:translate-x-0
                  transition-all duration-300
                "
              >
                {label}
              </span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* ================= MOBILE BOTTOM NAV (WITH TOOLTIP) ================= */}
      <nav
        className="
          fixed bottom-0 left-0 right-0 z-50
          flex items-center justify-around
          h-14

          lg:hidden

          bg-white dark:bg-neutral-900
          border-t border-neutral-200 dark:border-neutral-800
        "
      >
        {NAV_ITEMS.map(({ label, icon: Icon, path }) => (
          <Tooltip key={label}>
            <TooltipTrigger asChild>
              <NavLink
                to={buildPath(path)}
                end={path === ""}
                className={({ isActive }) =>
                  `
                  flex items-center justify-center
                  w-full h-full
                  transition-colors

                  ${
                    isActive
                      ? "text-primary"
                      : "text-neutral-500 dark:text-neutral-400"
                  }
                `
                }
              >
                <Icon size={22} />
              </NavLink>
            </TooltipTrigger>

            <TooltipContent side="top" className="text-xs">
              {label}
            </TooltipContent>
          </Tooltip>
        ))}
      </nav>
    </>
  );
}
