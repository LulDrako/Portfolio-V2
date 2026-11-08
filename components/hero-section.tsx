'use client';

import { motion } from 'framer-motion';
import { /* FileText, */ Mail } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from '@/hooks/useTranslations';
import { socialLinks, iconMap } from '@/lib/data';
import HudCorners from '@/components/ui/HudCorners';

export default function HeroSection() {
  const t = useTranslations('Hero');

  const formattedSubtitle = t('subtitle') as string;

  return (
    <section id="hero" className="relative min-h-screen flex items-center">
      {/* HUD Lines */}
      <div className="absolute inset-0 pointer-events-none hud-grid" />
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <HudCorners className="top-16 opacity-60" />
        <div className="absolute left-[80%] top-[20%] w-8 h-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/40">
          <div className="absolute left-1/2 -top-2 -bottom-2 w-px bg-primary/40" />
          <div className="absolute top-1/2 -left-2 -right-2 h-px bg-primary/40" />
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-primary mb-4"
          >
            {t('intro')}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 cockpit-glow"
          >
            {t('title')}
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-6 text-muted-foreground"
            dangerouslySetInnerHTML={{
              __html: formattedSubtitle
                .replace('<accent>', '<span class="text-accent accent-glow">')
                .replace('</accent>', '</span>'),
            }}
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-lg text-muted-foreground mb-8"
          >
            {t('description')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-wrap gap-4 mb-8"
          >
            <Link href="#contact" className="button button-primary">
              <Mail size={18} />
              {t('contact')}
            </Link>

            {/* <Link href="/cv.pdf" target="_blank" className="button button-secondary">
              <FileText size={18} />
              {t('cv')}
            </Link> */}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex gap-6"
          >
            {socialLinks.map((social) => {
              const IconComponent = iconMap[social.icon as keyof typeof iconMap];
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <IconComponent size={24} />
                </a>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
