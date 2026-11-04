'use client';

import { motion } from 'framer-motion';
import { technologies, iconMap } from '@/lib/data';
import { useTranslations } from '@/hooks/useTranslations';
import SectionHeading from '@/components/ui/SectionHeading';
import HudCorners from '@/components/ui/HudCorners';

export default function AboutSection() {
  const t = useTranslations('About');

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const descriptionArray = t.raw('description') as string[];

  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title={t('heading')} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-semibold mb-4">{t('title')}</h3>
            {descriptionArray.map((paragraph, index) => (
              <p key={index} className="text-muted-foreground mb-4">
                {paragraph}
              </p>
            ))}
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4"
          >
            {technologies.map((tech) => {
              const IconComponent = iconMap[tech.icon as keyof typeof iconMap];
              return (
                <motion.div
                  key={tech.name}
                  variants={item}
                  className="group relative flex flex-col items-center p-4 border radar-border rounded-lg bg-secondary/50 transition-shadow hover:shadow-[0_0_16px_hsl(var(--primary)/0.3)]"
                >
                  <HudCorners className="-inset-2" />
                  <div className="mb-2 transition-transform group-hover:scale-110">
                    <IconComponent size={48} style={{ color: tech.color }} />
                  </div>
                  <span className="text-sm text-muted-foreground">{tech.name}</span>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
