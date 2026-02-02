import { useState } from 'react';

export function useCertificates() {
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

  const markLoaded = (id: string) => {
    setLoadedImages(prev => ({ ...prev, [id]: true }));
  };

  return { loadedImages, markLoaded };
}
