import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  AUTH_FORBIDDEN_EVENT,
  type AuthForbiddenEventDetail,
} from "@/constants/authRedirect";

export default function AuthRedirectHandler() {
  const navigate = useNavigate();
  const location = useLocation();
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const handleForbidden = (event: Event) => {
      const { delayMs = 2500, to = "/login" } =
        (event as CustomEvent<AuthForbiddenEventDetail>).detail ?? {};

      if (location.pathname === to) {
        return;
      }

      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = window.setTimeout(() => {
        navigate(to, {
          replace: true,
          state: {
            from: location.pathname,
          },
        });
      }, delayMs);
    };

    window.addEventListener(AUTH_FORBIDDEN_EVENT, handleForbidden);

    return () => {
      window.removeEventListener(AUTH_FORBIDDEN_EVENT, handleForbidden);

      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, [location.pathname, navigate]);

  return null;
}
