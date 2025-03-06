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
          <div className="absolute inset-0 rounded-full bg-[#0A192F]/90 border-2 border-cyan/20"></div>
          
          {/* Radar Grid Lines */}
          <div className="absolute inset-0 border-[1px] border-cyan/30 rounded-full shadow-[0_0_15px_rgba(100,255,218,0.1)]">
            <span className="absolute top-2 left-1/2 -translate-x-1/2 text-[10px] text-cyan/40">0°</span>
            <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] text-cyan/40">180°</span>
            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[10px] text-cyan/40">270°</span>
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-cyan/40">90°</span>
          </div>
          <div className="absolute inset-[12.5%] border-[1px] border-cyan/25 rounded-full">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] text-cyan/30">75nm</span>
          </div>
          <div className="absolute inset-[25%] border-[1px] border-cyan/25 rounded-full">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] text-cyan/30">50nm</span>
          </div>
          <div className="absolute inset-[37.5%] border-[1px] border-cyan/25 rounded-full">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] text-cyan/30">25nm</span>
          </div>
          <div className="absolute inset-[50%] border-[1px] border-cyan/25 rounded-full"></div>
          
          {/* Radar Cross Lines with Markers */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-cyan/30 to-transparent"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-cyan/30 to-transparent"></div>
          </div>

          {/* Radar Points */}
          <div className="absolute inset-0">
            <div className="absolute top-[30%] left-[60%] w-1.5 h-1.5 bg-cyan/50 rounded-full animate-pulse">
              <span className="absolute -top-4 left-4 text-[10px] text-cyan/40">AF-2025</span>
            </div>
            <div className="absolute top-[45%] left-[35%] w-1.5 h-1.5 bg-cyan/40 rounded-full animate-pulse">
              <span className="absolute -top-4 left-4 text-[10px] text-cyan/40">KF-0923</span>
            </div>
          </div>
          
          {/* Radar Scan Line with Mask */}
          <div className="absolute inset-0 origin-center animate-radar-scan overflow-hidden rounded-full">
            <div 
              className="w-full h-1/2 origin-bottom absolute" 
              style={{
                background: "linear-gradient(90deg, transparent 50%, rgba(100, 255, 218, 0.2) 100%)",
                transform: "rotate(-90deg)",
                transformOrigin: "bottom",
                boxShadow: "0 0 30px rgba(100, 255, 218, 0.15)"
              }}
            ></div>
          </div>

          {/* Radar Center Point with Pulse */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-1.5 h-1.5 bg-cyan rounded-full shadow-[0_0_10px_rgba(100,255,218,0.7)]"></div>
            <div className="absolute inset-0 animate-ping">
              <div className="w-1.5 h-1.5 bg-cyan/50 rounded-full"></div>
            </div>
          </div>
          
          {/* Radar Glow Effects */}
          <div className="absolute inset-0 rounded-full bg-cyan/5 blur-md"></div>
          <div className="absolute inset-[45%] rounded-full bg-cyan/10 blur-lg"></div>
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