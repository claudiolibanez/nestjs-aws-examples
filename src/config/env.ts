import { z } from 'zod';

export const envSchema = z.object({
  AWS_ACCESS_KEY_ID: z.string(),
  AWS_SECRET_ACCESS_KEY: z.string(),
  AWS_REGION: z.string(),

  MAIL_PROVIDER: z.string(),
  MAIL_TEMPLATE_PROVIDER: z.string(),

  MAIL_DEFAULT_NAME_FROM: z.string(),
  MAIL_DEFAULT_EMAIL_FROM: z.string(),
});

export type Env = z.infer<typeof envSchema>;
