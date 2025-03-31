"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { useTransition } from "react";

const languages = [
  { code: "fr", label: "FR" },
  { code: "en", label: "EN" },
];

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleChange = (newLocale: string) => {
    if (newLocale === locale) return;
    const newPath = `/${newLocale}${pathname.slice(3)}`;
    startTransition(() => {
      router.replace(newPath);
    });
  };

  return (
    <div className="flex space-x-2">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => handleChange(lang.code)}
          className={`text-sm px-3 py-1 rounded-md border ${
            locale === lang.code
              ? "bg-primary text-background"
              : "text-foreground hover:bg-primary/10"
          } ${isPending && "opacity-50"}`}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
}
