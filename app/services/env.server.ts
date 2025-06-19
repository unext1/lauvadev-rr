import { z } from 'zod';
import 'dotenv/config';

const environmentSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),

  SESSION_SECRET: z.string().min(1).trim(),
  TOTP_SECRET: z.string().min(1).trim(),
  CSRF_SECRET: z.string().min(1).trim()
});

export const env = environmentSchema.parse(process.env);
