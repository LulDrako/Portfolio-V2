'use client';

import { motion } from 'framer-motion';

const variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function SectionHeading({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="mb-12 text-center"
    >
      <h2 className="text-3xl font-bold mb-4 cockpit-glow">{title}</h2>
      <div className="w-20 h-1 bg-primary mx-auto mb-8 rounded-full" />
      {description && <p className="text-muted-foreground max-w-3xl mx-auto">{description}</p>}
    </motion.div>
  );
}
