import { z } from "zod";

export const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(3000),
  SERVICE_NAME: z.string().default('weather-api'),
  API_PREFIX: z.string().default('/api/v1'),

  OPENWEATHER_API_KEY: z.string().min(1, 'OPENWEATHER_API_KEY is required'),
  OPENWEATHER_BASE_URL: z
    .url()
    .default('https://api.openweathermap.org'),

  DATABASE_URL: z.url('DATABASE_URL must be a valid URL'),
});