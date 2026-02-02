'use client';

import type { CertificatesProps } from '../types';
import { useCertificates } from '../hooks/useCertificates';
import CertificatesView from './Certificates.view';

export default function Certificates({ certificates }: CertificatesProps) {
  const { loadedImages, markLoaded } = useCertificates();

  return (
    <CertificatesView
      certificates={certificates}
      loadedImages={loadedImages}
      onImageLoad={markLoaded}
    />
  );
}
