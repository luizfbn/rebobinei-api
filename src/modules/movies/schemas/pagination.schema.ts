import { z } from 'zod';

export const paginationSchema = z.object({
	page: z.coerce.number().min(1).optional().default(1),
});
