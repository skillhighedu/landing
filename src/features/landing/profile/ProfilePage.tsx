import { useEffect, useState } from "react";
import { profile } from "@/services/student-service";
import { useStudentProfileStore } from "@/store/studentStore";
import { useAuthStore } from "@/store/authStore";

import ProfileHeader from "./components/ProfileHeader";
import ProfileSidebar from "./components/ProfileSidebar";
import ProfileForm from "./components/ProfileForm";
import YourCourses from "./components/YourCourses";

export default function ProfilePage() {
  const { studentProfile, setStudentProfile } = useStudentProfileStore();
  const { logout } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await profile();
        setStudentProfile([res]);
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  const student = studentProfile[0];

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <div className="max-w-7xl mx-auto px-4 py-10">

        {/* Header */}
        <ProfileHeader name={student?.name} loading={loading} />

        {/* MAIN DASHBOARD LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8 items-start">
          
          {/* SIDEBAR (STICKY) */}
          <ProfileSidebar
            student={student}
            loading={loading}
            onLogout={logout}
          />

          {/* MAIN CONTENT (SCROLLS) */}
          <div className="space-y-10 min-h-[60vh]">
            {!loading && student && <ProfileForm student={student} />}

            <YourCourses
              courses={student}
              loading={loading}
              onPayment={() => {}}
            />
          </div>

        </div>
      </div>
    </div>
  );
}
