import Header from '@/components/common/Header';
import { DotPatternLinearGradient } from '@/components/ui/DotBg';
import { motion } from 'framer-motion';

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
  return (
    <Container size="full">

      <section className="relative w-full bg-neutral-900 text-white py-24 px-6 md:px-12">
      <DotPatternLinearGradient />

      {/* Header */}
      <div className="relative z-10 text-center mb-16">
        <Header
          title="Certificates"
          subline="Verified proof of hands-on learning and real outcomes."
        />
      </div>

      {/* Grid */}
      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10">
        {certificates.map((cert, idx) => (
          <motion.article
            key={cert.id}
            {...certificateCardAnimation}
            transition={{ duration: 0.45, delay: idx * 0.08 }}
            className="
              group rounded-2xl
              bg-white/5 backdrop-blur
              shadow-sm hover:shadow-xl
              transition-all duration-300
              hover:-translate-y-1
            "
          >
            {/* Image container – BIGGER */}
            <div className="relative rounded-2xl overflow-hidden bg-neutral-800">
              {!loadedImages[cert.id] && (
                <div className="absolute inset-0 bg-neutral-800 animate-pulse" />
              )}

              <img
                src={cert.logo}
                alt={cert.alt}
                loading="lazy"
                onLoad={() => onImageLoad(cert.id)}
                className={`
                  w-full
                  h-64 sm:h-72 lg:h-80
                  object-contain
                  px-4 py-6
                  transition-opacity duration-300
                  ${loadedImages[cert.id] ? 'opacity-100' : 'opacity-0'}
                `}
              />
            </div>

            {/* Label (kept minimal) */}
            <div className="px-4 py-4 text-center">
              <h3 className="text-sm font-medium text-neutral-100">
                {cert.name}
              </h3>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
    </Container>
  );
}
