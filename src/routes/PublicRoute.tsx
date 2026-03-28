import Spinner from "@/components/ui/Spinner";
import { useAuthStore } from "@/store/authStore";
import type { JSX } from "react";
import { Navigate } from "react-router-dom";

interface PublicRouteProps {
  children: JSX.Element;
  isAuthenticated: boolean;
  loading: boolean;
}

export default function PublicRoute({ children, isAuthenticated,loading }: PublicRouteProps) {
  const { user } = useAuthStore();

  if (loading) return <Spinner />;

  if (isAuthenticated) {
    return <Navigate to={user?.role === "mentor" ? "/mentor/dashboard" : "/profile"} replace />;
  }

  return children;
}
