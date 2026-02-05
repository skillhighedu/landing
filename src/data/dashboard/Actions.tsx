import { PlayCircle, GraduationCap, Lock } from "lucide-react";

type DashboardMode = "demo" | "real";

export const getCourseActions = (
  slug: string,
  mode: DashboardMode
) => {
  if (mode === "demo") {
    return [
      {
        label: "View Demo Dashboard",
        icon: <PlayCircle size={18} />,
        href: `/courses/${slug}/demo/play`,
        className:
          "bg-primary text-white rounded-lg cursor-pointer flex items-center gap-2",
      },
      {
        label: "Unlock Full Course",
        icon: <Lock size={18} />,
        href: "#pricing",
        className:
          "bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg cursor-pointer flex items-center gap-2",
      },
    ];
  }

  // ✅ REAL DASHBOARD ACTIONS
  return [
    {
      label: "Start Learning",
      icon: <PlayCircle size={18} />,
      href: `/course-dashboard/${slug}/lessons`,
      className:
        "bg-primary text-white rounded-lg cursor-pointer flex items-center gap-2",
    },
    {
      label: "Claim Certificates",
      icon: <GraduationCap size={18} />,
      href: `/course-dashboard/${slug}/certificates`,
      className:
        "bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg cursor-pointer flex items-center gap-2",
    },
  ];
};
