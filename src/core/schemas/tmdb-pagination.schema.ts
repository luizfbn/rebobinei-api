import { z } from 'zod';

export const tmdbPaginationSchema = z.object({
	page: z.coerce
		.number({ error: 'A number is required for page.' })
		.int({ error: 'Page number must be an integer.' })
		.min(1, { error: 'The minimum number of pages is 1.' })
		.default(1),
});
