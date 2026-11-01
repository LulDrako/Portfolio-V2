import * as z from 'zod';

// Les messages sont des clés de traduction : Contact.errors dans lib/messages
export const contactSchema = z.object({
  name: z.string().min(2, 'nameMin').max(100, 'nameMax'),
  email: z.string().email('emailInvalid').max(254, 'emailInvalid'),
  message: z.string().min(10, 'messageMin').max(5000, 'messageMax'),
});
