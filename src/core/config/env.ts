import { z } from 'zod';

const envSchema = z.object({
	APP_PORT: z.string().default('3000').transform(Number),
	JWT_SECRET: z.string(),
	LOCALE: z.enum(['pt-BR', 'en-US']).default('en-US'),
	TMDB_IMAGE_BASE_URL: z.url(),
	TMDB_API_BASE_URL: z.url(),
	TMDB_API_KEY: z.string(),
});

export const env = envSchema.parse(process.env);
