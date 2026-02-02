'use client';

import type { ToolsProps } from '../types';
import { useToolsCarousel } from '../hooks/useToolsCarousel';
import ToolsView from './Tools.view';

export default function Tools({ courseTools }: ToolsProps) {
  const autoplay = useToolsCarousel();

  if (!courseTools || courseTools.length === 0) return null;

  return (
    <ToolsView
      courseTools={courseTools}
      autoplayPlugin={autoplay.current}
    />
  );
}
