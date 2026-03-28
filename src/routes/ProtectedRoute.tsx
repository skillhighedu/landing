import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import Spinner from "../components/ui/Spinner";

export default function ProtectedRoute() {
  const { user, loading, authChecked, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);  

  if (loading || !authChecked) {
    return (
      <div className="flex items-center justify-center min-h-screen text-primary h-screen">
        <Spinner />
      </div>
    );
  }

  // allow both students AND mentors through — MentorRoute handles the role check
  if (!user) {
    return <Navigate to="/signup" replace />;
  }

  return <Outlet />;
}