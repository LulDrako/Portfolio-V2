"use client";

import { motion } from "framer-motion";
import { aboutMe, technologies, iconMap } from "@/lib/data";

export default function AboutSection() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-bold mb-4 cockpit-glow">À propos</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-semibold mb-4">{aboutMe.title}</h3>
            {aboutMe.description.map((paragraph, index) => (
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
            className="grid grid-cols-2 sm:grid-cols-4 gap-8"
          >
            {technologies.map((tech) => {
              const IconComponent = iconMap[tech.icon as keyof typeof iconMap];
              return (
                <motion.div
                  key={tech.name}
                  variants={item}
                  className="flex flex-col items-center"
                >
                  <div className="mb-2 transform transition-transform hover:scale-110">
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
