"use client";

import { motion } from "framer-motion";
import { MapPin, Calendar, Briefcase, Mail } from "lucide-react";
import Link from "next/link";

export default function AlternanceSection() {
  return (
    <section className="py-10 bg-background text-foreground relative overflow-hidden flex items-center justify-center">
      <div className="relative w-[500px] h-[500px] flex items-center justify-center">
        
        {/* Cercle principal */}
        <div className="absolute inset-0 rounded-full bg-[#0A192F] border-2 radar-border"></div>

        {/* Cercles concentriques */}
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="absolute inset-0 rounded-full radar-border border" style={{ inset: `${i * 10}%` }} />
        ))}

        {/* Lignes du radar */}
        <div className="absolute inset-x-0 top-1/2 radar-border border-t"></div>
        <div className="absolute inset-x-0 bottom-1/2 radar-border border-b"></div>
        <div className="absolute inset-y-0 left-1/2 radar-border border-l"></div>
        <div className="absolute inset-y-0 right-1/2 radar-border border-r"></div>

        {/* Effet de balayage du radar */}
        <motion.div
          className="absolute inset-0 origin-center overflow-hidden rounded-full"
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 7, ease: "linear" }}
        >
          <div
            className="absolute w-full h-full"
            style={{
              transformOrigin: "bottom center",
              background: "conic-gradient(transparent 0deg, rgba(0,255,218,0.2) 15deg, transparent 80deg)",
              clipPath: "polygon(50% 50%, 100% 0, 100% 100%, 50% 50%)",
              boxShadow: "0 0 30px rgba(100,255,218,0.15)"
            }}
          ></div>
        </motion.div>

        {/* Centre du radar */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-2 h-2 bg-cyan rounded-full shadow-[0_0_10px_rgba(100,255,218,0.7)]"></div>
          <div className="absolute inset-0 animate-ping">
            <div className="w-2 h-2 bg-cyan/50 rounded-full"></div>
          </div>
        </div>

        {/* Contenu du texte */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-xl text-center px-6"
        >
          <h2 className="text-3xl font-bold mb-6 cockpit-glow text-cyan-300">
            Recherche d&apos;alternance
          </h2>

          <div className="space-y-6">
            {/* 📅 Date */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-center space-x-2"
            >
              <Calendar className="h-5 w-5 icon-alternance flex-shrink-0" />
              <span className="text-alternance text-lg">À partir de septembre 2025</span>
            </motion.div>

            {/* 📍 Lieux */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex items-center justify-center space-x-2"
            >
              <MapPin className="h-5 w-5 icon-alternance flex-shrink-0" />
              <span className="text-alternance text-lg">Île-de-France | Bordeaux | Toulouse</span>
            </motion.div>

            {/* 💼 Domaine */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-center space-x-2"
            >
              <Briefcase className="h-5 w-5 icon-alternance flex-shrink-0" />
              <span className="text-alternance text-lg">Développement Full-Stack</span>
            </motion.div>

            {/* 📩 Bouton de contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <Link
                href="mailto:karimfeki2004@gmail.com"
                className="inline-flex items-center px-6 py-2 bg-primary/20 border border-primary/30 rounded-full hover:bg-primary/30 transition-colors duration-300 backdrop-blur-sm group text-sm button-alternance"
              >
                <Mail className="h-4 w-4 mr-2 icon-alternance group-hover:rotate-12 transition-transform" />
                Me contacter
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
