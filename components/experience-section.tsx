"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";
import { experiences } from "@/lib/data";

export default function ExperienceSection() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["0.2 end", "0.8 start"],
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="experiences" className="py-20 relative bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header (Matches À propos) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-bold mb-4 cockpit-glow text-white">Expériences</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Mon parcours professionnel et académique.
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div ref={targetRef} className="relative max-w-3xl mx-auto">
          {/* Timeline Line (Matching Style) */}
          <motion.div
            style={{ scaleY: pathLength }}
            className="absolute left-1/2 top-0 w-1 bg-primary origin-top -translate-x-1/2 h-full"
          ></motion.div>

          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative flex items-center justify-between w-full mb-16"
            >
              {/* Experience Card (Fixing Background & Style) */}
              <div
                className="relative bg-secondary/90 p-6 rounded-lg shadow-lg border border-gray-700 hover:scale-[1.02] transition-transform w-[90%] mx-auto backdrop-blur-lg"
              >
                <h3 className="text-lg font-semibold text-primary">{exp.title}</h3>
                <h4 className="text-sm text-gray-400">{exp.company}</h4>
                <div className="flex items-center text-sm text-gray-300 mt-2">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span className="mr-3">{exp.date}</span>
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{exp.location}</span>
                </div>
                <p className="text-gray-300 mt-2">{exp.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
