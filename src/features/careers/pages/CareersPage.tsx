import { useEffect, useMemo, useState } from "react";
import { ArrowRight, BriefcaseBusiness, MapPin, Search, Sparkles, X } from "lucide-react";

import HeaderSection from "@/components/common/HeaderSection";
import { SEO } from "@/components/common/SEO";
import Container from "@/layouts/Container";
import { cn } from "@/lib/utils";
import { useCareers } from "../hooks/useCareers";
import type { CareerJob } from "../types";

function previewText(text: string) {
  return text.replace(/\s+/g, " ").trim();
}

function formatList(items: string[]) {
  if (items.length > 0) return items;
  return ["More details will be shared during the application process."];
}

function JobCard({
  job,
  onViewDetails,
}: {
  job: CareerJob;
  onViewDetails: (job: CareerJob) => void;
}) {
  return (
    <article className="flex h-full flex-col rounded-[1.75rem] border border-neutral-200 bg-white p-6 shadow-[0_18px_60px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:border-primary/30 dark:border-neutral-800 dark:bg-neutral-900">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.16em] text-primary">
          {job.type}
        </span>
        <span className="rounded-full border border-neutral-200 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-neutral-500 dark:border-neutral-700 dark:text-neutral-300">
          {job.experience}
        </span>
      </div>

      <h3 className="mt-5 font-mono text-2xl leading-tight text-neutral-950 dark:text-white">{job.roleName}</h3>

      <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-neutral-600 dark:text-neutral-300">
        <span className="inline-flex items-center gap-2">
          <MapPin className="h-4 w-4 text-primary" />
          {job.location}
        </span>
        <span className="inline-flex items-center gap-2">
          <BriefcaseBusiness className="h-4 w-4 text-primary" />
          {job.type}
        </span>
      </div>

      <p className="mt-5 line-clamp-4 flex-1 font-sans text-sm leading-7 text-neutral-600 dark:text-neutral-300">
        {previewText(job.jobDescription)}
      </p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={() => onViewDetails(job)}
          className="inline-flex items-center justify-center rounded-xl border border-neutral-300 px-4 py-3 font-mono text-sm text-neutral-900 transition hover:border-primary hover:text-primary dark:border-neutral-700 dark:text-white"
        >
          View Details
        </button>
        <a
          href={job.applicationLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 font-mono text-sm text-white transition hover:opacity-90"
        >
          Apply Now
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </article>
  );
}

