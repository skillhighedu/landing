
import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";


export const useCheckAuthentication = () => {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);
};
 


