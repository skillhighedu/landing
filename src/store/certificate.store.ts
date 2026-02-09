import { create } from "zustand";
import type { CertificateStoreState } from "@/types/certificateStore";

export const useCertificateStore = create<CertificateStoreState>((set) => ({
  certificateDetails: null,

  setCertificateDetails: (data) =>
    set({ certificateDetails: data }),

  resetCertificate: () =>
    set({
      certificateDetails: null,
    }),
}));
