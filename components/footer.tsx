'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Plane } from 'lucide-react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { useTranslations } from 'next-intl';
import VortexModal from '@/components/ui/VortexModal/VortexModal';
import DeloreanSpinner from '@/components/ui/DeloreanSpinner';

export default function Footer() {
  const t = useTranslations('Footer');
  const [isVortexOpen, setIsVortexOpen] = useState(false);

  return (
    <footer className="bg-secondary/50 py-12 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center relative z-10">
          <div className="mb-6 md:mb-0">
            <Link href="#hero" className="flex items-center space-x-2">
              <Plane className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold cockpit-glow">Karim Feki</span>
            </Link>
            <p className="text-muted-foreground mt-2">{t('job')}</p>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <div className="flex space-x-4 mb-4">
              <a
                href="https://github.com/LulDrako"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <FaGithub size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/karim-feki-18ab66249/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <FaLinkedin size={20} />
              </a>
              <a
                href="mailto:karimfeki2004@gmail.com"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <FaEnvelope size={20} />
              </a>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Karim Feki. {t('rights')}
            </p>
          </div>
        </div>

        {/* ✅ DeLorean Spinner clean */}
        <motion.div
          className="absolute bottom-6 right-4 z-10 cursor-pointer select-none"
          onClick={() => setIsVortexOpen(true)}
          whileHover={{ y: -10, scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 100 }}
        >
          <DeloreanSpinner />
        </motion.div>

        {/* Vortex Modal */}
        <VortexModal isOpen={isVortexOpen} onClose={() => setIsVortexOpen(false)} />
      </div>
    </footer>
  );
}
