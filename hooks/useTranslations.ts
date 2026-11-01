'use client';

import { useTranslation } from 'react-i18next';

export function useTranslations(namespace?: string) {
  const { t } = useTranslation();
  const prefix = namespace ? `${namespace}.` : '';

  const translate = (key: string) => t(`${prefix}${key}`);
  translate.raw = (key: string) => t(`${prefix}${key}`, { returnObjects: true });
  return translate;
}
