import Header from '@/components/common/Header';
import { DotPatternLinearGradient } from '@/components/ui/DotBg';
import { motion } from 'framer-motion';
import { BadgeCheck, FileCheck2, Sparkles } from 'lucide-react';

import type { Certificate } from '../types';
import { certificateCardAnimation } from '../animations';
import Container from '@/layouts/Container';

interface Props {
  certificates: Certificate[];
  loadedImages: Record<string, boolean>;
  onImageLoad: (id: string) => void;
}

export default function CertificatesView({
  certificates,
  loadedImages,
  onImageLoad,
}: Props) {
  const highlights = [
    'Completion proof you can showcase',
    'Training and internship recognition',
    'Better credibility for resumes and portfolios',
  ];

  return (
    <Container size="full">
      <section className="relative w-full bg-white px-6 py-24 text-neutral-900 dark:bg-neutral-900 dark:text-white md:px-12">
        <DotPatternLinearGradient />

        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-14 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-4 py-2 text-sm font-medium text-primary">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Certification path
            </div>

            <Header
              title="Certificates That Feel Worth Showing"
              subline="Earn completion, training, internship, and industry-aligned certificates that make your work easier to present to recruiters and hiring teams."
            />

            <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-3">
              {highlights.map((item) => (
                <div
                  key={item}
                  className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm text-neutral-700 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-neutral-200"
                >
                  <BadgeCheck className="h-4 w-4 text-primary" aria-hidden="true" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {certificates.map((cert, idx) => (
              <motion.article
                key={cert.id}
                {...certificateCardAnimation}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className="group overflow-hidden rounded-3xl border border-neutral-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-white/5"
              >
                <div className="border-b border-neutral-100 bg-gradient-to-br from-neutral-50 to-white px-5 py-4 dark:border-white/10 dark:from-neutral-900 dark:to-neutral-800">
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-primary">
                    <FileCheck2 className="h-3.5 w-3.5" aria-hidden="true" />
                    {cert.label ?? 'Certificate'}
                  </div>

                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                    {cert.name}
                  </h3>

                  <p className="mt-2 text-sm font-mono leading-relaxed text-neutral-600 dark:text-neutral-300">
                    {cert.description ??
                      'A professional certificate that validates your learning with clearer proof of progress and practical work.'}
                  </p>
                </div>

                <div className="relative bg-white dark:bg-neutral-800">
                  {!loadedImages[cert.id] && (
                    <div className="absolute inset-0 animate-pulse bg-neutral-100 dark:bg-neutral-800" />
                  )}

                  <img
                    src={cert.logo}
                    alt={cert.alt}
                    loading="lazy"
                    onLoad={() => onImageLoad(cert.id)}
                    className={`h-64 w-full object-contain px-4 py-6 transition-opacity duration-300 sm:h-72 lg:h-80 ${
                      loadedImages[cert.id] ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </Container>
  );
}
