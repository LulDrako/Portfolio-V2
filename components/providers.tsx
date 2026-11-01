'use client';

import { useEffect } from 'react';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/toaster';
import { restoreSavedLanguage } from '@/lib/i18n';

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(restoreSavedLanguage, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
      <Toaster />
    </ThemeProvider>
  );
}
