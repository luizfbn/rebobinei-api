import { z } from 'zod';

export const paginationSchema = z.object({
	page: z.coerce
		.number({ error: 'A number is required for page.' })
		.int({ error: 'Page number must be an integer.' })
		.min(1, { error: 'The minimum page number is 1.' })
		.default(1),
	limit: z.coerce
		.number({ error: 'A number is required for limit.' })
		.int({ error: 'Items per page must be an integer.' })
		.min(1, { error: 'The minimum number of items per page is 1.' })
		.max(100, { error: 'The maximum number of items per page is 100.' })
		.default(20),
});
