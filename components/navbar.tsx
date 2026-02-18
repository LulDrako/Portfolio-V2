'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Menu, X, Plane } from 'lucide-react';
import ThemeSwitcher from '@/components/ui/ThemeSwitcher';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import { useTranslations } from '@/hooks/useTranslations';

const navKeys = ['Accueil', 'À propos', 'Parcours', 'Projets', 'Contact'];

const navRoutes: Record<string, string> = {
  Accueil: '#hero',
  'À propos': '#about',
  Parcours: '#parcours',
  Projets: '#projects',
  Contact: '#contact',
};

export default function Navbar() {
  const t = useTranslations('Navbar');
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 pt-[env(safe-area-inset-top)] ${
        scrolled ? 'bg-background/80 backdrop-blur-md shadow-md' : 'bg-background'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[100vw]">
        <div className="flex items-center justify-between h-14 sm:h-16 min-h-[44px]">
          {/* Logo */}
          <Link href="#hero" className="flex items-center space-x-2">
            <Plane className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-foreground">KF</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 items-center">
            {navKeys.map((key, index) => (
              <motion.li
                key={key}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="list-none"
              >
                <Link
                  href={navRoutes[key]}
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  {t(key)}
                </Link>
              </motion.li>
            ))}
            <ThemeSwitcher />
            <LanguageSwitcher />
          </nav>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeSwitcher />
            <LanguageSwitcher />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground hover:text-primary transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-secondary/90 backdrop-blur-md"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navKeys.map((key) => (
              <Link
                key={key}
                href={navRoutes[key]}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 min-h-[44px] flex items-center rounded-md text-base font-medium text-foreground hover:bg-primary/20 hover:text-primary transition-colors"
              >
                {t(key)}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
