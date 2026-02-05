import { NavLink } from "react-router-dom";
import type { NavItem } from "./types";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Props {
  slug: string;
  items: NavItem[];
}

export default function MobileBottomNav({ slug, items }: Props) {
  const buildPath = (path: string) =>
    `/course-dashboard/${slug}${path ? `/${path}` : ""}`;

  return (
    <nav
      className="
        fixed bottom-0 left-0 right-0 z-50
        flex items-center justify-around
        h-14 lg:hidden
        bg-white dark:bg-neutral-900
        border-t border-neutral-200 dark:border-neutral-800
      "
    >
      {items.map(({ label, icon: Icon, path }) => (
        <Tooltip key={label}>
          <TooltipTrigger asChild>
            <NavLink
              to={buildPath(path)}
              end={path === ""}
              className={({ isActive }) =>
                `
                flex items-center justify-center
                w-full h-full transition-colors
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
  );
}
