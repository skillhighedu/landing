import { NavLink } from "react-router-dom";
import type { NavItem } from "./types";
import { useAuthStore } from "@/store/authStore";
import { ChevronRight, ChevronLeft } from "lucide-react";

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
   <aside
  className={`
    fixed left-0 top-0 z-50
    hidden lg:flex
    h-screen
    ${open ? "w-56" : "w-16"}
    flex-col
    bg-white dark:bg-neutral-900
    border-r border-neutral-200 dark:border-neutral-800
    transition-[width] duration-300 ease-in-out
  `}
>

      {/* Toggle */}
   <button
  onClick={() => setOpen(!open)}
  className="
    absolute right-2 top-6
    z-60
    bg-white dark:bg-neutral-900
    border border-neutral-200 dark:border-neutral-700
    rounded-full p-1 shadow
    cursor-pointer
  "
>
  {open ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
</button>



      {/* Navigation */}
      <nav className="flex flex-col gap-1 pt-20 px-2">
        {navItems.map(({ label, icon: Icon, path }) => (
          <NavLink
            key={label}
            to={buildPath(path)}
            end={!path}
            className={({ isActive }) =>
              `
              flex items-center gap-4 px-3 py-2 rounded-md text-sm font-medium
              ${
                isActive
                  ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                  : "text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
              }
            `
            }
          >
            <Icon size={20} />
            {open && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      {logoutItem && (
        <div className="mt-auto px-2 pb-4 border-t border-neutral-200 dark:border-neutral-800">
          <button
            onClick={logout}
            className="mt-3 w-full flex items-center gap-4 px-3 py-2 rounded-md text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            <logoutItem.icon size={20} />
            {open && <span>{logoutItem.label}</span>}
          </button>
        </div>
      )}
    </aside>
  );
}
