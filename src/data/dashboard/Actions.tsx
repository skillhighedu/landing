import { PlayCircle, Brain, Folder, GraduationCap, DollarSign } from "lucide-react";

export const actions = [
  {
    label: "Start Learning",
    icon: <PlayCircle size={18} />,
    href: `/course-dashboard/67691eb73f409fe0a9890a04/video-player`,
    className: "text-white rounded-lg cursor-pointer flex items-center gap-2",
  },
  {
    label: "Take Quiz",
    icon: <Brain size={18} />,
    href: `/course-dashboard/67691eb73f409fe0a9890a04/course-essentials`,
    className:
      "bg-blue-600 hover:bg-blue-700 text-white rounded-lg cursor-pointer flex items-center gap-2",
  },
  {
    label: "Start Projects",
    icon: <Folder size={18} />,
    href: "/projects",
    className:
      "bg-purple-600 hover:bg-purple-700 text-white rounded-lg cursor-pointer flex items-center gap-2",
  },
  {
    label: "Claim Certificates",
    icon: <GraduationCap size={18} />,
    href: null,
    className:
      "bg-green-700 hover:bg-neutral-600 text-white rounded-lg cursor-pointer flex items-center gap-2",
  },
  {
    label: "Bounties",
    icon: <DollarSign size={18} />,
    href: null,
    className:
      "bg-yellow-700 hover:bg-neutral-600 text-white rounded-lg cursor-pointer flex items-center gap-2",
  },
];
