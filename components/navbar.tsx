'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { Menu, X, Plane } from 'lucide-react';
import ThemeSwitcher from '@/components/ui/ThemeSwitcher';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import { useTranslations } from '@/hooks/useTranslations';
import { cn } from '@/lib/utils';

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
  const [active, setActive] = useState('#hero');
  const { scrollY, scrollYProgress } = useScroll();

  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 50));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => entry.isIntersecting && setActive(`#${entry.target.id}`)),
      { rootMargin: '-50% 0px -50% 0px' },
    );
    document
      .querySelectorAll(Object.values(navRoutes).join(','))
      .forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-background/80 backdrop-blur-md shadow-md' : 'bg-background'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="#hero" aria-label="Karim Feki" className="flex items-center space-x-2">
            <Plane className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold tracking-wide text-foreground">F-KRIM</span>
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
                  aria-current={active === navRoutes[key] ? 'true' : undefined}
                  className={cn(
                    'relative text-sm font-medium text-foreground hover:text-primary transition-colors',
                    active === navRoutes[key] && 'text-primary',
                  )}
                >
                  {t(key)}
                  {active === navRoutes[key] && (
                    <motion.span
                      layoutId="nav-marker"
                      aria-hidden
                      className="absolute -bottom-1.5 inset-x-0 h-0.5 rounded-full bg-primary shadow-[0_0_8px_hsl(var(--primary)/0.8)]"
                      transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                    />
                  )}
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
              aria-label={t(isOpen ? 'closeMenu' : 'openMenu')}
              aria-expanded={isOpen}
              className="text-foreground hover:text-primary transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden bg-secondary/90 backdrop-blur-md"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navKeys.map((key) => (
                <Link
                  key={key}
                  href={navRoutes[key]}
                  onClick={() => setIsOpen(false)}
                  aria-current={active === navRoutes[key] ? 'true' : undefined}
                  className={cn(
                    'block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-primary/20 hover:text-primary transition-colors',
                    active === navRoutes[key] && 'text-primary',
                  )}
                >
                  {t(key)}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-primary/20"
      >
        <motion.div className="h-full origin-left bg-primary" style={{ scaleX: scrollYProgress }} />
      </div>
    </motion.header>
  );
}
