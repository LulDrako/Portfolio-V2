import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const moisMap: Record<string, number> = {
  // Mois FR
  Janvier: 0,
  Février: 1,
  Mars: 2,
  Avril: 3,
  Mai: 4,
  Juin: 5,
  Juillet: 6,
  Août: 7,
  Septembre: 8,
  Octobre: 9,
  Novembre: 10,
  Décembre: 11,

  // Mois EN
  January: 0,
  February: 1,
  March: 2,
  April: 3,
  May: 4,
  June: 5,
  July: 6,
  August: 7,
  September: 8,
  October: 9,
  November: 10,
  December: 11,
};

export function parseDate(dateStr: string | number): Date {
  if (!dateStr) return new Date(0);
  const firstPart = String(dateStr).split(' - ')[0].trim();
  const parts = firstPart.split(' ');

  if (parts.length === 2) {
    const [monthName, year] = parts;
    const monthIndex = moisMap[monthName] ?? 0;
    return new Date(parseInt(year), monthIndex, 1);
  }

  if (/^\d{4}$/.test(firstPart)) {
    return new Date(parseInt(firstPart), 6, 1);
  }

  return new Date(0);
}
