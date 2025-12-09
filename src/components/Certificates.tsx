import Header from "./common/Header";

import { DotPatternLinearGradient } from "./ui/DotBg";
import { motion } from "framer-motion";
import { useState } from "react";

export interface CertificateProps {
  id: string;
  name: string;
  logo: string;
  alt: string;
}

interface CertificatesProps {
  certificates: CertificateProps[];
}

export default function Certificates({ certificates }: CertificatesProps) {
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

  return (
    <section className="relative w-full bg-neutral-900 text-white py-24 px-6 md:px-12">
      <DotPatternLinearGradient />

      {/* Section Header */}
      <div className="relative z-10 text-center space-y-2 mb-12">
        <Header title="Certificates" subline=" Proof of excellence in various domains." />
       
         
    
      </div>

      {/* Certificates Grid */}
      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
        {certificates.map((cert, idx) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="group overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/80 shadow-sm"
          >
            {/* Image container with variable height */}
            <div className="w-full relative">
              {!loadedImages[cert.id] && (
                <div className="absolute inset-0 bg-neutral-800 animate-pulse" />
              )}
              <img
                src={cert.logo}
                alt={cert.alt}
                className={`w-full object-cover transition-transform duration-300 group-hover:scale-105 ${
                  loadedImages[cert.id] ? "opacity-100" : "opacity-0"
                }`}
                onLoad={() =>
                  setLoadedImages((prev) => ({ ...prev, [cert.id]: true }))
                }
                loading="lazy"
              />
            </div>

            <div className="p-2 text-center">
              <h3 className="text-md font-medium">{cert.name}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
