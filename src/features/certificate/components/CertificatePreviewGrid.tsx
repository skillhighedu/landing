import { DownloadIcon } from "lucide-react";
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
};

export default function CertificatePreviewGrid({
  previewUrls,
  certificateTypes,
  getCertificateId,
  handleDownloadAll,
}: Props) {
  return (
    <>
      <div className="mb-6 flex w-full max-w-6xl flex-col gap-4 rounded-[28px] border border-neutral-200 bg-white p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary">
            Preview Ready
          </p>
          <h2 className="mt-2 font-mono text-xl text-neutral-900 dark:text-white sm:text-2xl">
            Review your certificates before downloading
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-600 dark:text-neutral-400">
            Each preview is shown below with its certificate ID. Download all once everything looks correct.
          </p>
        </div>

        <CustomButton
          title="Download All Certificates"
          icon={<DownloadIcon className="mr-2" />}
          onClick={handleDownloadAll}
          className="w-full justify-center font-mono sm:w-auto"
        />
      </div>

      <div className="grid w-full max-w-4xl grid-cols-1 gap-5">
        {previewUrls.map((url, idx) => (
          <div
            key={idx}
            className="overflow-hidden rounded-[24px] border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900"
          >
            <div className="border-b border-neutral-200 bg-neutral-50 px-4 py-4 dark:border-neutral-800 dark:bg-neutral-900/80">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary">
                    {certificateTypes[idx]?.type}
                  </p>
                  <p className="mt-1 font-mono text-sm text-gray-700 dark:text-gray-300">
                    {getCertificateId(certificateTypes[idx]) || "ID not available"}
                  </p>
                </div>
              </div>
            </div>

            <iframe
              src={url}
              width="100%"
              height="320px"
              title={`Preview ${certificateTypes[idx]?.type ?? "Certificate"}`}
              className="block h-[320px] w-full sm:h-[420px] lg:h-[520px]"
            />
          </div>
        ))}
      </div>
    </>
  );
}
