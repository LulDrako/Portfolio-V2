"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { FileText, Github, Linkedin, Mail, Plane } from "lucide-react";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { useRef, useEffect, useState } from "react";
import { useTranslations } from 'next-intl';


export default function HeroSection() {
  const t = useTranslations('Hero');
  
  const formattedSubtitle = t.raw('subtitle');
  const containerRef = useRef<HTMLElement>(null);
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const lastScrollY = useRef(0);
  const [windowHeight, setWindowHeight] = useState(0);
  const [goingUp, setGoingUp] = useState(false);
  const [bottomReached, setBottomReached] = useState(false);
  const [topReached, setTopReached] = useState(true);
  const [currentRotation, setCurrentRotation] = useState(135);

  const { scrollY } = useScroll();

  const [scrollHeight, setScrollHeight] = useState(0);

  console.log("🧪 [Hero] intro:", t("intro"));
console.log("🧪 [Hero] LANG PATH:", typeof window !== "undefined" ? window.location.pathname : "server");

  
  
  useEffect(() => {
    const updateScrollHeight = () => {
      setScrollHeight(document.documentElement.scrollHeight - window.innerHeight);
      setWindowHeight(window.innerHeight);
    };
    
    updateScrollHeight();
    window.addEventListener('resize', updateScrollHeight);
    return () => window.removeEventListener('resize', updateScrollHeight);
  }, []);

  
  const y = useTransform(scrollY, [0, scrollHeight || 1], [70, windowHeight ? (windowHeight - 220) : 500]);
  const smoothY = useSpring(y, { 
    stiffness: 45,    
    damping: 18,      
    mass: 1.2         
  });

  const smoothRotation = useSpring(currentRotation, { 
    stiffness: 35,    
    damping: 25,      
    mass: 1.5,        
    restDelta: 0.01   
  });

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = maxScroll > 0 ? currentScrollY / maxScroll : 0;
      
      if (scrollPercentage > 0.98) {
        setBottomReached(true);
        setTopReached(false);
        setGoingUp(true);
        setCurrentRotation(-45);
      } 
      else if (scrollPercentage < 0.02) {
        setTopReached(true);
        setBottomReached(false);
        setGoingUp(false);
        setCurrentRotation(135);
      }
      
      setIsScrollingUp(currentScrollY < lastScrollY.current);
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={containerRef} id="hero" className="relative min-h-screen flex items-center">
      {/* HUD Lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={`h-${i}`}
            className="hud-line"
            style={{ top: `${i * 20}%` }}
          ></div>
        ))}
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={`v-${i}`}
            className="hud-line-vertical"
            style={{ left: `${i * 20}%` }}
          ></div>
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-primary mb-4"
          >
            {t('intro')}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 cockpit-glow"
          >
              {t('title')}
              </motion.h1>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-6 text-muted-foreground"
                dangerouslySetInnerHTML={{
                  __html: formattedSubtitle
                    .replace('<accent>', '<span class="text-accent accent-glow">')
                    .replace('</accent>', '</span>')
                }}
              />


          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-lg text-muted-foreground mb-8"
          >
              {t('description')}
              </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-wrap gap-4 mb-8"
          >
            <Link href="#contact" className="button button-primary">
              <Mail size={18} />
              {t('contact')}
            </Link>

            <Link href="/cv.pdf" target="_blank" className="button button-secondary">
              <FileText size={18} />
              {t('cv')}
            </Link>

          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex gap-6"
          >
            <a
              href="https://github.com/LulDrako"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <FaGithub size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/karim-feki-18ab66249/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <FaLinkedin size={24} />
            </a>
            <a
              href="mailto:karimfeki2004@gmail.com"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <FaEnvelope size={24} />
            </a>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="fixed right-5 z-50 hidden lg:block"
        initial={{ 
          opacity: 0, 
          x: 100,
          scale: 0.8,
          rotate: 135
        }}
        animate={{ 
          opacity: 1, 
          x: 0,
          scale: 1,
          rotate: goingUp ? -45 : 135
        }}
        transition={{
          rotate: {
            type: "spring",
            stiffness: 35,
            damping: 25,
            mass: 1.5
          },
          default: {
            duration: 1.5,
            type: "spring",
            stiffness: 40,
            damping: 15,
            mass: 1.2,
            delay: 0.8
          }
        }}
        style={{
          top: 0,
          y: smoothY
        }}
      >
        <Plane size={42} className="text-primary" />
      </motion.div>
    </section>
  );
}