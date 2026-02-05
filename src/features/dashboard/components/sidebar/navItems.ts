import {
  LayoutDashboard,
  ClipboardList,
  FolderKanban,
  Trophy,
  FileText,
  Settings,
  BarChart3,
} from "lucide-react";

import type { NavItem } from "./types";

export const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", icon: LayoutDashboard, path: "" },
  { label: "Quiz", icon: ClipboardList, path: "quiz" },
  { label: "Projects", icon: FolderKanban, path: "projects" },
  { label: "Bounties", icon: Trophy, path: "bounties" },
  { label: "Progress", icon: BarChart3, path: "progress" },
  { label: "Resume", icon: FileText, path: "resume" },
  { label: "Settings", icon: Settings, path: "settings" },
];
