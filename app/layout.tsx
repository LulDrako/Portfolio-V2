import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from '@/components/providers';

const inter = Inter({ 
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-inter'
});

export const metadata: Metadata = {
  title: 'Karim Feki | Portfolio',
  description: 'Portfolio professionnel de Karim Feki, développeur web',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon.png' },
      { url: '/plane-icon.svg' }
    ]
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning className="hide-scrollbar">
      <body className={`${inter.className} hide-scrollbar`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}