import { getRequestConfig } from 'next-intl/server';
import { routing } from '@/i18n/routing';

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;

  const resolvedLocale = routing.locales.includes(locale as 'fr' | 'en')
    ? (locale as string)
    : routing.defaultLocale;

  const messages = (await import(`@/lib/messages/${resolvedLocale}.json`)).default;

  console.log("✅ Messages loaded in request.ts:", Object.keys(messages));

  return {
    locale: resolvedLocale,
    messages
  };
});
