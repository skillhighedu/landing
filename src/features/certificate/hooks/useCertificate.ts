import { useMutation } from "@tanstack/react-query";
import { generateCerticateService } from "../services/generate-certificate.service";
import { useCertificateStore } from "@/store/certificate.store";
import type { CertificateDetails } from "@/types/certificateStore";

export const useGenerateCertificate = () => {
  const setCertificateDetails = useCertificateStore(
    (s) => s.setCertificateDetails
  );

  return useMutation<
    CertificateDetails,
    Error,
    { slug: string; navigate: (path: string) => void }
  >({
    mutationFn: ({ slug, navigate }) =>
      generateCerticateService(slug, navigate),

    onSuccess: (data) => {
      setCertificateDetails(data);
    },
  });
};
