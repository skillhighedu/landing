import { PlayCircle, GraduationCap } from "lucide-react";

export const getCourseActions = (slug: string) => [
  {
    label: "Start Learning",
    icon: <PlayCircle size={18} />,
    href: `/course-dashboard/${slug}/lessons`,
    className: "text-white rounded-lg cursor-pointer flex items-center gap-2",
  },

  {
    label: "Claim Certificates",
    icon: <GraduationCap size={18} />,
    href: null,
    className:
      "bg-neutral-700 hover:bg-neutral-600 text-white rounded-lg cursor-pointer flex items-center gap-2",
  }
];
