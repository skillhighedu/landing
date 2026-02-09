import { PlayCircle, GraduationCap, Lock } from "lucide-react";

type DashboardMode = "demo" | "real";

export const getCourseActions = (
  slug: string,
  mode: DashboardMode,
  onClaimCertificate?: () => void
) => {
  if (mode === "demo") {
    return [
      {
        label: "View Demo Dashboard",
        icon: <PlayCircle size={18} />,
        href: `/course/${slug}/demo/play`,
      },
      {
        label: "Unlock Full Course",
        icon: <Lock size={18} />,
        href: "#pricing",
      },
    ];
  }

  return [
    {
      label: "Start Learning",
      icon: <PlayCircle size={18} />,
      href: `/course-dashboard/${slug}/lessons`,
    },
    {
      label: "Claim Certificates",
      icon: <GraduationCap size={18} />,
      onClick: onClaimCertificate,   // ← important
    },
  ];
};
