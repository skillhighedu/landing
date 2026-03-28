import { useAuthStore } from "@/store/authStore";
import ProfilePage from "../profile/ProfilePage";
import MentorProfilePage from "@/features/mentor/pages/Profile";

export default function Profile() {
  const { user } = useAuthStore();

  return user?.role === "mentor" ? <MentorProfilePage /> : <ProfilePage />;
}
