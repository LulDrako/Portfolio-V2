import * as z from 'zod';

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'Ton nom doit faire au moins 2 caractères')
    .max(100, 'Ton nom doit faire au plus 100 caractères'),
  email: z.string().email('Adresse email invalide').max(254, 'Adresse email invalide'),
  message: z
    .string()
    .min(10, 'Le message doit faire au moins 10 caractères')
    .max(5000, 'Le message doit faire au plus 5000 caractères'),
});
