import { BookOpen, LogOut, Settings, UserRound } from "lucide-react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import type { StudentProfile } from "../types";
import CustomButton from "@/components/common/Button";

interface Props {
  student?: StudentProfile;
  loading: boolean;
  onLogout: () => void;
  activeSection: "courses" | "settings";
  onSectionChange: (section: "courses" | "settings") => void;
}

export default function ProfileSidebar({
  student,
  loading,
  onLogout,
  activeSection,
  onSectionChange,
}: Props) {
  const initial = student?.name?.[0] ?? "S";
  const courses = student?.courses ?? [];

  const itemClasses = (isActive: boolean) =>
    clsx(
      "flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left text-sm font-medium transition-all",
      isActive
        ? "border-primary/20 bg-primary/10 text-primary"
        : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300 hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:border-neutral-700 dark:hover:bg-neutral-800"
    );

  return (
    <div className="sticky top-24 space-y-5">
      <div className="rounded-[28px] border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
        {loading ? (
          <>
            <div className="mx-auto mb-4 h-16 w-16 animate-pulse rounded-full bg-neutral-200 dark:bg-neutral-800" />
            <div className="mx-auto mb-2 h-4 w-32 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
            <div className="mx-auto h-3 w-40 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
          </>
        ) : (
          <>
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-3xl border border-primary/20 bg-primary/10 text-2xl font-semibold text-primary">
              {initial}
            </div>

            <p className="text-center text-xs  uppercase tracking-[0.22em] text-primary/70">
              Student Space
            </p>

            <h3 className="mt-2 text-center text-md sm:text-md  text-neutral-900 dark:text-white">
               {student?.name}
            </h3>

            <p className="mb-6 text-center font-mono text-sm text-neutral-500 dark:text-neutral-400 break-all">
              {student?.email}
            </p>

            <div className="space-y-3">
              <button
                type="button"
                onClick={() => onSectionChange("courses")}
                className={itemClasses(activeSection === "courses")}
              >
                <BookOpen size={18} className="shrink-0" />
                <span>Your Courses</span>
              </button>

              <button
                type="button"
                onClick={() => onSectionChange("settings")}
                className={itemClasses(activeSection === "settings")}
              >
                <Settings size={18} className="shrink-0" />
                <span>Profile Settings</span>
              </button>
            </div>
          </>
        )}
      </div>

   

     {!loading && 
      <CustomButton
        type="button"
        title="Logout"
        onClick={onLogout}
        icon={<LogOut size={18} />}
        
        className="flex w-full items-center justify-center gap-2 rounded-[22px] border border-red-200 bg-red-50  text-sm  text-red-600 transition-colors hover:bg-red-100 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-400 dark:hover:bg-red-950/40"
      >
             </CustomButton>
     }
        
 
    </div>
  );
}
