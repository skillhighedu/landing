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
import BackButton from "@/components/common/BackButton";
import { Input } from "@/components/ui/input";
import HeaderSection from "@/components/common/HeaderSection";
import Container from "@/layouts/Container";

export default function SearchByCertificate() {
  const [inputCid, setInputCid] = useState("");
  const [submittedCid, setSubmittedCid] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data, isLoading, isError } = useVerifyCertificate(submittedCid);

  const handleSearch = () => {
    if (!inputCid.trim() || isSubmitting || isLoading) return;

    setIsSubmitting(true);
    window.setTimeout(() => setIsSubmitting(false), 500);
    setSubmittedCid(inputCid.trim());
  };

  return (
   <Container size="xl">

     <div className="min-h-screen bg-white px-4 pb-12 pt-24 transition-colors duration-300 dark:bg-neutral-900 sm:px-6 sm:pb-16 sm:pt-28">
     <HeaderSection/>
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
        

        <div className="flex flex-col items-center text-center">
          <h1 className="max-w-3xl text-3xl font-black tracking-normal text-zinc-950 dark:text-zinc-50 sm:text-4xl">
            Verify a SkillHigh certificate
          </h1>

          <p className="mt-4 max-w-2xl font-mono text-sm leading-7 text-zinc-600 dark:text-zinc-400 sm:text-base">
            Enter the certificate ID to check whether the record is valid.
          </p>
        </div>

        <div className="rounded-[24px] border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:p-6">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300">
              <Search className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                Certificate ID
              </h2>
              <p className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
                Paste the ID exactly as shown on the certificate
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Input
              value={inputCid}
              onChange={(e) => setInputCid(e.target.value.toUpperCase())}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Enter"
              className="h-30 flex-1 rounded-2xl border-zinc-200 px-4 font-mono text-sm placeholder:text-zinc-400 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-600 sm:h-12"
            />

            <button
              onClick={handleSearch}
              disabled={isLoading || isSubmitting || !inputCid.trim()}
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 text-sm font-semibold text-white transition hover:bg-primary-500 disabled:cursor-not-allowed disabled:opacity-50 sm:h-12 sm:w-auto"
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

          {isError && (
            <div className="mt-4 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 dark:border-red-500/20 dark:bg-red-500/10">
              <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
              <p className="text-sm text-red-700 dark:text-red-300">
                No certificate found for <span className="font-mono font-semibold">{submittedCid}</span>.
              </p>
            </div>
          )}

          {data && (
            <div className="mt-4 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 dark:border-emerald-500/20 dark:bg-emerald-500/10">
              <FileCheck2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-300" />
              <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                Certificate verified successfully.
              </p>
            </div>
          )}
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
   </Container>
  );
}
