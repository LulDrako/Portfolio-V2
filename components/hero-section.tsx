'use client';

import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { /* FileText, */ Mail, Plane } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from '@/hooks/useTranslations';
import { socialLinks, iconMap } from '@/lib/data';
import HudCorners from '@/components/ui/HudCorners';

export default function HeroSection() {
  const t = useTranslations('Hero');

  const formattedSubtitle = t('subtitle') as string;
  const reduceMotion = useReducedMotion();
  const { scrollY, scrollYProgress } = useScroll();

  // innerHeight is read on each scroll tick, so a resize needs no React state.
  const y = useTransform(scrollYProgress, (p) =>
    typeof window === 'undefined' ? 70 : 70 + p * Math.max(window.innerHeight - 290, 0),
  );
  const smoothY = useSpring(y, { stiffness: 120, damping: 30 });
  const rotate = useSpring(135, { stiffness: 120, damping: 20 });

  useMotionValueEvent(scrollY, 'change', (current) => {
    const previous = scrollY.getPrevious() ?? current;
    if (current === previous) return;
    const target = current > previous ? 135 : -45;
    if (reduceMotion) rotate.jump(target);
    else rotate.set(target);
  });

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

      <div className="container mx-auto pl-4 pr-12 sm:pl-6 lg:px-8 relative z-10">
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

      <motion.div
        aria-hidden
        className="fixed top-0 right-1.5 lg:right-5 z-50"
        initial={{ opacity: 0, x: 100, scale: 0.8 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        style={{ y: reduceMotion ? y : smoothY, rotate }}
      >
        <Plane className="w-7 h-7 lg:w-[38px] lg:h-[38px] text-primary drop-shadow-lg" />
      </motion.div>
    </section>
  );
}
