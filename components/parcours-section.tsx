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
      className={`relative flex w-full mb-14 md:mb-20 gap-5 md:gap-8 md:items-stretch flex-nowrap ${
        cardRight ? 'md:flex-row' : 'md:flex-row-reverse'
      }`}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      custom={index}
    >
      <div
        className={`hidden md:flex shrink-0 items-center gap-3 pt-6 md:pt-8 ${
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

      <div className="flex flex-col shrink-0 md:min-w-0 relative">
        <div className="hidden md:block absolute inset-y-0 left-1/2 -translate-x-1/2 parcours-timeline-line" aria-hidden>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-primary/50" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-primary/30" />
        </div>
        <motion.div
          aria-hidden
          className="parcours-scroll-runner"
          style={{ top: runnerTop, opacity: runnerOpacity }}
        />
        <div className="md:hidden flex flex-row items-center gap-2 pt-2">
          <div className="relative w-11 h-11 shrink-0">
            <div className="absolute inset-0 rounded-full bg-primary/15 border border-primary/40 flex items-center justify-center shadow-[0_0_14px_rgba(59,130,246,0.4)]">
              <IconComponent className="w-5 h-5 text-primary" />
            </div>
            <div className="absolute inset-0 rounded-full border border-primary/30 parcours-node-pulse" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[11px] uppercase tracking-widest text-muted-foreground/90 font-medium whitespace-nowrap">{exp.date}</span>
            <span className="text-xs text-muted-foreground/80 flex items-center gap-1.5 mt-1">
              <MapPin className="h-3 w-3 shrink-0" aria-hidden />
              {exp.location}
            </span>
          </div>
        </div>
      </div>

      <motion.div
        className="relative flex-1 min-w-0"
        variants={cardVariants}
        custom={index}
      >
        <motion.div
          className="relative bg-card/90 p-6 md:p-8 rounded-2xl shadow-lg border border-primary/10 backdrop-blur-xl parcours-card overflow-hidden group"
          whileHover={{
            y: -6,
            transition: { type: 'spring', stiffness: 300, damping: 22 },
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
        >
          <div className="pointer-events-none absolute inset-0 opacity-30">
            <div className="absolute left-4 top-4 w-6 h-5 border-l border-t border-primary/20 rounded-tl" />
            <div className="absolute right-4 top-4 w-6 h-5 border-r border-t border-primary/20 rounded-tr" />
            <div className="absolute left-4 bottom-4 w-6 h-5 border-l border-b border-primary/20 rounded-bl" />
            <div className="absolute right-4 bottom-4 w-6 h-5 border-r border-b border-primary/20 rounded-br" />
          </div>

          <h3 className="text-lg md:text-xl font-semibold text-primary pr-8 mb-2 relative">
            {exp.title}
          </h3>

          {exp.companyUrl ? (
            <a
              href={exp.companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <span className="group-hover:underline">{exp.company}</span>
              <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          ) : (
            <h4 className="text-sm text-muted-foreground">{exp.company}</h4>
          )}

          <p className="text-muted-foreground mt-4 text-sm md:text-base leading-relaxed">
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
    <section id="parcours" className="py-20 relative bg-background text-foreground overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-bold mb-4 cockpit-glow">{t('heading')}</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6 rounded-full" />
          <p className="text-muted-foreground max-w-2xl mx-auto">{t('description')}</p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto px-6 sm:px-8 md:px-10">
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
