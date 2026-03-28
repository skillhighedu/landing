import { ArrowLeft, DownloadIcon } from "lucide-react";
import CustomButton from "@/components/common/Button";

import type { CertificateIds } from "@/types/certificateStore";

type CertificatePreviewType = {
  type: string;
  idKey: keyof CertificateIds;
  background: string;
  heading: string;
  description: string;
};

type Props = {
  previewUrls: string[];
  certificateTypes: CertificatePreviewType[];
  getCertificateId: (type: CertificatePreviewType) => string;
  handleDownloadAll: () => void;
  onBack: () => void;
};

export default function CertificatePreviewGrid({
  previewUrls,
  certificateTypes,
  getCertificateId,
  handleDownloadAll,
  onBack,
}: Props) {
  return (
    <>
      <div className="grid w-full max-w-5xl grid-cols-1 gap-5 lg:grid-cols-2">
        {previewUrls.map((url, idx) => (
          <div
            key={idx}
            className="overflow-hidden rounded-[24px] border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900"
          >
            <iframe
              src={url}
              width="100%"
              height="320px"
              title={`Preview ${certificateTypes[idx]?.type ?? "Certificate"}`}
              className="block w-full sm:h-[380px] lg:h-[420px]"
            />
            <div className="border-t border-neutral-200 bg-white px-4 py-4 text-center dark:border-neutral-800 dark:bg-neutral-900">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary">
                {certificateTypes[idx]?.type}
              </p>
              <p className="mt-2 font-mono text-sm text-gray-700 dark:text-gray-300">
                {getCertificateId(certificateTypes[idx]) || "ID not available"}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex w-full max-w-5xl flex-col gap-3 sm:flex-row">
        <CustomButton
          isBack
          title="Back"
          icon={<ArrowLeft />}
          onClick={onBack}
          className="w-full justify-center sm:w-auto"
        />

        <CustomButton
          title="Download All Certificates"
          icon={<DownloadIcon className="mr-2" />}
          onClick={handleDownloadAll}
          className="w-full justify-center sm:w-auto"
        />
      </div>
    </>
  );
}
