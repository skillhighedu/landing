"use client";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PDFDocument, PDFFont, rgb, StandardFonts } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import certificateBg from "@/assets/images/certificate/certificate.jpg";

import { saveAs } from "file-saver";
import { useCertificateStore } from "@/store/certificate.store";
import { formatDate } from "@/utils/date";
import { AlertTriangle, EyeIcon, PencilLine, ShieldCheck, X } from "lucide-react";

import { alexBrushFont, CormorantGramond } from "@/assets/fonts";
import CustomButton from "@/components/common/Button";
import CertificatePreviewGrid from "./CertificatePreviewGrid";
import type { CertificateIds } from "@/types/certificateStore";

const certificateTypes = [
  {
    type: "Internship",
    idKey: "internshipId" as keyof CertificateIds,
    background: certificateBg,
    heading: "INTERNSHIP COMPLETION CERTIFICATE",
    description: "for successfully completing the  industrial internship in ",
  },
  {
    type: "Industrial",
    idKey: "industrialTrainingId" as keyof CertificateIds,
    background: certificateBg,
    heading: "INDUSTRIAL PARTICIPATION CERTIFICATE",
    description: "for successfully participating in industrial training in ",
  },
  {
    type: "Participation",
    idKey: "participationId" as keyof CertificateIds,
    background: certificateBg,
    heading: "PARTICIPATION CERTIFICATE",
    description: "for actively participating in ",
  },
];

type CertificateType = (typeof certificateTypes)[number];

interface CertficateGeneratorProps {
  skipNameConfirmation?: boolean;
}

