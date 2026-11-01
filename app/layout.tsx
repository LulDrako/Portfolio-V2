export const dynamic = 'force-dynamic';

import './globals.css';
import { cookies } from 'next/headers';
import { Inter } from 'next/font/google';
import { Providers } from '@/components/providers';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import projectImages from '@/lib/projectImages';
import { LOCALE_KEY, parseLocale } from '@/lib/locale';

const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata = {
  title: 'Karim Feki | Portfolio',
  description: 'Portfolio de Karim Feki, développeur web passionné',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = parseLocale((await cookies()).get(LOCALE_KEY)?.value);

  return (
    <html lang={locale} suppressHydrationWarning className="hide-scrollbar">
      <head>
        <link rel="icon" href="/plane-icon.svg" />
        {/* 🚗 Preload DeLorean frames to avoid stutter */}
        {Array.from({ length: 16 }, (_, i) => (
          <link
            key={i}
            rel="preload"
            as="image"
            href={`/delorean/delorean-${String(i + 1).padStart(2, '0')}.webp`}
          />
        ))}
        {/* 🚀 Preload first project image for faster LCP */}
        <link rel="preload" as="image" href={projectImages[0]} />
      </head>
      <body className={`${inter.className} hide-scrollbar`}>
        <Providers locale={locale}>
          {children}
          <SpeedInsights />
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
