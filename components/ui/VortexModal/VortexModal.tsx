// app/components/ui/VortexModal/VortexModal.tsx
'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import { useTranslations } from '@/hooks/useTranslations';
import './VortexModal.scss';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function VortexModal({ isOpen, onClose }: Props) {
  const t = useTranslations('VortexModal');
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const opener = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKeyDown = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      opener?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="vortex-title"
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm"
    >
      {/* bouton de fermeture */}
      <button
        ref={closeRef}
        className="absolute top-6 right-6 text-white hover:text-primary transition"
        onClick={onClose}
        aria-label={t('close')}
      >
        <X className="h-6 w-6" />
      </button>

      <div className="vortex-modal-wrapper">
        {/* décor vortex */}
        <div className="vortex-glow" />
        <div className="vortex-glow" />
        <div className="vortex-glow" />

        {/* contenu */}
        <div className="vortex-content">
          <h2 id="vortex-title" className="vortex-title">
            {t('part1')} {t('part2')}?
            <br />
            {t('part3')} {t('part4')}
          </h2>

          <div className="vortex-thumb-wrapper transition-transform duration-300 hover:scale-[1.02]">
            <a
              href="https://luldrako.vercel.app/"
              target="_blank"
              rel="noreferrer"
              className="vortex-thumb-inner"
            >
              <Image
                src="/versions/v1.webp"
                alt="v1"
                width={350}
                height={220}
                loading="lazy"
                decoding="async"
                className="object-cover"
              />
              <span>{t('v1')}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
