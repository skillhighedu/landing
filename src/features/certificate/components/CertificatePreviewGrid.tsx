import { DownloadIcon, EyeIcon, FileText } from "lucide-react";
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
  isDownloading: boolean;
};

export default function CertificatePreviewGrid({
  previewUrls,
  certificateTypes,
  getCertificateId,
  handleDownloadAll,
  isDownloading,
}: Props) {
  const handleOpenCertificate = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <div className="mb-5 flex w-full max-w-6xl flex-col gap-4 rounded-[24px] border border-neutral-200 bg-white p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 sm:mb-6 sm:rounded-[28px] sm:p-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-primary">
            Preview Ready
          </p>
          <h2 className="mt-2 font-mono text-lg leading-tight text-neutral-900 dark:text-white sm:text-2xl">
            Review your certificates before downloading
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-600 dark:text-neutral-400">
            Each preview is shown below with its certificate ID. Download all once everything looks correct.
          </p>
        </div>

        <CustomButton
          title={isDownloading ? "Preparing Downloads" : "Download Certificates"}
          icon={<DownloadIcon className="mr-2" />}
          onClick={handleDownloadAll}
          loading={isDownloading}
          disabled={isDownloading}
          className="w-full justify-center px-3 py-4 font-mono text-sm sm:w-auto sm:px-4"
        />
      </div>

      <div className="grid w-full max-w-4xl grid-cols-1 gap-4 sm:gap-5">
        {previewUrls.map((url, idx) => (
          <div
            key={idx}
            className="overflow-hidden rounded-[20px] border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900 sm:rounded-[24px]"
          >
            <div className="border-b border-neutral-200 bg-neutral-50 px-4 py-4 dark:border-neutral-800 dark:bg-neutral-900/80">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary">
                    {certificateTypes[idx]?.type}
                  </p>
                  <p className="mt-1 break-all font-mono text-sm text-gray-700 dark:text-gray-300">
                    {getCertificateId(certificateTypes[idx]) || "ID not available"}
                  </p>
                </div>
              </div>
            </div>

            <div className="border-b border-neutral-200 bg-neutral-50/70 p-4 dark:border-neutral-800 dark:bg-neutral-950/40 sm:hidden">
              <div className="flex flex-col items-center rounded-[20px] border border-dashed border-neutral-200 bg-white px-4 py-8 text-center dark:border-neutral-800 dark:bg-neutral-900">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <FileText className="h-6 w-6" />
                </div>
                <p className="mt-4 font-mono text-sm text-neutral-900 dark:text-white">
                  Mobile PDF preview opens better in a new tab.
                </p>
                <p className="mt-2 max-w-xs font-mono text-xs leading-6 text-neutral-500 dark:text-neutral-400">
                  Use the action below to review this certificate without the cramped embedded viewer.
                </p>

                <div className="mt-5 flex w-full flex-col gap-3">
                  <CustomButton
                    title="Open Preview"
                    icon={<EyeIcon className="h-4 w-4" />}
                    onClick={() => handleOpenCertificate(url)}
                    className="w-full justify-center px-3 py-4 font-mono text-sm"
                  />
                </div>
              </div>
            </div>

            <iframe
              src={url}
              width="100%"
              height="320px"
              title={`Preview ${certificateTypes[idx]?.type ?? "Certificate"}`}
              className="hidden h-[320px] w-full sm:block sm:h-[420px] lg:h-[520px]"
            />
          </div>
        ))}
      </div>
    </>
  );
}
