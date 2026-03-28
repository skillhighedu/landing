import { NavLink } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { NavItem } from "./types";
import { useAuthStore } from "@/store/authStore";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import LogoutConfirmDialog from "./LogoutConfirmDialog";

interface Props {
  slug: string;
  mode: "demo" | "real";
  items: NavItem[];
  open: boolean;
  toggle: () => void;
}

export default function DesktopSidebar({
  slug,
  mode,
  items,
  open,
  toggle,
}: Props) {
  const { logout } = useAuthStore();

  const buildPath = (path?: string) => {
    const base = mode === "demo" ? `/course/${slug}/demo` : `/course-dashboard/${slug}`;
    return `${base}${path ? `/${path}` : ""}`;
  };

  const navItems = items.filter((item) => item.action !== "logout");
  const logoutItem = items.find((item) => item.action === "logout");

  return (
    <TooltipProvider delayDuration={120}>
      <aside
        className={`fixed left-0  z-40 hidden h-[calc(100vh-0rem)] flex-col border-r border-neutral-200 bg-white/95 backdrop-blur-xl transition-all duration-300 dark:border-neutral-800 dark:bg-neutral-900/95 lg:flex ${
          open ? "w-56" : "w-16"
        }`}
      >
        <div className="flex items-center justify-end px-2 pt-4">
          <button
            type="button"
            onClick={toggle}
            aria-label={open ? "Collapse sidebar" : "Expand sidebar"}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 bg-white shadow-sm transition hover:scale-105 dark:border-neutral-700 dark:bg-neutral-900"
          >
            {open ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-2 px-2 py-4">
          {navItems.map(({ label, icon: Icon, path, comingSoon }) => {
            const navNode = (
              <NavLink
                key={label}
                to={buildPath(path)}
                end={!path}
                className={({ isActive }) =>
                  `group flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-primary text-white shadow-sm"
                      : "text-neutral-900 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
                  }`
                }
              >
                <Icon
                  size={20}
                  className="shrink-0 transition-all duration-200 text-neutral-900 dark:text-neutral-400  group-hover:-translate-y-[1px] group-hover:scale-110"
                />

                {open && (
                  <div className="flex min-w-0 flex-1 items-center justify-between gap-2">
                    <span className="truncate">{label}</span>
                    {comingSoon && (
                      <span className="rounded-full border border-white/20 px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] text-white/80">
                        Soon
                      </span>
                    )}
                  </div>
                )}
              </NavLink>
            );

            if (open) {
              return navNode;
            }

            return (
              <Tooltip key={label}>
                <TooltipTrigger asChild>{navNode}</TooltipTrigger>
                <TooltipContent side="right" sideOffset={12} className="font-mono">
                  {comingSoon ? `${label} â€¢ Coming soon` : label}
                </TooltipContent>
              </Tooltip>
            );
          })}
        </nav>

        {logoutItem && (
          <div className="border-t border-neutral-200 px-2 pb-4 pt-4 dark:border-neutral-800">
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <LogoutConfirmDialog onConfirm={logout}>
                    <button
                      type="button"
                      disabled={mode === "demo"}
                      className="group flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-red-900/20"
                    >
                      <logoutItem.icon
                        size={20}
                        className="shrink-0 transition-transform duration-200 group-hover:scale-110"
                      />
                      {open && <span>{logoutItem.label}</span>}
                    </button>
                  </LogoutConfirmDialog>
                </div>
              </TooltipTrigger>

              {!open && (
                <TooltipContent side="right" sideOffset={12} className="font-mono">
                  {mode === "demo" ? "Logout disabled in demo" : logoutItem.label}
                </TooltipContent>
              )}
            </Tooltip>
          </div>
        )}
      </aside>
    </TooltipProvider>
  );
}
