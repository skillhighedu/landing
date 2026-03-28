import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import Spinner from "@/components/ui/Spinner";

export default function MentorRoute() {
  const { user, loading, authChecked } = useAuthStore();


  if (loading || !authChecked) {
    return (
      <div className="flex items-center justify-center min-h-screen text-primary h-screen">
        <Spinner />
      </div>
    );
  }

  if (user?.role !== "mentor") {
    return <Navigate to="/mentor/login" replace />;
  }

  return <Outlet />;
}