import { useEffect, useState, type ReactNode } from "react";
import HeaderSection from "@/components/common/HeaderSection";
import Container from "@/layouts/Container";
import api from "@/config/axiosConfig";
import { handleApiError } from "@/utils/errorHandler";
import type { ApiResponse } from "@/types";
import type { MentorProfile } from "../types";
import { useAuthStore } from "@/store/authStore";
import LogoutConfirmDialog from "@/features/dashboard/components/sidebar/LogoutConfirmDialog";

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-4 border-b border-border/60 py-4 last:border-0">
      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl border border-primary/15 bg-primary/8 text-primary">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="truncate text-sm font-semibold text-foreground">{value}</p>
      </div>
    </div>
  );
}

function Avatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("");

  return (
    <div className="relative">
      <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-primary text-3xl font-bold text-primary-foreground shadow-lg shadow-primary/20">
        {initials || "M"}
      </div>
      <span className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-background bg-emerald-500" />
    </div>
  );
}

export default function Profile() {
  const [profile, setProfile] = useState<MentorProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await api.get<ApiResponse<MentorProfile>>("/mentors/profile");
        setProfile(response.data.additional ?? null);
      } catch (error) {
        handleApiError(error);
      } finally {
        setLoading(false);
        setTimeout(() => setVisible(true), 40);
      }
    }

    void fetchProfile();
  }, []);

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      await logout();
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <Container>
      <div
        className={`mt-20 py-10 font-mono transition-all duration-500 ${
          visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
        }`}
      >
        <HeaderSection title="Mentor Profile" />

        <div className="mt-8 flex justify-center">
          <div className="w-full max-w-lg">
            {loading ? (
              <div className="animate-pulse space-y-6 rounded-[28px] border border-border bg-card p-8">
                <div className="flex flex-col items-center gap-4">
                  <div className="h-24 w-24 rounded-3xl bg-muted" />
                  <div className="h-5 w-40 rounded-full bg-muted" />
                  <div className="h-4 w-28 rounded-full bg-muted" />
                </div>
                <div className="space-y-3 border-t border-border pt-4">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-xl bg-muted" />
                      <div className="flex-1 space-y-1.5">
                        <div className="h-3 w-16 rounded-full bg-muted" />
                        <div className="h-4 w-2/3 rounded-full bg-muted" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : !profile ? (
              <div className="space-y-3 rounded-[28px] border border-dashed border-border bg-card/70 p-12 text-center">
                <p className="text-lg font-semibold text-foreground">No profile found</p>
                <p className="text-sm text-muted-foreground">
                  Your profile data could not be loaded right now. Please try again later.
                </p>
              </div>
            ) : (
              <div className="overflow-hidden rounded-[28px] border border-border bg-card shadow-sm">
                <div className="h-20 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent" />

                <div className="-mt-12 flex flex-col items-center gap-2 px-8 pb-6 text-center">
                  <Avatar name={profile.mentorName} />
                  <div className="mt-3">
                    <h2 className="text-xl font-bold text-foreground">{profile.mentorName}</h2>
                    <p className="text-sm text-muted-foreground">{profile.email}</p>
                    <div className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/8 px-3 py-1 text-xs font-semibold text-primary">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      Mentor
                    </div>
                  </div>
                </div>

                <div className="border-t border-border/60 px-8 pb-4">
                  <InfoRow
                    icon={
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    }
                    label="Full Name"
                    value={profile.mentorName}
                  />
                  <InfoRow
                    icon={
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    }
                    label="Email Address"
                    value={profile.email}
                  />
                  {profile.courseName && (
                    <InfoRow
                      icon={
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      }
                      label="Assigned Course"
                      value={profile.courseName}
                    />
                  )}
                </div>

                <div className="px-8 pb-8 pt-2">
                  <LogoutConfirmDialog onConfirm={() => void handleLogout()}>
                    <button
                      type="button"
                      disabled={loggingOut}
                      className="flex w-full items-center cursor-pointer justify-center gap-2 rounded-2xl border border-red-200 bg-red-50 px-6 py-3 text-sm font-semibold text-red-600 transition-colors duration-200 hover:bg-red-100 disabled:opacity-60"
                    >
                      {loggingOut ? "Logging out..." : "Logout"}
                    </button>
                  </LogoutConfirmDialog>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
}