export default function CertficateGenerator({
  skipNameConfirmation = false,
}: CertficateGeneratorProps) {
  const navigate = useNavigate();
  const { certificateDetails } = useCertificateStore();
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [showNameConfirm, setShowNameConfirm] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    if (!showNameConfirm) return;

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [showNameConfirm]);

  const getTypeCertificateId = (type: CertificateType): string => {
    const ids = certificateDetails?.certificateIds;

    if (!ids) {
      return "";
    }

    return ids[type.idKey] || "";
  };

  const generateCertificates = async () => {
    try {
      const urls: string[] = [];

      for (const cert of certificateTypes) {
        const pdfDoc = await PDFDocument.create();
        pdfDoc.registerFontkit(fontkit);

        const page = pdfDoc.addPage([1123, 794]);

        // Fonts
        const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
        const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);

        const alexBytes = await fetch(alexBrushFont).then((res) =>
          res.arrayBuffer(),
        );
        const alexFont = await pdfDoc.embedFont(alexBytes);

        const cormorantBytes = await fetch(CormorantGramond).then((res) =>
          res.arrayBuffer(),
        );
        const cormorantFont = await pdfDoc.embedFont(cormorantBytes);

        // Background
        const imageBytes = await fetch(cert.background).then((res) =>
          res.arrayBuffer(),
        );
        const jpgImage = await pdfDoc.embedJpg(imageBytes);
        page.drawImage(jpgImage, {
          x: 0,
          y: 0,
          width: page.getWidth(),
          height: page.getHeight(),
        });

        // Helper to center text
        const center = (
          text: string,
          size: number,
          font: PDFFont,
          y: number,
          color = rgb(0, 0, 0),
        ) => {
          const width = font.widthOfTextAtSize(text, size);
          page.drawText(text, {
            x: (page.getWidth() - width) / 2,
            y,
            size,
            font,
            color,
          });
        };

        // Subtitle
        center(
          "This Certificate is Proudly Presented to",
          20,
          fontRegular,
          470,
          rgb(0.4, 0.4, 0.4),
        );

        // Name
        center(
          certificateDetails?.name || "Your Name",
          46,
          alexFont,
          415,
          rgb(0.8627, 0.7059, 0.3451),
        );

        const fontGray = rgb(0.2, 0.2, 0.2);

        // Line 1: description
        center(cert.description, 20, cormorantFont, 365, fontGray);

        // Line 2: course + dates
        const courseParts = [
          {
            text: certificateDetails?.courseName || "Course Name",
            font: fontBold,
            color: rgb(0, 0, 0),
          },
          { text: "  program from ", font: cormorantFont, color: fontGray },
          {
            text: formatDate(certificateDetails?.fromDate || "DD/MM/YYYY"),
            font: fontBold,
            color: rgb(0, 0, 0),
          },
          { text: " to ", font: cormorantFont, color: fontGray },
          {
            text: formatDate(certificateDetails?.toDate || "DD/MM/YYYY"),
            font: fontBold,
            color: rgb(0, 0, 0),
          },
        ];

        const totalWidth = courseParts.reduce(
          (acc, part) => acc + part.font.widthOfTextAtSize(part.text, 20),
          0,
        );
        let startX = (page.getWidth() - totalWidth) / 2;

        for (const part of courseParts) {
          page.drawText(part.text, {
            x: startX,
            y: 335,
            size: 20,
            font: part.font,
            color: part.color,
          });
          startX += part.font.widthOfTextAtSize(part.text, 20);
        }

        // QR Code
        if (certificateDetails?.qrCode) {
          try {
            const qrBytes = await fetch(certificateDetails.qrCode).then((res) =>
              res.arrayBuffer(),
            );
            const qrImage = await pdfDoc.embedPng(qrBytes);
            page.drawImage(qrImage, {
              x: (page.getWidth() + 680) / 2,
              y: 160,
              width: 80,
              height: 80,
            });
          } catch (qrErr) {
            console.warn(`QR Code missing for ${cert.type}`, qrErr);
          }
        }

        // Certificate ID
        const certificateId = certificateDetails?.cid || "";
        const typeCertificateId = getTypeCertificateId(cert);

        const certificateIdText = `Certificate ID: ${certificateId}`;
        page.drawText(certificateIdText, {
          x:
            (page.getWidth() -
              fontRegular.widthOfTextAtSize(certificateIdText, 14)) /
            2,
          y: 280,
          size: 14,
          font: fontRegular,
          color: fontGray,
        });

        if (typeCertificateId) {
          const typeIdLabel =
            cert.type === "Internship"
              ? "Internship ID"
              : cert.type === "Industrial"
                ? "Industrial Training ID"
                : "Participation ID";

          const typeCertificateIdText = `${typeIdLabel}: ${typeCertificateId}`;
          page.drawText(typeCertificateIdText, {
            x:
              (page.getWidth() -
                fontRegular.widthOfTextAtSize(typeCertificateIdText, 13)) /
              2,
            y: 260,
            size: 13,
            font: fontRegular,
            color: fontGray,
          });
        }

        const pdfBytes = await pdfDoc.save();
        const arrayBuffer = pdfBytes.buffer.slice(
          pdfBytes.byteOffset,
          pdfBytes.byteOffset + pdfBytes.byteLength,
        );
        const pdfBlob = new Blob([arrayBuffer as ArrayBuffer], {
          type: "application/pdf",
        });
        const pdfUrl = URL.createObjectURL(pdfBlob);
        urls.push(pdfUrl);
      }

      setPreviewUrls(urls);
      setIsPreviewMode(true);
    } catch (err) {
      console.error("PDF generation failed", err);
      alert("Something went wrong while generating the certificates.");
    }
  };

  const handleDownloadAll = async () => {
    setIsDownloading(true);

    try {
      for (let i = 0; i < previewUrls.length; i++) {
        const url = previewUrls[i];
        const certType = certificateTypes[i]?.type ?? `Certificate${i + 1}`;
        if (typeof url === "string") {
          const response = await fetch(url);
          const blob = await response.blob();
          saveAs(
            blob,
            `${certificateDetails?.courseName || "certificate"}_${certType}.pdf`,
          );
        }
      }
    } finally {
      setIsDownloading(false);
    }
  };

  const handlePreviewClick = () => {
    if (skipNameConfirmation) {
      void generateCertificates();
      return;
    }

    setShowNameConfirm(true);
  };

  return (
    <div className="flex min-h-screen flex-col items-center gap-6 p-3 sm:p-6 lg:p-8 dark:bg-darkPrimary">
      {showNameConfirm && (
        <div className="fixed inset-0 z-[100] overflow-y-auto overscroll-contain bg-black/70 p-3 backdrop-blur-sm sm:flex sm:items-center sm:justify-center sm:p-4">
          <div className="relative mx-auto my-4 w-full max-w-2xl overflow-y-auto overscroll-contain rounded-[28px] border border-neutral-200 bg-white p-5 text-neutral-900 shadow-2xl [max-height:calc(100dvh-1.5rem)] dark:border-neutral-800 dark:bg-neutral-950 dark:text-white sm:my-0 sm:rounded-[32px] sm:p-8 sm:[max-height:calc(100dvh-2rem)]">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-linear-to-b from-primary/10 to-transparent sm:h-28" />

            <button
              type="button"
              onClick={() => setShowNameConfirm(false)}
              className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-2xl border border-neutral-200 bg-white/90 text-neutral-500 transition hover:border-neutral-400 hover:text-neutral-900 dark:border-neutral-700 dark:bg-neutral-900/90 dark:text-neutral-300 dark:hover:border-neutral-500 dark:hover:text-white sm:right-4 sm:top-4 sm:h-10 sm:w-10"
              aria-label="Close dialog"
            >
              <X size={18} />
            </button>

            <div className="relative mb-6 text-left">
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-500/15 text-amber-400 sm:h-12 sm:w-12">
                  <AlertTriangle size={20} />
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/12 text-primary sm:h-12 sm:w-12">
                  <ShieldCheck size={20} />
                </div>
              </div>

              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-primary/85">
                Certificate Checkpoint
              </p>
              <h2 className="mt-3 max-w-xl font-mono text-lg leading-tight sm:text-2xl">
                Confirm your certificate name
              </h2>

              <p className="mt-3 max-w-xl font-mono text-sm leading-6 text-neutral-600 dark:text-neutral-300">
                We will use your saved profile name on every certificate.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-[1.1fr_0.9fr]">
              <div className="rounded-[24px] border border-neutral-200 bg-neutral-50 p-5 dark:border-neutral-800 dark:bg-neutral-900/90">
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-primary/80">
                  Name on certificate
                </p>
                <p className="mt-3 break-words font-mono text-lg text-neutral-900 dark:text-white sm:text-2xl">
                  {certificateDetails?.name || "Name not available"}
                </p>
                <p className="mt-3 font-mono text-sm leading-6 text-neutral-600 dark:text-neutral-400">
                  This exact name will appear on all generated certificates.
                </p>
              </div>

              <div className="rounded-[24px] border border-neutral-200 bg-neutral-50/80 p-5 dark:border-neutral-800 dark:bg-neutral-900/70">
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-amber-300/90">
                  Quick check
                </p>
                <ul className="mt-3 space-y-2 font-mono text-sm leading-6 text-neutral-700 dark:text-neutral-300">
                  <li>Check spelling.</li>
                  <li>Use your full name.</li>
                  <li>Edit first if needed.</li>
                </ul>
              </div>
            </div>

            <div className="mt-7 flex flex-col gap-3 border-t border-neutral-200 pt-6 dark:border-neutral-800 sm:flex-row sm:flex-wrap">
              <CustomButton
                type="button"
                title="Edit Name In Profile"
                icon={<PencilLine size={18} />}
                variant="outline"
                className="w-full font-mono text-neutral-900 dark:text-white sm:flex-1"
                onClick={() => {
                  setShowNameConfirm(false);
                  navigate("/profile", { state: { section: "settings" } });
                }}
              />
              <CustomButton
                type="button"
                title="Name Is Correct"
                icon={<EyeIcon className="mr-2" />}
                className="w-full font-mono sm:flex-1"
                onClick={() => {
                  setShowNameConfirm(false);
                  void generateCertificates();
                }}
              />
            </div>

            <p className="mt-4 font-mono text-xs leading-5 text-neutral-500 dark:text-neutral-500">
              Update it in profile settings first if anything looks wrong.
            </p>
          </div>
        </div>
      )}

  
      {!isPreviewMode ? (
        <>
          <div className="w-full max-w-5xl rounded-[28px] border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 sm:p-6 lg:p-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-primary">
              Certificate Center
            </p>
            <h2 className="mt-3 font-mono text-2xl text-neutral-900 dark:text-white sm:text-3xl">
              Preview your certificates before downloading
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-gray-500 dark:text-gray-400">
              Generate and review your Internship, Industrial, and Participation certificates in one place before you download them.
            </p>
          </div>

          <div className="grid w-full max-w-5xl gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {certificateTypes.map((cert) => (
              <div
                key={cert.type}
                className="rounded-[24px] border border-neutral-200 bg-white p-4 text-left shadow-sm dark:border-neutral-800 dark:bg-neutral-900 sm:p-5"
              >
                <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-primary">
                  {cert.type}
                </p>
                <p className="mt-3 font-mono text-sm text-neutral-900 dark:text-white">
                  {getTypeCertificateId(cert) || "ID not available"}
                </p>
              </div>
            ))}
          </div>

          <CustomButton
            icon={  <EyeIcon className="mr-2" />}
            title="Preview Certificates"
            onClick={handlePreviewClick}
            className="mt-2 cursor-pointer p-3 font-mono text-white"
          >
          </CustomButton>
        </>
      ) : (
        <>
         <CertificatePreviewGrid
          previewUrls={previewUrls}
          certificateTypes={certificateTypes}
          getCertificateId={getTypeCertificateId}
          handleDownloadAll={handleDownloadAll}
          isDownloading={isDownloading}
        />
        </>
      )}
    </div>
  );
}
