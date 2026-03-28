import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Compass,
  FileQuestion,
  Home,
  Search,
  Sparkles,
} from "lucide-react";

const quickLinks = [
  {
    title: "Go Home",
    description: "Return to the landing page and start fresh.",
    href: "/",
    icon: Home,
  },
  {
    title: "Browse Courses",
    description: "Jump into the full course catalog.",
    href: "/all-courses",
    icon: Compass,
  },
  {
    title: "Contact Us",
    description: "Ask the team if you were trying to reach something specific.",
    href: "/contact-us",
    icon: Search,
  },
];

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-white px-4 py-24 dark:bg-neutral-950 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[8%] top-20 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-16 right-[10%] h-56 w-56 rounded-full bg-emerald-300/10 blur-3xl" />
        <motion.div
          className="absolute right-[12%] top-24 text-primary/20"
          animate={{ rotate: [0, 10, -8, 0], y: [0, -10, 8, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        >
          <Sparkles size={68} />
        </motion.div>
        <motion.div
          className="absolute bottom-20 left-[10%] text-neutral-300/60 dark:text-neutral-700"
          animate={{ rotate: [0, -12, 8, 0], y: [0, 8, -8, 0] }}
          transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
        >
          <FileQuestion size={72} />
        </motion.div>
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs  uppercase tracking-[0.22em] text-primary">
              <FileQuestion size={14} />
              Lost In The SkillHigh Universe
            </div>

            <div className="space-y-5">
              <p className="font-mono text-5xl sm:text-[5.5rem]  leading-none text-neutral-900 dark:text-white sm:text-[7rem]">
                404
              </p>
              <h1 className="max-w-2xl text-xl smtext-4xl  leading-tight text-neutral-900 dark:text-white sm:text-5xl">
                This page ghosted the roadmap.
              </h1>
              <p className="max-w-xl text-base leading-7 text-neutral-600 font-mono dark:text-neutral-400">
                The link may be outdated, the route may have moved, or we may have sent you into an uncharted corner of the app. Let&apos;s get you back to something real.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm  text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-primary/90"
              >
                <Home size={18} />
                Back To Home
              </Link>
              <button
                type="button"
                onClick={() => window.history.back()}
                className="inline-flex items-center gap-2 rounded-2xl border border-neutral-300 bg-white px-5 py-3 text-sm  text-neutral-900 transition hover:-translate-y-0.5 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800"
              >
                <ArrowLeft size={18} />
                Go Back
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="rounded-[32px] border border-neutral-200 bg-neutral-50 p-6 shadow-xl dark:border-neutral-800 dark:bg-neutral-900 sm:p-8"
          >
            <div className="mb-6">
              <p className="text-xs  uppercase tracking-[0.22em] text-primary">
                Quick Escape Routes
              </p>
              <h2 className="mt-3 text-2xl  text-neutral-900 dark:text-white">
                Try one of these instead
              </h2>
            </div>

            <div className="space-y-4">
              {quickLinks.map(({ title, description, href, icon: Icon }) => (
                <Link
                  key={title}
                  to={href}
                  className="group flex items-start gap-4 rounded-[24px] border border-neutral-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-950"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon size={18} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-base  text-neutral-900 transition group-hover:text-primary dark:text-white">
                      {title}
                    </p>
                    <p className="mt-1 text-sm leading-6 font-mono text-neutral-600 dark:text-neutral-400">
                      {description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