function JobDetailModal({
  job,
  onClose,
}: {
  job: CareerJob;
  onClose: () => void;
}) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[10001] flex items-end bg-black/60 p-0 backdrop-blur-sm sm:items-center sm:justify-center sm:p-6">
      <button type="button" aria-label="Close" onClick={onClose} className="absolute inset-0" />

      <div className="relative z-10 flex max-h-[92dvh] w-full max-w-4xl flex-col overflow-hidden rounded-t-[2rem] border border-neutral-200 bg-white shadow-2xl dark:border-neutral-800 dark:bg-neutral-900 sm:rounded-[2rem]">
        <div className="border-b border-neutral-200 px-5 py-5 dark:border-neutral-900 sm:px-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.16em] text-primary">
                  {job.type}
                </span>
                <span className="rounded-full border border-neutral-200 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-neutral-500 dark:border-neutral-700 dark:text-neutral-300">
                  {job.experience}
                </span>
              </div>

              <h2 className="mt-4 font-mono text-3xl leading-tight text-neutral-950 dark:text-white">{job.roleName}</h2>

              <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-neutral-600 dark:text-neutral-300">
                <span className="inline-flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  {job.location}
                </span>
                <span className="inline-flex items-center gap-2">
                  <BriefcaseBusiness className="h-4 w-4 text-primary" />
                  {job.type}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 text-neutral-600 transition hover:border-primary hover:text-primary dark:border-neutral-700 dark:text-neutral-300"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-8">
          <section>
            <h3 className="font-mono text-lg text-neutral-950 dark:text-white">Job Description</h3>
            <p className="mt-3 whitespace-pre-line font-sans text-sm leading-7 text-neutral-600 dark:text-neutral-300">
              {job.jobDescription}
            </p>
          </section>

          <section className="mt-8">
            <h3 className="font-mono text-lg text-neutral-950 dark:text-white">Responsibilities</h3>
            <ul className="mt-3 space-y-3 text-sm leading-7 text-neutral-600 dark:text-neutral-300">
              {formatList(job.responsibilities).map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-8">
            <h3 className="font-mono text-lg text-neutral-950 dark:text-white">Requirements</h3>
            <ul className="mt-3 space-y-3 text-sm leading-7 text-neutral-600 dark:text-neutral-300">
              {formatList(job.requirements).map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="sticky bottom-0 border-t border-neutral-200 bg-white px-5 py-4 dark:border-neutral-800 dark:bg-neutral-900 sm:px-8">
          <a
            href={job.applicationLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 font-mono text-sm text-white transition hover:opacity-90 sm:w-auto"
          >
            Apply Now
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default function CareersPage() {
  const [query, setQuery] = useState("");
  const [activeLocation, setActiveLocation] = useState<string | null>(null);
  const [activeType, setActiveType] = useState<string | null>(null);
  const [selectedJob, setSelectedJob] = useState<CareerJob | null>(null);
  const { data: jobs = [], isLoading, isError, refetch } = useCareers();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  const locations = useMemo(
    () => Array.from(new Set(jobs.map((job) => job.location).filter(Boolean))).sort(),
    [jobs],
  );
  const jobTypes = useMemo(
    () => Array.from(new Set(jobs.map((job) => job.type).filter(Boolean))).sort(),
    [jobs],
  );

  const filteredJobs = useMemo(() => {
    const text = query.trim().toLowerCase();

    return jobs.filter((job) => {
      const matchesQuery = text
        ? `${job.roleName} ${job.location} ${job.type}`.toLowerCase().includes(text)
        : true;
      const matchesLocation = activeLocation ? job.location === activeLocation : true;
      const matchesType = activeType ? job.type === activeType : true;

      return matchesQuery && matchesLocation && matchesType;
    });
  }, [activeLocation, activeType, jobs, query]);

  return (
    <Container size="full">
      <SEO
        title="Careers | SkillHigh"
        description="Explore open roles at SkillHigh and apply to current opportunities."
        url="/careers"
      />

      <section className="min-h-screen ] py-20 text-neutral-950 dark:bg-neutral-900 dark:text-white">
        <HeaderSection />

        <div className="mx-auto mt-10 max-w-7xl">
          <div className="rounded-[2rem] border border-neutral-200 bg-white/80 p-6 shadow-[0_30px_120px_rgba(15,23,42,0.08)] backdrop-blur dark:border-neutral-800 dark:bg-neutral-900/80 sm:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary">Careers At SkillHigh</p>
                <h1 className="mt-4 font-mono text-4xl leading-tight sm:text-5xl lg:text-6xl">
                  Join us in building sharper careers for ambitious learners.
                </h1>
                <p className="mt-5 max-w-2xl font-sans text-base leading-8 text-neutral-600 dark:text-neutral-300">
                  Explore open roles, understand what we are hiring for, and apply directly through the official link
                  provided for each opportunity.
                </p>
              </div>

              <div className="grid gap-4 rounded-[1.5rem] border border-neutral-200 bg-neutral-50 p-5 dark:border-neutral-800 dark:bg-neutral-950/70">
                <div className="flex items-center gap-3">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <p className="font-mono text-sm text-neutral-900 dark:text-white">Simple, transparent openings</p>
                </div>
                <p className="font-sans text-sm leading-7 text-neutral-600 dark:text-neutral-300">
                  Clear role details, direct application links, and a public careers page designed to be easy to scan on
                  both desktop and mobile.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-[1.75rem] border border-neutral-200 bg-white p-5 shadow-[0_18px_80px_rgba(15,23,42,0.06)] dark:border-neutral-800 dark:bg-neutral-900 sm:p-6">
            <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto_auto]">
              <label className="relative block">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search by role, location, or type"
                  className="h-12 w-full rounded-xl border border-neutral-200 bg-white pl-11 pr-4 font-sans text-sm text-neutral-900 outline-none transition focus:border-primary dark:border-neutral-700 dark:bg-neutral-950 dark:text-white"
                />
              </label>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setActiveLocation(null)}
                  className={cn(
                    "rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-[0.14em] transition",
                    activeLocation === null
                      ? "border-primary bg-primary text-white"
                      : "border-neutral-200 text-neutral-600 hover:border-primary hover:text-primary dark:border-neutral-700 dark:text-neutral-300",
                  )}
                >
                  All Locations
                </button>
                {locations.map((location) => (
                  <button
                    key={location}
                    type="button"
                    onClick={() => setActiveLocation((prev) => (prev === location ? null : location))}
                    className={cn(
                      "rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-[0.14em] transition",
                      activeLocation === location
                        ? "border-primary bg-primary text-white"
                        : "border-neutral-200 text-neutral-600 hover:border-primary hover:text-primary dark:border-neutral-700 dark:text-neutral-300",
                    )}
                  >
                    {location}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setActiveType(null)}
                  className={cn(
                    "rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-[0.14em] transition",
                    activeType === null
                      ? "border-primary bg-primary text-white"
                      : "border-neutral-200 text-neutral-600 hover:border-primary hover:text-primary dark:border-neutral-700 dark:text-neutral-300",
                  )}
                >
                  All Types
                </button>
                {jobTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setActiveType((prev) => (prev === type ? null : type))}
                    className={cn(
                      "rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-[0.14em] transition",
                      activeType === type
                        ? "border-primary bg-primary text-white"
                        : "border-neutral-200 text-neutral-600 hover:border-primary hover:text-primary dark:border-neutral-700 dark:text-neutral-300",
                    )}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="min-h-[320px] animate-pulse rounded-[1.75rem] border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900"
                />
              ))}
            </div>
          ) : isError ? (
            <div className="mt-8 rounded-[1.75rem] border border-neutral-200 bg-white px-6 py-14 text-center dark:border-neutral-800 dark:bg-neutral-900">
              <p className="font-mono text-2xl text-neutral-950 dark:text-white">Unable to load openings</p>
              <p className="mt-3 font-sans text-sm text-neutral-600 dark:text-neutral-300">
                Something went wrong while fetching careers. Please try again.
              </p>
              <button
                type="button"
                onClick={() => refetch()}
                className="mt-6 inline-flex rounded-xl bg-primary px-5 py-3 font-mono text-sm text-white transition hover:opacity-90"
              >
                Retry
              </button>
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="mt-8 rounded-[1.75rem] border border-dashed border-neutral-300 bg-white px-6 py-14 text-center dark:border-neutral-700 dark:bg-neutral-900">
              <p className="font-mono text-2xl text-neutral-950 dark:text-white">No openings right now, please check back soon.</p>
              <p className="mt-3 font-sans text-sm text-neutral-600 dark:text-neutral-300">
                We are not hiring for any public roles at the moment, but new opportunities may open soon.
              </p>
            </div>
          ) : (
            <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredJobs.map((job) => (
                <JobCard key={job.id} job={job} onViewDetails={setSelectedJob} />
              ))}
            </div>
          )}
        </div>
      </section>

      {selectedJob && <JobDetailModal job={selectedJob} onClose={() => setSelectedJob(null)} />}
    </Container>
  );
}
