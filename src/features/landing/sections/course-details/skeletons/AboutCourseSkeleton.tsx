'use client';

import { motion } from 'framer-motion';

export default function AboutCourseSkeleton() {
  return (
    <section
      className="relative min-h-[90vh] overflow-hidden bg-white dark:bg-neutral-950"
      aria-label="Course hero loading"
    >
      {/* Header placeholder */}
      <div className="relative z-20 mb-12 h-16" />

      {/* Background shimmer */}
      <div className="absolute inset-0 z-0 animate-pulse">
        <div className="h-full w-full bg-neutral-200 dark:bg-neutral-900" />

        {/* Overlays (same as real hero) */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/70 to-white/40 dark:from-neutral-950 dark:via-neutral-950/60 dark:to-neutral-950/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/50 to-transparent dark:from-neutral-950/95 dark:via-neutral-950/40 dark:to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8 pt-28 pb-20">
        <div className="max-w-3xl space-y-8">
          {/* Title skeleton */}
          <div className="space-y-3">
            <div className="h-10 sm:h-12 w-3/4 rounded-md bg-neutral-300 dark:bg-neutral-800 animate-pulse" />
            <div className="h-10 sm:h-12 w-1/2 rounded-md bg-neutral-300 dark:bg-neutral-800 animate-pulse" />
          </div>

          {/* Description skeleton */}
          <div className="space-y-3 max-w-2xl">
            <div className="h-4 w-full rounded bg-neutral-300 dark:bg-neutral-800 animate-pulse" />
            <div className="h-4 w-11/12 rounded bg-neutral-300 dark:bg-neutral-800 animate-pulse" />
            <div className="h-4 w-9/12 rounded bg-neutral-300 dark:bg-neutral-800 animate-pulse" />
          </div>

          {/* Stats skeleton */}
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-2"
              >
                <div className="h-4 w-4 rounded-full bg-neutral-300 dark:bg-neutral-800 animate-pulse" />
                <div className="h-4 w-20 rounded bg-neutral-300 dark:bg-neutral-800 animate-pulse" />
              </div>
            ))}
          </div>

          {/* CTA skeleton */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <div className="h-12 w-56 rounded-md bg-neutral-300 dark:bg-neutral-800 animate-pulse" />
            <div className="h-12 w-40 rounded-md bg-neutral-200 dark:bg-neutral-900 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}
