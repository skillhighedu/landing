'use client';

import MentorsCallView from './MentorsCall.view';
import type { MentorsCallProps } from '../types';

export default function MentorsCall({ onJoin }: MentorsCallProps) {
  const handleJoin = () => {
    if (onJoin) {
      onJoin();
      return;
    }

    window.open(
      'https://forms.gle/fSaB1JkXp1TaYz1z9',
      '_blank'
    );
  };

  return <MentorsCallView onJoin={handleJoin} />;
}
