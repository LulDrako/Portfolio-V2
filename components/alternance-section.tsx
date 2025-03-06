"use client";

import { motion } from "framer-motion";
import { MapPin, Calendar, Briefcase, Mail } from "lucide-react";
import Link from "next/link";

export default function AlternanceSection() {
  return (
    <section className="py-20 bg-aviation-blue-night relative overflow-hidden min-h-screen flex items-center justify-center">
      {/* Radar Container with Content */}
      <div className="relative w-[750px] h-[750px] flex items-center justify-center">
        {/* Radar Background and Effects */}
        <div className="absolute inset-0">
          {/* Radar Background */}
          <div className="absolute inset-0 rounded-full bg-[#0A192F] border border-[#1a4d8c]/20"></div>
          
          {/* Radar Grid Lines - Circles */}
          <div className="absolute inset-[10%] border-[0.5px] border-[#1a4d8c]/20 rounded-full"></div>
          <div className="absolute inset-[20%] border-[0.5px] border-[#1a4d8c]/20 rounded-full"></div>
          <div className="absolute inset-[30%] border-[0.5px] border-[#1a4d8c]/20 rounded-full"></div>
          <div className="absolute inset-[40%] border-[0.5px] border-[#1a4d8c]/20 rounded-full"></div>
          <div className="absolute inset-[50%] border-[0.5px] border-[#1a4d8c]/20 rounded-full"></div>
          
          {/* Radar Grid Lines - Radial */}
          {[...Array(36)].map((_, i) => (
            <div
              key={i}
              className="absolute inset-0 origin-center"
              style={{ transform: `rotate(${i * 10}deg)` }}
            >
              <div className="w-[0.5px] h-1/2 bg-[#1a4d8c]/20 mx-auto"></div>
            </div>
          ))}
          
          {/* Radar Scan Line */}
          <div className="absolute inset-0 origin-center animate-radar-scan">
            <div 
              className="absolute left-1/2 top-1/2 w-[1.5px] h-1/2 origin-bottom bg-gradient-to-t from-[#64ffda] to-transparent"
              style={{
                transform: "rotate(-90deg)",
                transformOrigin: "bottom",
                boxShadow: "0 0 20px rgba(100, 255, 218, 0.3)"
              }}
            ></div>
          </div>

          {/* Radar Center Point */}
          <div className="absolute left-1/2 top-1/2 w-1 h-1 bg-[#64ffda]/30 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          
          {/* Radar Subtle Glow */}
          <div className="absolute inset-0 rounded-full bg-[#1a4d8c]/5"></div>
        </div>

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