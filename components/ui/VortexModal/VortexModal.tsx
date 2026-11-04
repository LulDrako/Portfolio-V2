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
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const opener = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') return onClose();
      if (e.key !== 'Tab' || !dialogRef.current) return;
      // Keep keyboard focus inside the dialog: wrap from the last element to the first and back.
      const items = dialogRef.current.querySelectorAll<HTMLElement>('button, a[href]');
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      opener?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={dialogRef}
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
