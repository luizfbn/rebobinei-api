import z from 'zod';

export const sortSchema = z
	.enum(['createdAt_desc', 'createdAt_asc', 'rating_desc', 'rating_asc'])
	.default('createdAt_desc');
