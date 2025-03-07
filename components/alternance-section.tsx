"use client";

import { motion } from "framer-motion";
import { MapPin, Calendar, Briefcase, Mail } from "lucide-react";
import Link from "next/link";

export default function AlternanceSection() {
  return (
    <section className="py-5 bg-background relative overflow-hidden flex items-center justify-center">
      <div className="relative w-[750px] h-[750px] flex items-center justify-center">
        {/* Radar Background */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#0A192F]/80 to-[#0A192F]/60 border-2 border-cyan/30"></div>
        
        {/* Radar Grid Lines */}
        <div className="absolute inset-0 border-[1px] border-cyan/50 rounded-full shadow-[0_0_15px rgba(100,255,218,0.2)]">
          <span className="absolute top-2 left-1/2 -translate-x-1/2 text-[12px] text-cyan/50">0°</span>
          <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[12px] text-cyan/50">180°</span>
          <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[12px] text-cyan/50">270°</span>
          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[12px] text-cyan/50">90°</span>
        </div>
        
        {/* Circular Grid Lines */}
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="absolute inset-0 rounded-full border border-cyan/30" style={{ inset: `${i * 20}%` }} />
        ))}

        {/* Radar Sweep */}
        <motion.div
          className="absolute inset-0 origin-center overflow-hidden rounded-full"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
        >
          <div
            className="absolute w-1 h-1/2 bg-cyan-400"
            style={{ transformOrigin: "bottom center", boxShadow: "0 0 15px rgba(100,255,218,0.8)" }}
          ></div>
        </motion.div>

        {/* Content Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-xl text-center px-6"
        >
          <h2 className="text-3xl font-bold mb-6 cockpit-glow">Recherche d&apos;alternance</h2>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-center space-x-2"
            >
              <Calendar className="h-5 w-5 text-cyan flex-shrink-0" />
              <span className="text-metal-gray text-sm">À partir de septembre 2025</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex items-center justify-center space-x-2"
            >
              <MapPin className="h-5 w-5 text-cyan flex-shrink-0" />
              <span className="text-metal-gray text-sm">Île-de-France | Bordeaux | Toulouse</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-center space-x-2"
            >
              <Briefcase className="h-5 w-5 text-cyan flex-shrink-0" />
              <span className="text-metal-gray text-sm">Développement Web</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <Link
                href="mailto:karimfeki2004@gmail.com"
                className="inline-flex items-center px-6 py-2 bg-cyan/20 text-cyan border border-cyan/30 rounded-full hover:bg-cyan/30 transition-colors duration-300 backdrop-blur-sm group text-sm"
              >
                <Mail className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform" />
                Me contacter
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
