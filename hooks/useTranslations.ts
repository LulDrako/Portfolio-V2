'use client';

import { useTranslation } from 'react-i18next';

export function useTranslations(namespace?: string) {
  const { t } = useTranslation();
  const prefix = namespace ? `${namespace}.` : '';

  return Object.assign((key: string) => t(`${prefix}${key}`), {
    raw: (key: string) => t(`${prefix}${key}`, { returnObjects: true }),
  });
}
