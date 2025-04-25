// app/components/ui/VortexModal/VortexModal.tsx
'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import './VortexModal.scss';

const Tilt = dynamic(() => import('react-parallax-tilt'), { ssr: false });

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function VortexModal({ isOpen, onClose }: Props) {
  const t = useTranslations('VortexModal');
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm">
      {/* bouton de fermeture */}
      <button
        className="absolute top-6 right-6 text-white hover:text-primary transition"
        onClick={onClose}
        aria-label="Close modal"
      >
        <X className="h-6 w-6" />
      </button>

      <div className="vortex-modal-wrapper">
        {/* décor vortex */}
        <div className="vortex-ring" />
        <div className="vortex-glow" />
        <div className="vortex-glow" />
        <div className="vortex-glow" />
        <div className="vortex-glow" />
        <div className="vortex-glow" />

        {/* contenu */}
        <div className="vortex-content">
          <h2 className="vortex-title">
            {t('part1')} {t('part2')}?
            <br />
            {t('part3')} {t('part4')}
          </h2>

          <Tilt
            tiltMaxAngleX={15}
            tiltMaxAngleY={15}
            perspective={500}
            scale={1.02}
            transitionSpeed={1000}
            glareEnable
            glareMaxOpacity={0.3}
            className="vortex-thumb-wrapper"
          >
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
          </Tilt>
        </div>
      </div>
    </div>
  );
}
