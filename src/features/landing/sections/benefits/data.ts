import {
  Code2,
  Users,
  GraduationCap,
  Briefcase,
  Compass,
  BadgeCheck,
} from "lucide-react";
import type { Benefit } from "./types";

export const benefits: Benefit[] = [
  {
    title: "Live Project Building",
    description:
      "Work on real-world projects with deadlines, version control, and mentor feedback — just like a real job.",
    icon: Code2,
  },
  {
    title: "1:1 & Group Mentorship",
    description:
      "Get personal guidance through live doubt sessions, code reviews, and roadmap discussions.",
    icon: Users,
  },
  {
    title: "Active Developer Community",
    description:
      "Join a private community with peers, mentors, and continuous learning challenges.",
    icon: GraduationCap,
  },
  {
    title: "Job & Internship Support",
    description:
      "Resume reviews, mock interviews, and referrals to help you land opportunities.",
    icon: Briefcase,
  },
  {
    title: "Skill-Based Learning Tracks",
    description:
      "Follow structured frontend, backend, or fullstack tracks curated by engineers.",
    icon: Compass,
  },
  {
    title: "Certification & Portfolio",
    description:
      "Earn verifiable certificates and a portfolio to showcase your work.",
    icon: BadgeCheck,
  },
];
