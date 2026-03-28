import { useState } from "react";
import {
  BadgeCheck,
  FileCheck2,
  Loader2,
  Search,
  ShieldCheck,
  TriangleAlert,
} from "lucide-react";
import CertficateGenerator from "./CertificateGenerator";
import { useVerifyCertificate } from "../hooks/useVerifyCertificate";

export default function SearchByCertificate() {
  const [inputCid, setInputCid] = useState("");
  const [submittedCid, setSubmittedCid] = useState("");

  const { data, isLoading, isError } = useVerifyCertificate(submittedCid);

  const handleSearch = () => {
    if (!inputCid.trim()) return;
    setSubmittedCid(inputCid.trim());
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.08),transparent_25%),linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] px-4 py-16 transition-colors duration-300 dark:bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.12),transparent_25%),linear-gradient(180deg,#09090b_0%,#0f172a_100%)] sm:px-6 sm:py-20">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <div className="flex flex-col items-center text-center">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-[11px] font-mono uppercase tracking-[0.28em] text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300">
            <ShieldCheck className="h-3.5 w-3.5" />
            Certificate Verification
          </span>

          <h1 className="max-w-3xl text-3xl font-black tracking-normal text-zinc-950 dark:text-zinc-50 sm:text-4xl">
            Check whether a SkillHigh certificate is real.
          </h1>

          <p className="mt-4 max-w-2xl font-mono text-sm leading-7 text-zinc-600 dark:text-zinc-400 sm:text-base">
            Enter the certificate ID to verify authenticity, confirm learner details, and unlock downloadable copies if the record is valid.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[30px] border border-zinc-200 bg-white/90 p-6 shadow-[0_24px_60px_rgba(15,23,42,0.08)] backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/80 sm:p-8">
            <div className="mb-6 flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-emerald-200 bg-emerald-50 text-emerald-600 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300">
                <Search className="h-5 w-5" />
              </div>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary">
                  Search Certificate
                </p>
                <h2 className="mt-1 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                  Verify by certificate ID
                </h2>
                <p className="mt-2 font-mono text-sm leading-6 text-zinc-500 dark:text-zinc-400">
                  The ID is usually printed on the certificate itself. Paste it exactly to avoid a mismatch.
                </p>
              </div>
            </div>

            <div className="rounded-[24px] border border-zinc-200 bg-zinc-50/80 p-3 dark:border-zinc-800 dark:bg-zinc-950/70">
              <label className="mb-3 block px-1 text-[11px] font-mono uppercase tracking-[0.24em] text-zinc-500 dark:text-zinc-400">
                Certificate ID
              </label>

              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  value={inputCid}
                  onChange={(e) => setInputCid(e.target.value.toUpperCase())}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  placeholder="e.g. SH-I-ABC12345"
                  className="h-12 flex-1 rounded-2xl border border-zinc-200 bg-white px-4 text-sm font-mono text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-600"
                />

                <button
                  onClick={handleSearch}
                  disabled={isLoading || !inputCid.trim()}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-primary px-5 text-sm font-semibold text-white transition hover:bg-primary-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Verifying
                    </>
                  ) : (
                    <>
                      <BadgeCheck className="h-4 w-4" />
                      Verify
                    </>
                  )}
                </button>
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-2 px-1 font-mono text-xs text-zinc-500 dark:text-zinc-400">
                <span className="rounded-full border border-zinc-200 bg-white px-2.5 py-1 dark:border-zinc-700 dark:bg-zinc-900">
                  exact match
                </span>
                <span className="rounded-full border border-zinc-200 bg-white px-2.5 py-1 dark:border-zinc-700 dark:bg-zinc-900">
                  case-safe input
                </span>
                <span className="rounded-full border border-zinc-200 bg-white px-2.5 py-1 dark:border-zinc-700 dark:bg-zinc-900">
                  instant verification
                </span>
              </div>
            </div>

            {isError && (
              <div className="mt-4 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 dark:border-red-500/20 dark:bg-red-500/10">
                <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                <p className="text-sm text-red-700 dark:text-red-300">
                  No certificate found for <span className="font-mono font-semibold">{submittedCid}</span>. Double-check the ID and try again.
                </p>
              </div>
            )}

            {data && (
              <div className="mt-4 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 dark:border-emerald-500/20 dark:bg-emerald-500/10">
                <FileCheck2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-300" />
                <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                  Certificate verified successfully. Your downloadable copies are ready below.
                </p>
              </div>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            <div className="rounded-[28px] border border-zinc-200 bg-white/80 p-5 dark:border-zinc-800 dark:bg-zinc-900/70">
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-primary">
                Step 1
              </p>
              <h3 className="mt-2 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                Find the ID
              </h3>
              <p className="mt-2 font-mono text-sm leading-6 text-zinc-500 dark:text-zinc-400">
                Use the printed certificate ID shown on the document.
              </p>
            </div>

            <div className="rounded-[28px] border border-zinc-200 bg-white/80 p-5 dark:border-zinc-800 dark:bg-zinc-900/70">
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-primary">
                Step 2
              </p>
              <h3 className="mt-2 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                Verify instantly
              </h3>
              <p className="mt-2 font-mono text-sm leading-6 text-zinc-500 dark:text-zinc-400">
                We match the certificate record and confirm whether it is authentic.
              </p>
            </div>

            <div className="rounded-[28px] border border-zinc-200 bg-white/80 p-5 dark:border-zinc-800 dark:bg-zinc-900/70">
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-primary">
                Step 3
              </p>
              <h3 className="mt-2 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                Download copies
              </h3>
              <p className="mt-2 font-mono text-sm leading-6 text-zinc-500 dark:text-zinc-400">
                Once valid, you can preview and download the available certificate files.
              </p>
            </div>
          </div>
        </div>

        {data && (
          <div className="w-full">
            <div className="mb-8 flex items-center gap-4">
              <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
              <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-zinc-500 dark:text-zinc-400">
                Verified Certificates
              </span>
              <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
            </div>
            <CertficateGenerator skipNameConfirmation />
          </div>
        )}
      </div>
    </div>
  );
}
