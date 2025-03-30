// 💡 Obligatoire pour éviter l’erreur "params should be awaited"
export const dynamic = 'force-dynamic';

import "../globals.css";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { setRequestLocale, getMessages, getTranslations } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
import { Providers } from "@/components/providers";
import { headers } from 'next/headers';

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-inter",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("title"),
    description: t("description"),
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

  console.log("🧩 [Layout] locale param:", effectiveLocale);

  if (!routing.locales.includes(effectiveLocale as "fr" | "en")) {
    notFound();
  }

  setRequestLocale(effectiveLocale ?? "en");
  const messages = await getMessages({ locale: effectiveLocale ?? undefined });

  console.log("🧩 [Layout] messages loaded:", messages?.Hero?.intro);

  return (
    <html lang={effectiveLocale ?? undefined} suppressHydrationWarning className="hide-scrollbar">
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
