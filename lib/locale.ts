export const LOCALE_KEY = 'portfolio-locale';

export type Locale = 'fr' | 'en';

export const parseLocale = (value?: string | null): Locale => (value === 'en' ? 'en' : 'fr');
