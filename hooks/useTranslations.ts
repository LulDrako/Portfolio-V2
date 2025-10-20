'use client';

import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

export function useTranslations(namespace?: string) {
  const { t, i18n, ready } = useTranslation();
  const [, forceUpdate] = useState(0);
  const [isLanguageChanging, setIsLanguageChanging] = useState(false);
  
  // Forcer le re-render quand la langue change
  useEffect(() => {
    const handleLanguageChangeStart = () => {
      setIsLanguageChanging(true);
    };

    const handleLanguageChange = () => {
      forceUpdate(prev => prev + 1);
      // Délai pour l'animation
      setTimeout(() => {
        setIsLanguageChanging(false);
      }, 300);
    };

    // Écouter les changements de langue
    i18n.on('languageChanged', handleLanguageChangeStart);
    i18n.on('languageChanged', handleLanguageChange);
    
    if (typeof window !== 'undefined') {
      window.addEventListener('languageChanged', handleLanguageChange);
    }

    return () => {
      i18n.off('languageChanged', handleLanguageChangeStart);
      i18n.off('languageChanged', handleLanguageChange);
      if (typeof window !== 'undefined') {
        window.removeEventListener('languageChanged', handleLanguageChange);
      }
    };
  }, [i18n]);
  
  if (!ready) {
    // Pendant le chargement, utiliser les traductions par défaut pour éviter l'hydratation mismatch
    if (namespace) {
      const defaultT = (key: string) => {
        try {
          // Essayer d'accéder directement aux messages pour éviter les problèmes d'hydratation
          const messages = i18n.getResourceBundle(i18n.language || 'fr', 'translation') || {};
          return messages[`${namespace}.${key}`] || key;
        } catch {
          return key;
        }
      };
      defaultT.raw = (key: string) => defaultT(key);
      return defaultT;
    }
    
    const defaultT = (key: string) => {
      try {
        const messages = i18n.getResourceBundle(i18n.language || 'fr', 'translation') || {};
        return messages[key] || key;
      } catch {
        return key;
      }
    };
    defaultT.raw = (key: string) => defaultT(key);
    return defaultT;
  }
  
  if (namespace) {
    const translateKey = (key: string) => t(`${namespace}.${key}`);
    translateKey.raw = (key: string) => t(`${namespace}.${key}`, { returnObjects: true });
    return translateKey;
  }
  
  const translate = (key: string) => t(key);
  translate.raw = (key: string) => t(key, { returnObjects: true });
  return translate;
}
