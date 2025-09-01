import { create } from "zustand";
import api from "@/config/axiosConfig";

interface User { role: string; }

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
  user: null,
  isAuthenticated: false,
  loading: true,
  error: null,
  isCheckingAuth: false,
  authChecked: false,

  checkAuth: async () => {
    if (get().isCheckingAuth || get().authChecked) return;

    set({ loading: true, isCheckingAuth: true });
// Check if we're on signup page - if so, don't check auth
    if (window.location.pathname === "/signup") {
      set({ loading: false, isCheckingAuth: false });
      return;
    }
    set({ isCheckingAuth: true });
    try {
      const res = await api.get("/auth/check/", { withCredentials: true });
      const role = res.data?.additional?.role;

      if (role) {
        set({
          user: { role },
          isAuthenticated: true,
          loading: false,
          isCheckingAuth: false,
          authChecked: true,
        });
      } else {
        set({
          user: null,
          isAuthenticated: false,
          loading: false,
          isCheckingAuth: false,
          authChecked: true,
        });
      }
    } catch {
      set({
        user: null,
        isAuthenticated: false,
        loading: false,
        isCheckingAuth: false,
        authChecked: true,
      });
    }
  },

  logout: async () => {
    set({ loading: true });
    await api.post("/auth/logout", {}, { withCredentials: true });
    set({
      user: null,
      isAuthenticated: false,
      loading: false,
      authChecked: true,
    });

  },

  login: (userData: User) => {
    set({
      user: userData,
      isAuthenticated: true,
      loading: false,
      authChecked: true,
    });
  },

  setUser: (user: User | null) => set({ user }),
}));
