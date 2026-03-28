import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Container from "@/layouts/Container";
import HeaderSection from "@/components/common/HeaderSection";
import { profile } from "@/services/student-service";
import { useStudentProfileStore } from "@/store/studentStore";
import { useAuthStore } from "@/store/authStore";
import ProfileHeader from "./components/ProfileHeader";
import ProfileSidebar from "./components/ProfileSidebar";
import ProfileForm from "./components/ProfileForm";
import YourCourses from "./components/YourCourses";

type ProfileSection = "courses" | "settings";

export default function ProfilePage() {
  const { studentProfile, setStudentProfile } = useStudentProfileStore();
  const { logout } = useAuthStore();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<ProfileSection>(
    location.state?.section === "settings" ? "settings" : "courses"
  );

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await profile();
        setStudentProfile([response]);
      } finally {
        setLoading(false);
      }
    }

    void fetchProfile();
  }, [setStudentProfile]);

  useEffect(() => {
    if (location.state?.section === "settings") {
      setActiveSection("settings");
      return;
    }

    if (location.state?.section === "courses") {
      setActiveSection("courses");
    }
  }, [location.state]);

  const student = studentProfile[0];

  return (
    <Container size="xl">
      <div className="mt-20 min-h-screen rounded-2xl bg-white dark:bg-neutral-900">
        <div className="mx-auto max-w-7xl px-4 pb-12">
          <div className="mb-8">
            <HeaderSection title="Profile" />
          </div>

          <ProfileHeader
            name={student?.name}
            courseCount={student?.courses?.length ?? 0}
            loading={loading}
          />

          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[300px_1fr]">
            <ProfileSidebar
              student={student}
              loading={loading}
              onLogout={logout}
              activeSection={activeSection}
              onSectionChange={setActiveSection}
            />

            <div className="space-y-8">
              {activeSection === "courses" ? (
                <YourCourses courses={student?.courses ?? []} loading={loading} />
              ) : (
                !loading && student && <ProfileForm student={student} />
              )}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
