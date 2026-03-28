import { useMutation, useQuery } from "@tanstack/react-query";
import { generateCerticateService, verifyCertificateService } from "../services/generate-certificate.service";
import { useCertificateStore } from "@/store/certificate.store";
import type { CertificateDetails } from "@/types/certificateStore";

export const useGenerateCertificate = () => {
  const setCertificateDetails = useCertificateStore(
    (s) => s.setCertificateDetails
  );

  return useMutation<
    CertificateDetails,
    Error,
    { slug: string; navigate: (path: string) => void;  }
  >({
    mutationFn: ({ slug, navigate,  }) =>
      generateCerticateService(slug, navigate),
    onSuccess: (data) => {
      setCertificateDetails(data);
    },
  });
};

export const useVerifyCertificate = (cid: string) => {
  const setCertificateDetails = useCertificateStore(
    (s) => s.setCertificateDetails
  );

  return useQuery<CertificateDetails, Error>({
    queryKey: ["verify-certificate", cid],
    queryFn: async () => {
      const data = await verifyCertificateService(cid);
      setCertificateDetails(data);
      return data;
    },
    enabled: !!cid,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
};