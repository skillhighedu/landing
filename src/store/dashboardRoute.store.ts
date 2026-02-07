import { create } from "zustand";

type Mode = "demo" | "real";

interface DashboardRouteState {
  slug: string;
  mode: Mode;
  setRoute: (slug: string, mode: Mode) => void;
}

export const useDashboardRouteStore = create<DashboardRouteState>((set) => ({
  slug: "",
  mode: "real",
  setRoute: (slug, mode) => set({ slug, mode }),
}));
