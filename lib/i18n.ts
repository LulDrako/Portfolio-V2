import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import des messages existants
import frMessages from '@/lib/messages/fr.json';
import enMessages from '@/lib/messages/en.json';

const LOCALE_STORAGE_KEY = 'portfolio-locale';

// Récupérer la langue depuis localStorage
const getInitialLanguage = () => {
  // Toujours retourner 'fr' pour éviter l'hydratation mismatch
  // La langue sera mise à jour côté client après hydratation
  return 'fr';
};

i18n.use(initReactI18next).init({
  resources: {
    fr: { translation: frMessages },
    en: { translation: enMessages },
  },
  lng: getInitialLanguage(),
  fallbackLng: 'fr',
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
    localStorage.setItem(LOCALE_STORAGE_KEY, lng);
    document.documentElement.lang = lng;
  }
});

// À appeler après l'hydratation : le serveur rend toujours en français
export const restoreSavedLanguage = () => {
  const savedLanguage = localStorage.getItem(LOCALE_STORAGE_KEY);
  if (savedLanguage && savedLanguage !== i18n.language) {
    i18n.changeLanguage(savedLanguage);
  }
};

if (typeof window !== 'undefined') {
  // Écouter les changements dans localStorage (pour les autres onglets)
  const handleStorageChange = (e: StorageEvent) => {
    if (e.key === LOCALE_STORAGE_KEY && e.newValue && e.newValue !== i18n.language) {
      i18n.changeLanguage(e.newValue);
    }
  };

  window.addEventListener('storage', handleStorageChange);
}

export default i18n;
