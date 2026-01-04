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

interface MiniSidebarProps {
  slug: string;
}

export default function MiniSidebar({ slug }: MiniSidebarProps) {
  const NAV_ITEMS = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      to: `/course-dashboard/${slug}`,
    },
    // { label: "My Courses", icon: BookOpen,  to: `/course-dashboard/${slug}/` },
    { label: "Quiz", icon: ClipboardList, to: "/course-dashboard/:courseId/quiz" },
    { label: "Projects", icon: FolderKanban, to: "/course-dashboard/:courseId/projects" },
    { label: "Bounties", icon: Trophy, to: "/course-dashboard/:courseId/bounties" },

    { label: "Progress", icon: BarChart3, to: "/progress" },

    {
      label: "Resume",
      icon: FileText,
      to: `/course-dashboard/resume`,
    },
    // { label: "Certificates", icon: Award, to: "/certificates" },

    // { label: "Community", icon: Users, to: "/community" },
    { label: "Settings", icon: Settings, to: "/settings" },
  ];

  return (
    <aside
      className="
        peer group
        fixed left-0 top-0 z-40
        h-screen
        w-16 hover:w-56
        bg-neutral-900
        border-r border-white/10
        transition-all duration-300 ease-in-out
        overflow-hidden
        hidden lg:block mt-3
      "
    >
      <nav className="flex flex-col gap-2 pt-20 px-2 mr-5">
        {NAV_ITEMS.map(({ label, icon: Icon, to }) => (
          <NavLink
            key={label}
            to={to}
            className={({ isActive }) =>
              `
              flex items-center gap-4
              px-3 py-2 rounded-lg
              transition-colors
              ${
                isActive
                  ? "bg-white/10 text-white border-l-4 border-green-800"
                  : "text-white/70 hover:bg-white/10"
              }
            `
            }
          >
            <Icon size={22} className="shrink-0" />

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
  );
}
