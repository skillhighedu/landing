import {
  LayoutDashboard,
  ClipboardList,
  FolderKanban,
  Trophy,
  FileText,
  Settings,
  LogOut,
} from "lucide-react";

import type { NavItem } from "./types";

export const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", icon: LayoutDashboard, path: "" },
  { label: "Quiz", icon: ClipboardList, path: "quiz" },
  { label: "Projects", icon: FolderKanban, path: "projects" },
  { label: "Bounties", icon: Trophy, path: "bounties" },
  { label: "Resume", icon: FileText, path: "resume" },


  // logout
  { label: "Logout", icon: LogOut, path: "logout", action: "logout" },
];
