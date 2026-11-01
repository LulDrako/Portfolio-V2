import { createInstance, type i18n as I18n } from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import des messages existants
import frMessages from '@/lib/messages/fr.json';
import enMessages from '@/lib/messages/en.json';
import { LOCALE_KEY, type Locale } from '@/lib/locale';

const ONE_YEAR = 60 * 60 * 24 * 365;

// Une instance par rendu : côté serveur, une instance partagée mélangerait les langues des visiteurs
export const createI18n = (locale: Locale) => {
  const i18n = createInstance();

  i18n.use(initReactI18next).init({
    resources: {
      fr: { translation: frMessages },
      en: { translation: enMessages },
    },
    lng: locale,
    fallbackLng: 'fr',
    initAsync: false,
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
      bindI18n: 'languageChanged loaded',
      bindI18nStore: 'added removed',
      transEmptyNodeValue: '',
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ['br', 'strong', 'i'],
    },
    keySeparator: '.', // Pour supporter Hero.intro
    nsSeparator: false, // Pas de séparateur de namespace
    saveMissing: false,
    debug: false,
  });

  // Sauvegarder la langue quand elle change
  i18n.on('languageChanged', (lng) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCALE_KEY, lng);
      document.cookie = `${LOCALE_KEY}=${lng}; path=/; max-age=${ONE_YEAR}; samesite=lax`;
      document.documentElement.lang = lng;
    }
  });

  return i18n;
};

// À appeler après l'hydratation : reprend la langue des visiteurs qui n'ont pas encore le cookie
export const syncSavedLanguage = (i18n: I18n) => {
  const savedLanguage = localStorage.getItem(LOCALE_KEY);
  if (savedLanguage && savedLanguage !== i18n.language) {
    i18n.changeLanguage(savedLanguage);
  }

  // Écouter les changements dans localStorage (pour les autres onglets)
  const handleStorageChange = (e: StorageEvent) => {
    if (e.key === LOCALE_KEY && e.newValue && e.newValue !== i18n.language) {
      i18n.changeLanguage(e.newValue);
    }
  };

  window.addEventListener('storage', handleStorageChange);
  return () => window.removeEventListener('storage', handleStorageChange);
};
