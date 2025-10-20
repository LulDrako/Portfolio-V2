'use client';

import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ReactCountryFlag from 'react-country-flag';

const languages = [
  { code: 'fr', countryCode: 'FR', name: 'Français' },
  { code: 'en', countryCode: 'US', name: 'English' },
];

export default function LanguageSwitcher() {
  const { i18n, ready } = useTranslation();
  const [, forceUpdate] = useState(0);
  const [isChanging, setIsChanging] = useState(false);

  // Écouter les changements de langue pour mettre à jour l'UI
  useEffect(() => {
    const handleLanguageChange = () => {
      forceUpdate(prev => prev + 1);
    };

    if (ready) {
      i18n.on('languageChanged', handleLanguageChange);
    }

    return () => {
      if (ready) {
        i18n.off('languageChanged', handleLanguageChange);
      }
    };
  }, [i18n, ready]);

  const handleToggle = async () => {
    if (!ready || isChanging) return;
    
    const newLocale = i18n.language === 'fr' ? 'en' : 'fr';
    setIsChanging(true);
    
    try {
      await i18n.changeLanguage(newLocale);
      window.dispatchEvent(new Event('languageChanged'));
      setTimeout(() => setIsChanging(false), 150);
    } catch (error) {
      console.error('Erreur lors du changement de langue:', error);
      setIsChanging(false);
    }
  };

  const currentLang = languages.find(lang => lang.code === i18n.language) || languages[0];
  
  // Tooltip dans la langue actuelle
  const tooltipText = i18n.language === 'fr' ? 'Cliquer pour changer' : 'Click to switch';

  return (
    <motion.button
      onClick={handleToggle}
      disabled={isChanging}
      className="relative w-10 h-10 rounded-full bg-secondary/50 border border-border hover:bg-secondary/80 transition-all duration-300 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      title={tooltipText}
    >
      {/* Cercle avec drapeau */}
      <motion.div
        key={i18n.language}
        initial={{ scale: 0.8, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="absolute inset-0 flex items-center justify-center rounded-full overflow-hidden"
      >
        <ReactCountryFlag
          countryCode={currentLang.countryCode}
          svg
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
          title={currentLang.name}
        />
      </motion.div>

      {/* Indicateur de changement */}
      {isChanging && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          className="absolute inset-0 rounded-full bg-primary/20"
        />
      )}
    </motion.button>
  );
}
