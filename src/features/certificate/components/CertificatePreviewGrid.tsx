import { ArrowLeft, DownloadIcon } from "lucide-react";
import CustomButton from "@/components/common/Button";

type Props = {
  previewUrls: string[];
  certificateTypes: { type: string }[];
  handleDownloadAll: () => void;
  onBack: () => void;
};

export default function CertificatePreviewGrid({
  previewUrls,
  certificateTypes,
  handleDownloadAll,
  onBack,
}: Props) {
  return (
    <>
     

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
        {previewUrls.map((url, idx) => (
          <div key={idx} className="border rounded-lg overflow-hidden shadow-lg">
            <iframe
              src={url}
              width="100%"
              height="400px"
              title={`Preview ${certificateTypes[idx]?.type ?? "Certificate"}`}
            />
            <p className="p-2 text-center text-sm text-gray-500 dark:text-gray-400">
              {certificateTypes[idx]?.type}
            </p>
          </div>
        ))}
      </div>

      <div className="flex gap-4 mt-6">
       
        <CustomButton
        isBack
          title="Back"
          icon={<ArrowLeft/>}
          onClick={onBack}
        />
         <CustomButton
          title="Download All Certificates"
          icon={<DownloadIcon className="mr-2" />}
          onClick={handleDownloadAll}
         
        />
      </div>
    </>
  );
}
