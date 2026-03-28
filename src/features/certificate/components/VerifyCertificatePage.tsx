import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "@/config/axiosConfig";

type Certificate = {
  cid: string;
  email?: string;
  name?: string;
  courseName: string;
  internshipId?: string;
  issuedAt?: string;
};

export default function VerifyCertificatePage() {
  const { cid } = useParams();
  const [data, setData] = useState<Certificate | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!cid) return;

    const fetchCertificate = async () => {
      try {
        const res = await api.get(`/certificate/verify-certificate/${cid}`);
        setData(res.data.additional);
      } catch {
        setError("Certificate not found or invalid.");
      } finally {
        setLoading(false);
      }
    };

    fetchCertificate();
  }, [cid]);

  const copyCID = () => {
    if (!data?.cid) return;
    navigator.clipboard.writeText(data.cid);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  // 🔄 LOADING
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-neutral-900 dark:to-neutral-950">
        <div className="animate-pulse bg-white dark:bg-neutral-900 p-6 sm:p-8 rounded-2xl shadow w-full max-w-md space-y-4">
          <div className="h-5 bg-gray-200 dark:bg-neutral-700 rounded w-1/2" />
          <div className="h-4 bg-gray-200 dark:bg-neutral-700 rounded w-full" />
          <div className="h-4 bg-gray-200 dark:bg-neutral-700 rounded w-3/4" />
        </div>
      </div>
    );
  }

  // ❌ ERROR
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-red-50 dark:bg-neutral-900">
        <div className="bg-white dark:bg-neutral-900 p-6 sm:p-10 rounded-2xl shadow text-center w-full max-w-md">
          <h1 className="text-xl sm:text-2xl font-bold text-red-600 mb-2">
            ❌ Verification Failed
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            {error}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10 bg-gradient-to-br from-green-50 via-white to-gray-100 dark:from-neutral-900 dark:via-neutral-950 dark:to-neutral-900">

      {/* HERO */}
      <div className="text-center mb-6 sm:mb-10">
        <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
          ✔ Verified Certificate
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mt-3">
          Certificate Authentication
        </h1>

        <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm mt-1 font-mono px-2">
          This credential has been successfully verified by SkillHigh
        </p>
      </div>

      {/* CARD */}
      <div className="bg-white dark:bg-neutral-900 rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-10 w-full max-w-md sm:max-w-xl border border-gray-100 dark:border-neutral-800">

        {/* USER */}
        <div className="text-center">
          <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm mb-1">
            Issued to
          </p>

          <h2 className="text-xl sm:text-3xl font-semibold text-gray-900 dark:text-white break-words">
            {data?.name || "N/A"}
          </h2>

          <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mt-1 font-mono break-all">
            {data?.email || "N/A"}
          </p>
        </div>

        {/* Divider */}
        <div className="my-6 sm:my-8 border-t border-gray-200 dark:border-neutral-800" />

        {/* DETAILS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 text-sm">

          <Detail label="Certificate ID">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono text-xs break-all">
                {data?.cid}
              </span>
              <button
                onClick={copyCID}
                className="text-blue-500 hover:underline text-xs"
              >
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </Detail>

          <Detail label="Course Name">
            <span className="break-words">{data?.courseName}</span>
          </Detail>

          <Detail label="Internship ID">
            {data?.internshipId}
          </Detail>

          <Detail label="Issued On">
            {data?.issuedAt
              ? new Date(data.issuedAt).toLocaleDateString()
              : "-"}
          </Detail>
        </div>

        {/* FOOTER */}
        <div className="mt-6 text-center">
          <div className="inline-block px-3 sm:px-4 py-2 rounded-lg bg-yellow-50 border border-yellow-200 text-yellow-700 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-400 text-xs font-mono">
            ⚠️ Valid only if name and email match the certificate holder
          </div>
        </div>
      </div>
    </div>
  );
}

function Detail({
  label,
  children,
}: {
  label: string;
  children?: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-gray-500 dark:text-gray-400 text-xs mb-1">
        {label}
      </p>
      <p className="font-medium text-gray-800 dark:text-gray-200 break-words">
        {children || "-"}
      </p>
    </div>
  );
}