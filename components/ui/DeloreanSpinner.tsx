'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const frames = Array.from(
  { length: 16 },
  (_, i) => `/delorean/delorean-${String(i + 1).padStart(2, '0')}.webp`,
);

export default function DeloreanSpinner() {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((prev) => (prev + 1) % frames.length);
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="w-20 md:w-24 lg:w-28 pointer-events-auto z-50"
      whileHover={{ y: -10, scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
      style={{ cursor: 'pointer' }} // <-- Ajout du style pour changer le curseur
    >
      <div className="relative aspect-square w-full">
        {/* Toutes les images restent montées : elles se chargent à l'approche du footer, sans saccade */}
        {frames.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt={i === frame ? 'DeLorean rotating' : ''}
            width={128}
            height={128}
            className={cn(
              'absolute inset-0 h-full w-full object-contain',
              i !== frame && 'opacity-0',
            )}
            draggable={false}
            quality={85}
          />
        ))}
      </div>
    </motion.div>
  );
}
