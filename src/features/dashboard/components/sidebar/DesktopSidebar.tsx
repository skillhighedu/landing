import { NavLink } from "react-router-dom";
import type { NavItem } from "./types";

interface Props {
  slug: string;
  items: NavItem[];
}

export default function DesktopSidebar({ slug, items }: Props) {
  const buildPath = (path?: string) =>
    `/course-dashboard/${slug}${path ? `/${path}` : ""}`;

  return (
    <aside
      className="
        peer group fixed left-0 top-0 z-40
        hidden lg:flex
        h-screen
        w-16 hover:w-56
        flex-col
        bg-white dark:bg-neutral-900
        border-r border-neutral-200 dark:border-neutral-800
        transition-[width] duration-300 ease-in-out
      "
    >
      <nav className="flex flex-col gap-1 pt-20 px-2">
        {items.map(({ label, icon: Icon, path }) => (
          <NavLink
            key={label}
            to={buildPath(path)}
            end={!path}
            className={({ isActive }) =>
              `
              flex items-center gap-4
              px-3 py-2 rounded-md
              text-sm font-medium
              transition-colors
              ${
                isActive
                  ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                  : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
              }
            `
            }
          >
            {/* Icon */}
            <Icon size={20} className="shrink-0" />

            {/* Label */}
            <span
              className="
                whitespace-nowrap
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
  );
}
