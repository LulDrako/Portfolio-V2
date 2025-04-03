export const dynamic = 'force-dynamic';

import "../globals.css";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { setRequestLocale, getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
import { Providers } from "@/components/providers";
import { headers } from "next/headers";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-inter",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata() {
  return {
    title: "Karim Feki | Portfolio",
    description: "Portfolio de Karim Feki, développeur web passionné",
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const header = headers();
  const localeHeader = (await header).get("x-next-intl-locale");
  const effectiveLocale = locale || localeHeader;

  if (!routing.locales.includes(effectiveLocale as "fr" | "en")) {
    notFound();
  }

  setRequestLocale(effectiveLocale ?? "en");
  const messages = await getMessages({ locale: effectiveLocale ?? undefined });

  return (
    <html lang={effectiveLocale ?? undefined} suppressHydrationWarning className="hide-scrollbar">
      <head>
      <link rel="icon" href="/plane-icon.svg" />
      {/* 🚗 Preload DeLorean frames to avoid stutter */}
    {Array.from({ length: 16 }, (_, i) => (
      <link
        key={i}
        rel="preload"
        as="image"
        href={`/delorean/delorean-${String(i + 1).padStart(2, "0")}.webp`}
      />
    ))}
  </head>
      <body className={`${inter.className} hide-scrollbar`}>
        <Providers>
          <NextIntlClientProvider locale={effectiveLocale ?? undefined} messages={messages}>
            {children}
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}
