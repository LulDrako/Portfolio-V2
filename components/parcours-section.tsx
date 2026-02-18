'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
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

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 32,
    scale: 0.96,
    filter: 'blur(4px)',
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      type: 'spring',
      stiffness: 80,
      damping: 18,
      mass: 0.8,
      delay: i * 0.12,
    },
  }),
};

function ParcoursItem({
  exp,
  index,
}: {
  exp: Parcours;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.35 });
  const IconComponent = iconMap[exp.icon];
  const isLeft = index % 2 === 0;

  return (
    <motion.article
      ref={ref}
      className={`relative flex w-full mb-10 md:mb-14 gap-4 md:gap-6 ${
        isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
      }`}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      custom={index}
    >
      {/* Colonne gauche : badge / info courte */}
      <div className="flex flex-col items-center md:items-start gap-3 min-w-[120px]">
        <div className="relative">
          <div className="h-12 w-12 rounded-full bg-primary/15 border border-primary/40 flex items-center justify-center shadow-[0_0_18px_rgba(59,130,246,0.55)]">
            <IconComponent className="w-6 h-6 text-primary" />
          </div>
          <div className="absolute inset-0 rounded-full border border-primary/20 animate-[ping_1.8s_ease-out_infinite]" />
        </div>

        <div className="hidden md:block h-full w-px bg-primary/15 relative">
          <div className="absolute top-0 -left-[3px] h-1.5 w-1.5 rounded-full bg-primary/60" />
          <div className="absolute bottom-0 -left-[3px] h-1.5 w-1.5 rounded-full bg-primary/20" />
        </div>

        <div className="text-xs uppercase tracking-[0.16em] text-muted-foreground/80">
          {exp.date}
        </div>
        <div className="text-xs text-muted-foreground flex items-center gap-1.5">
          <MapPin className="h-3 w-3" />
          <span>{exp.location}</span>
        </div>
      </div>

      {/* Carte principale */}
      <motion.div
        className="relative flex-1"
        variants={cardVariants}
        custom={index}
      >
        <motion.div
          className="relative bg-card/90 p-6 md:p-7 rounded-2xl shadow-lg border border-primary/10 backdrop-blur-xl parcours-card overflow-hidden group"
          whileHover={{
            y: -6,
            transition: { type: 'spring', stiffness: 300, damping: 22 },
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
        >
          {/* Décor HUD subtil dans la carte */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.5]">
            <div className="absolute inset-x-6 top-4 h-px bg-primary/10" />
            <div className="absolute inset-y-4 left-6 w-px bg-primary/10" />
            <div className="absolute inset-y-4 right-10 w-px bg-primary/10" />
          </div>

          <h3 className="text-lg md:text-xl font-semibold text-primary pr-8 mb-1.5 relative">
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

          <p className="text-muted-foreground mt-3 text-sm md:text-base leading-relaxed">
            {exp.description}
          </p>
        </motion.div>
      </motion.div>
    </motion.article>
  );
}

export default function ParcoursSection() {
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
        {/* Header */}
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
          <div className="relative space-y-10 md:space-y-14">
            {sortedParcours.map((exp, index) => (
              <ParcoursItem key={index} exp={exp} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
