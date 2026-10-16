import { z } from 'zod';
export const bookingSchema = z.object({
  service: z.enum(['Horoscope consultation', 'Marriage compatibility']),
  mode: z.enum(['Video call', 'Audio call']),
  language: z.enum(['Tamil', 'Telugu', 'English']),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  period: z.enum(['Morning', 'Afternoon', 'Evening']),
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(150),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[\d\s()-]{7,24}$/),
  note: z.string().trim().max(1000),
  consent: z.literal(true),
});
