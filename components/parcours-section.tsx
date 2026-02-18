'use client';

import { useRef, memo } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import { MapPin, ExternalLink } from 'lucide-react';
import { iconMap } from '@/lib/data';
import { useTranslations } from '@/hooks/useTranslations';
import { parseDate } from '@/lib/utils';
import { companyLinks } from '@/lib/data';

type CompanyKey = keyof typeof companyLinks;

type Parcours = {
  title: string;
  company: CompanyKey;
  companyUrl?: string;
  location: string;
  date: string;
  description: string;
  icon: keyof typeof iconMap;
};

const RUNNER_EASE = 1.55;
const RUNNER_FADE_EDGE = 0.18;

const cardVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.96, filter: 'blur(4px)' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { type: 'spring', stiffness: 80, damping: 18, mass: 0.8, delay: i * 0.12 },
  }),
};

function getSegmentProgress(v: number, n: number, index: number) {
  if (n === 0) return { isActive: false, progress: 0 };
  const i = Math.min(Math.floor(v * n), n - 1);
  const rawProg = Math.min(v * n - i, 1);
  const progress = Math.pow(rawProg, RUNNER_EASE);
  return { isActive: i === index, progress };
}

const ParcoursItem = memo(function ParcoursItem({
  exp,
  index,
  segmentCount,
  scrollYProgress,
}: {
  exp: Parcours;
  index: number;
  segmentCount: number;
  scrollYProgress: MotionValue<number>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.35 });
  const IconComponent = iconMap[exp.icon];
  const cardRight = index % 2 === 0;

  const runnerTop = useTransform(scrollYProgress, (v) => {
    const { isActive, progress } = getSegmentProgress(v, segmentCount, index);
    return isActive ? `${progress * 100}%` : '0%';
  });

  const runnerOpacity = useTransform(scrollYProgress, (v) => {
    const { isActive, progress } = getSegmentProgress(v, segmentCount, index);
    if (!isActive) return 0;
    const fadeIn = Math.min(1, progress / RUNNER_FADE_EDGE);
    const fadeOut = Math.min(1, (1 - progress) / RUNNER_FADE_EDGE);
    return fadeIn * fadeOut;
  });

  return (
    <motion.article
      ref={ref}
      className={`relative flex flex-col md:flex-row w-full mb-8 sm:mb-12 md:mb-20 gap-3 sm:gap-4 md:gap-8 md:items-stretch flex-nowrap ${
        cardRight ? 'md:flex-row' : 'md:flex-row-reverse'
      }`}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      custom={index}
    >
      {/* Colonne date + lieu (desktop uniquement) */}
      <div
        className={`hidden md:flex order-2 md:order-1 shrink-0 items-center gap-3 pt-6 md:pt-8 ${
          cardRight ? 'flex-row' : 'flex-row-reverse'
        }`}
      >
        <div className="relative w-11 h-11 shrink-0 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-primary/15 border border-primary/40 flex items-center justify-center shadow-[0_0_14px_rgba(59,130,246,0.4)]">
            <IconComponent className="w-5 h-5 text-primary" />
          </div>
          <div className="absolute inset-0 rounded-full border border-primary/30 parcours-node-pulse" />
        </div>
        <div className="flex flex-col justify-center min-w-0 h-11">
          <span className="text-[11px] md:text-xs uppercase tracking-widest text-muted-foreground/90 font-medium whitespace-nowrap leading-tight">
            {exp.date}
          </span>
          <span className="text-xs text-muted-foreground/80 flex items-center gap-1.5 mt-1 leading-tight">
            <MapPin className="h-3 w-3 shrink-0" aria-hidden />
            {exp.location}
          </span>
        </div>
      </div>

      {/* Ligne timeline + date (mobile: au-dessus de la carte) */}
      <div className="flex flex-col w-full md:w-auto md:shrink-0 md:min-w-0 order-1 md:order-2 relative">
        <div className="hidden md:block absolute inset-y-0 left-1/2 -translate-x-1/2 parcours-timeline-line" aria-hidden>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-primary/50" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-primary/30" />
        </div>
        <motion.div
          aria-hidden
          className="parcours-scroll-runner"
          style={{ top: runnerTop, opacity: runnerOpacity }}
        />
        <div className="md:hidden flex flex-row items-center gap-2 pb-2">
          <div className="relative w-10 h-10 shrink-0">
            <div className="absolute inset-0 rounded-full bg-primary/15 border border-primary/40 flex items-center justify-center shadow-[0_0_14px_rgba(59,130,246,0.4)]">
              <IconComponent className="w-5 h-5 text-primary" />
            </div>
            <div className="absolute inset-0 rounded-full border border-primary/30 parcours-node-pulse" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[11px] uppercase tracking-widest text-muted-foreground/90 font-medium">{exp.date}</span>
            <span className="text-xs text-muted-foreground/80 flex items-center gap-1.5 mt-0.5">
              <MapPin className="h-3 w-3 shrink-0" aria-hidden />
              {exp.location}
            </span>
          </div>
        </div>
      </div>

      {/* Carte (pleine largeur sur mobile) */}
      <motion.div
        className="relative w-full md:flex-1 min-w-0 order-3"
        variants={cardVariants}
        custom={index}
      >
        <motion.div
          className="relative bg-card/90 p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-lg border border-primary/10 backdrop-blur-xl parcours-card overflow-hidden group"
          whileHover={{
            y: -6,
            transition: { type: 'spring', stiffness: 300, damping: 22 },
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
        >
          <div className="pointer-events-none absolute inset-0 opacity-30">
            <div className="absolute left-3 top-3 sm:left-4 sm:top-4 w-4 h-3.5 sm:w-6 sm:h-5 border-l border-t border-primary/20 rounded-tl" />
            <div className="absolute right-3 top-3 sm:right-4 sm:top-4 w-4 h-3.5 sm:w-6 sm:h-5 border-r border-t border-primary/20 rounded-tr" />
            <div className="absolute left-3 bottom-3 sm:left-4 sm:bottom-4 w-4 h-3.5 sm:w-6 sm:h-5 border-l border-b border-primary/20 rounded-bl" />
            <div className="absolute right-3 bottom-3 sm:right-4 sm:bottom-4 w-4 h-3.5 sm:w-6 sm:h-5 border-r border-b border-primary/20 rounded-br" />
          </div>

          <h3 className="text-base sm:text-lg md:text-xl font-semibold text-primary pr-8 mb-1.5 sm:mb-2 relative">
            {exp.title}
          </h3>

          {exp.companyUrl ? (
            <a
              href={exp.companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors min-h-[44px] items-center py-1 -my-1"
            >
              <span className="group-hover:underline">{exp.company}</span>
              <ExternalLink className="h-3.5 w-3.5 sm:h-3 sm:w-3 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
            </a>
          ) : (
            <h4 className="text-sm text-muted-foreground">{exp.company}</h4>
          )}

          <p className="text-muted-foreground mt-3 sm:mt-4 text-base leading-relaxed">
            {exp.description}
          </p>
        </motion.div>
      </motion.div>
    </motion.article>
  );
});

export default function ParcoursSection() {
  const listRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ['start 0.15', 'end 0.85'],
  });

  const t = useTranslations('Parcours');
  let parcours = t.raw('items') as Parcours[];

  parcours = parcours.map((exp) => ({
    ...exp,
    companyUrl: companyLinks[exp.company],
  }));

  const sortedParcours = [...parcours].sort(
    (a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime()
  );

  return (
    <section id="parcours" className="py-14 sm:py-16 md:py-20 relative bg-background text-foreground overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[100vw]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 sm:mb-10 md:mb-12 text-center"
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 cockpit-glow">{t('heading')}</h2>
          <div className="w-16 sm:w-20 h-1 bg-primary mx-auto mb-4 sm:mb-6 rounded-full" />
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto px-1">{t('description')}</p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto px-3 sm:px-6 md:px-8 lg:px-10">
          <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-40 hidden md:block">
            {[1, 2, 3, 4].map((i) => (
              <div key={`h-${i}`} className="hud-line" style={{ top: `${i * 20}%` }} />
            ))}
            {[1, 2, 3, 4].map((i) => (
              <div key={`v-${i}`} className="hud-line-vertical" style={{ left: `${i * 20}%` }} />
            ))}
          </div>
          <div ref={listRef} className="relative">
            {sortedParcours.map((exp, index) => (
              <ParcoursItem
                key={index}
                exp={exp}
                index={index}
                segmentCount={sortedParcours.length}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
