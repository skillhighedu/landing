import { NavLink } from "react-router-dom";
import type { NavItem } from "./types";
import { useAuthStore } from "@/store/authStore";
import { ChevronRight, ChevronLeft } from "lucide-react";
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
  setOpen: (v: boolean) => void;
}

export default function DesktopSidebar({
  slug,
  mode,
  items,
  open,
  setOpen,
}: Props) {
  const { logout } = useAuthStore();

  const buildPath = (path?: string) => {
    const base =
      mode === "demo"
        ? `/course/${slug}/demo`
        : `/course-dashboard/${slug}`;

    return `${base}${path ? `/${path}` : ""}`;
  };

  const navItems = items.filter((i) => i.action !== "logout");
  const logoutItem = items.find((i) => i.action === "logout");

  return (
    <TooltipProvider delayDuration={100}>
      <aside
        className={`
          fixed left-0 top-0 z-50
          hidden lg:flex
          h-screen
          ${open ? "w-60" : "w-16"}
          flex-col
          bg-white dark:bg-neutral-900
          border-r border-neutral-200 dark:border-neutral-800
          transition-all duration-300
        `}
      >
        {/* Toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="
            absolute -right-3 top-8
            bg-white dark:bg-neutral-900
            border border-neutral-200 dark:border-neutral-700
            rounded-full p-1.5 shadow
            hover:scale-110 transition
          "
        >
          {open ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </button>

        {/* NAV */}
        <nav className="flex flex-col gap-2 pt-24 px-2">
          {navItems.map(({ label, icon: Icon, path }) => (
            <Tooltip key={label}>
              <TooltipTrigger asChild>
                <NavLink
                  to={buildPath(path)}
                  end={!path}
                  className={({ isActive }) =>
                    `
                    group flex items-center gap-4
                    px-3 py-2 rounded-lg
                    text-sm font-medium
                    transition-all duration-200
                    ${
                      isActive
                        ? "bg-primary text-white"
                        : "text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
                    }
                  `
                  }
                >
                  {/* ICON ANIMATION */}
                  <Icon
                    size={20}
                    className="
                      transition-all duration-200
                      group-hover:scale-110 group-hover:-translate-y-[1px]
                    "
                  />

                  {open && <span>{label}</span>}
                </NavLink>
              </TooltipTrigger>

              {!open && (
                <TooltipContent side="right">
                  {label}
                </TooltipContent>
              )}
            </Tooltip>
          ))}
        </nav>

        {/* LOGOUT */}
     {logoutItem && (
  <div className="mt-auto px-2 pb-6 border-t border-neutral-200 dark:border-neutral-800">
    <LogoutConfirmDialog onConfirm={logout}>
      <button
      disabled={mode==="demo"}
        className="
          mt-4 w-full
          group flex items-center gap-4
          px-3 py-2 rounded-lg
          text-sm font-medium
          text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20
        "
      >
        <logoutItem.icon size={20} />
        {open && <span>{logoutItem.label}</span>}
      </button>
    </LogoutConfirmDialog>
  </div>
)}

      </aside>
    </TooltipProvider>
  );
}
