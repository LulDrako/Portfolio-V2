'use client';

import { useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import { ThemeProvider } from 'next-themes';
import { MotionConfig } from 'framer-motion';
import { Toaster } from '@/components/ui/toaster';
import { createI18n, syncSavedLanguage } from '@/lib/i18n';
import type { Locale } from '@/lib/locale';

export function Providers({ children, locale }: { children: React.ReactNode; locale: Locale }) {
  const [i18n] = useState(() => createI18n(locale));

  useEffect(() => syncSavedLanguage(i18n), [i18n]);

  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
        <Toaster />
      </ThemeProvider>
    </I18nextProvider>
  );
}
