"use client";

import { motion } from "framer-motion";
import { MapPin, Calendar, Briefcase, Mail } from "lucide-react";
import Link from "next/link";

export default function AlternanceSection() {
  return (
    <section className="py-20 bg-secondary/30 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto bg-card p-8 rounded-lg shadow-lg border border-border/50"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4 cockpit-glow">Recherche d&apos;alternance</h2>
            <div className="w-20 h-1 bg-accent mx-auto mb-4"></div>
          </div>

          <div className="space-y-6">
            <div className="flex items-start">
              <Calendar className="h-6 w-6 text-accent mr-4 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Disponibilité</h3>
                <p className="text-muted-foreground">
                  À partir de septembre 2025
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <MapPin className="h-6 w-6 text-accent mr-4 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Localisations cibles</h3>
                <p className="text-muted-foreground">
                  Île-de-France | Bordeaux | Toulouse
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <Briefcase className="h-6 w-6 text-accent mr-4 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Domaine</h3>
                <p className="text-muted-foreground">
                  Développement Web
                </p>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-8 text-center"
          >
            <Link
              href="mailto:karimfeki2004@gmail.com"
              className="inline-flex items-center px-6 py-3 bg-accent text-white rounded-md takeoff-button"
            >
              <Mail className="h-5 w-5 mr-2" />
              Me contacter
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}