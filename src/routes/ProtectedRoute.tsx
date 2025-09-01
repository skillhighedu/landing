import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import Spinner from "../components/ui/Spinner";

export default function ProtectedRoute() {
  const { user, loading, checkAuth } = useAuthStore();
  console.log(useAuthStore.getState())
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-primary h-screen">
        <Spinner/>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/signup" replace />;
  }

  return <Outlet />;
}
