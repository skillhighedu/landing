import { useQuery } from "@tanstack/react-query";
import { verifyCertificateService } from "../services/generate-certificate.service";
import { useCertificateStore } from "@/store/certificate.store";

export const useVerifyCertificate = (cid: string) => {
  const setCertificateDetails = useCertificateStore(
    (s) => s.setCertificateDetails
  );

  return useQuery({
    queryKey: ["certificate", cid],
    queryFn: async () => {
      const data = await verifyCertificateService(cid);
      setCertificateDetails(data);
      return data;
    },
    enabled: !!cid,
  });
};
