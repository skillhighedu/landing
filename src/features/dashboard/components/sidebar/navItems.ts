import {
  LayoutDashboard,
  ClipboardList,
  FolderKanban,
  Trophy,
  FileText,
  LogOut,
} from "lucide-react";

import type { NavItem } from "./types";

export const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", icon: LayoutDashboard, path: "" },
  { label: "Quiz", icon: ClipboardList, path: "quiz" },

  { label: "Projects", icon: FolderKanban, path: "projects", comingSoon: true },
  { label: "Bounties", icon: Trophy, path: "bounties", comingSoon: true },

  { label: "Resume", icon: FileText, path: "resume" },

  { label: "Logout", icon: LogOut, path: "logout", action: "logout" },
];
