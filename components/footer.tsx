'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plane } from 'lucide-react';
import { useTranslations } from '@/hooks/useTranslations';
import VortexModal from '@/components/ui/VortexModal/VortexModal';
import DeloreanSpinner from '@/components/ui/DeloreanSpinner';
import { socialLinks, iconMap } from '@/lib/data';

export default function Footer() {
  const t = useTranslations('Footer');
  const [isVortexOpen, setIsVortexOpen] = useState(false);
  // Filtrer les liens sociaux pour exclure Exercism du footer
  const footerSocialLinks = socialLinks.filter((social) => social.name !== 'Exercism');

  return (
    <footer className="bg-secondary/50 py-12 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Link href="#hero" className="flex items-center space-x-2">
              <Plane className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold cockpit-glow">Karim Feki</span>
            </Link>
            <p className="text-muted-foreground mt-2">{t('job')}</p>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <div className="flex space-x-4 mb-4">
              {footerSocialLinks.map((social) => {
                const IconComponent = iconMap[social.icon as keyof typeof iconMap];
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <IconComponent size={20} />
                  </a>
                );
              })}
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Karim Feki. {t('rights')}
            </p>
          </div>
        </div>
      </div>

      {/* DeLorean Animation - isolée */}
      <div
        className="
    md:absolute md:bottom-7 md:right-1
    mt-6 md:mt-0
    flex justify-center md:justify-end
  "
      >
        <div onClick={() => setIsVortexOpen(true)} className="cursor-pointer">
          <DeloreanSpinner />
        </div>
      </div>

      {/* Modal */}
      <VortexModal isOpen={isVortexOpen} onClose={() => setIsVortexOpen(false)} />
    </footer>
  );
}
