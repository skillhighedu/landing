import { create } from "zustand";

type SidebarState = {
  open: boolean;
  toggle: () => void;
  setOpen: (v: boolean) => void;
};

export const useSidebarStore = create<SidebarState>((set) => ({
  open: true,
  toggle: () => set((s) => ({ open: !s.open })),
  setOpen: (v) => set({ open: v }),
}));