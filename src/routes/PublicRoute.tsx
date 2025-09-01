import Spinner from "@/components/ui/Spinner";
import type { JSX } from "react";
import { Navigate } from "react-router-dom";

interface PublicRouteProps {
  children: JSX.Element;
  isAuthenticated: boolean;
  loading: boolean;
}

export default function PublicRoute({ children, isAuthenticated,loading }: PublicRouteProps) {
 
    if(loading) return <Spinner/>
  return isAuthenticated ? <Navigate to="/" replace /> : children;
}
