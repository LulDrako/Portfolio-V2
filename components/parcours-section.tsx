"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";
import { iconMap } from "@/lib/data";
import { useTranslations } from "next-intl";

type Experience = {
  title: string;
  company: string;
  location: string;
  date: string;
  description: string;
  icon: keyof typeof iconMap;
};

const moisMap = {
  Janvier: 0, Février: 1, Mars: 2, Avril: 3, Mai: 4, Juin: 5,
  Juillet: 6, Août: 7, Septembre: 8, Octobre: 9, Novembre: 10, Décembre: 11,
  January: 0, February: 1, March: 2, April: 3, May: 4, June: 5,
  July: 6, August: 7, September: 8, October: 9, November: 10, December: 11
};

function parseDate(dateStr: string | number): Date {
  if (!dateStr) return new Date(0);
  const firstPart = String(dateStr).split(" - ")[0].trim();
  const parts = firstPart.split(" ");

  if (parts.length === 2) {
    const [monthName, year] = parts;
    const monthIndex = moisMap[monthName as keyof typeof moisMap] ?? 0;
    return new Date(parseInt(year), monthIndex, 1);
  }

  if (/^\d{4}$/.test(firstPart)) {
    return new Date(parseInt(firstPart), 6, 1); // milieu de l'année
  }

  return new Date(0); // fallback si format inconnu
}


export default function ExperienceSection() {
  const t = useTranslations("Parcours");
  const experiences = t.raw("items") as Experience[];

  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["0.2 end", "0.6 start"],
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="experiences" className="py-20 relative bg-background text-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-bold mb-4 cockpit-glow">{t("heading")}</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">{t("description")}</p>
        </motion.div>

        {/* Timeline */}
        <div ref={targetRef} className="relative max-w-3xl mx-auto">
          <motion.div
            style={{ scaleY: pathLength }}
            className="absolute left-1/2 top-0 w-1 bg-primary origin-top -translate-x-1/2 h-full"
          />

          {experiences
            .sort((a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime())
            .map((exp, index) => {
              const IconComponent = iconMap[exp.icon];

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative flex items-center justify-between w-full mb-16"
                >
                  <div className="relative bg-card p-6 rounded-lg shadow-lg border border-border hover:scale-[1.02] transition-transform w-[90%] mx-auto backdrop-blur-lg">
                    <div className="absolute top-4 right-4 text-primary opacity-60">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-semibold text-primary">{exp.title}</h3>
                    <h4 className="text-sm text-muted-foreground">{exp.company}</h4>
                    <div className="flex items-center text-sm text-muted-foreground mt-2">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span className="mr-3">{exp.date}</span>
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{exp.location}</span>
                    </div>
                    <p className="text-muted-foreground mt-2">{exp.description}</p>
                  </div>
                </motion.div>
              );
            })}
        </div>
      </div>
    </section>
  );
}
