import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const moisMap: Record<string, number> = {
  "Janvier": 0, "Février": 1, "Mars": 2, "Avril": 3, "Mai": 4, "Juin": 5,
  "Juillet": 6, "Août": 7, "Septembre": 8, "Octobre": 9, "Novembre": 10, "Décembre": 11
};

