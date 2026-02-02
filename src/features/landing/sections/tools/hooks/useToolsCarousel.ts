import { useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';

export function useToolsCarousel() {
  const autoplay = useRef(
    Autoplay({
      delay: 1000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    })
  );

  return autoplay;
}
