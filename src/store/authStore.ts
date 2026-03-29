import { create } from "zustand";
import api from "@/config/axiosConfig";
import axios from "axios";

interface User {
  role: string;
  userId?: string;
  courseId?: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  isCheckingAuth: boolean;
  authChecked: boolean;
  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
  login: (userData: User) => void;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user:            null,
  isAuthenticated: false,
  loading:         true,
  error:           null,
  isCheckingAuth:  false,
  authChecked:     false,

  checkAuth: async () => {
    // already checked or in progress — skip
    if (get().isCheckingAuth || get().authChecked) return;

    // skip on public pages that don't need auth
    const publicPaths = ["/signup", "/mentor/login"];
    if (publicPaths.includes(window.location.pathname)) {
      set({ loading: false, isCheckingAuth: false, authChecked: true });
      return;
    }

    set({ loading: true, isCheckingAuth: true });

    try {
      const res = await api.get("/auth/check/", { withCredentials: true });
      const { role, userId, courseId } = res.data?.additional ?? {};

      if (role) {
        set({
          user:            { role, userId, courseId },
          isAuthenticated: true,
          loading:         false,
          isCheckingAuth:  false,
          authChecked:     true,
        });
      } else {
        set({
          user:            null,
          isAuthenticated: false,
          loading:         false,
          isCheckingAuth:  false,
          authChecked:     true,
        });
      }
    } catch (error) {
      const isNetworkError =
        !navigator.onLine ||
        (axios.isAxiosError(error) && !error.response) ||
        (typeof error === "object" &&
          error !== null &&
          "isNetworkError" in error &&
          Boolean((error as { isNetworkError?: boolean }).isNetworkError));

      if (isNetworkError) {
        set((state) => ({
          user: state.user,
          isAuthenticated: Boolean(state.user),
          loading: false,
          isCheckingAuth: false,
          authChecked: true,
          error: "Network connection lost",
        }));
        return;
      }

      set({
        user:            null,
        isAuthenticated: false,
        loading:         false,
        isCheckingAuth:  false,
        authChecked:     true,
      });
    }
  },

  logout: async () => {
    set({
      user:            null,
      isAuthenticated: false,
      loading:         false,
      authChecked:     false,  
      isCheckingAuth:  false,
    });

    void api.post("/auth/logout", {}, { withCredentials: true }).catch(() => {
      // local logout + redirect should still complete even if the request fails
    });

    window.location.replace("/");
  },

  login: (userData: User) => {
    set({
      user:            userData,
      isAuthenticated: true,
      loading:         false,
      authChecked:     true,
    });
  },

  setUser: (user: User | null) => set({ user }),
}));
