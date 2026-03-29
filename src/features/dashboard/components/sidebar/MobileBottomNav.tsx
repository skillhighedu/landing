import { NavLink } from "react-router-dom";
import type { MobileSidebarProps } from "./types";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAuthStore } from "@/store/authStore";
import LogoutConfirmDialog from "./LogoutConfirmDialog";
import { useBountyNotificationStatus } from "@/features/bounties/hooks/useBountyNotificationStatus";

export default function MobileBottomNav({
  slug,
  mode,
  items,
}: MobileSidebarProps) {
  const { logout } = useAuthStore();
  const hasActiveBounties = useBountyNotificationStatus(slug, mode);

  const buildPath = (path?: string) => {
    const base =
      mode === "demo"
        ? `/course/${slug}/demo`
        : `/course-dashboard/${slug}`;

    return `${base}${path ? `/${path}` : ""}`;
  };

  if (!slug) return null;

  const navItems = items.filter((i) => i.action !== "logout");
  const logoutItem = items.find((i) => i.action === "logout");

  return (
    <nav
      className="
        fixed bottom-0 left-0 right-0 z-50
        grid h-16 grid-cols-6 lg:hidden
        border-t border-neutral-200 bg-white/95 backdrop-blur-xl
        dark:border-neutral-800 dark:bg-neutral-900/95
      "
      aria-label="Dashboard navigation"
    >
      {navItems.map(({ label, icon: Icon, path }) => (
        <Tooltip key={label}>
          <TooltipTrigger asChild>
            <NavLink
              to={buildPath(path)}
              end={path === ""}
              className={({ isActive }) =>
                `
                flex h-full flex-col items-center justify-center gap-1 transition-all
                ${
                  isActive
                    ? "text-primary"
                    : "text-neutral-500 dark:text-neutral-400"
                }
              `
              }
            >
              <div className="relative">
                <Icon size={22} />
                {path === "bounties" && mode === "real" && hasActiveBounties && (
                  <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-primary ring-2 ring-white dark:ring-neutral-900" />
                )}
              </div>
              <span className="max-w-[72px] font-mono truncate text-[10px] font-medium leading-none">
                {label}
              </span>
            </NavLink>
          </TooltipTrigger>

          <TooltipContent side="top" className="text-xs">
            {label}
          </TooltipContent>
        </Tooltip>
      ))}

      {logoutItem && (
        <Tooltip>
          <TooltipTrigger asChild>
            <LogoutConfirmDialog onConfirm={logout}>
              <button
                disabled={mode === "demo"}
                className="flex h-full w-full flex-col items-center justify-center gap-1 text-red-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <logoutItem.icon size={22} />
                <span className="max-w-[72px] truncate text-[10px] font-medium leading-none">
                  {logoutItem.label}
                </span>
              </button>
            </LogoutConfirmDialog>
          </TooltipTrigger>

          <TooltipContent side="top" className="text-xs">
            {logoutItem.label}
          </TooltipContent>
        </Tooltip>
      )}
    </nav>
  );
}
